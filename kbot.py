import asyncio
import math
from time import ticks_ms
from constants import *


class KBot:
    def __init__(self, left, right):
        self.left = left
        self.right = right
        self._speed = 70
        self._wheel_diameter = 80  # mm
        self._wheel_circ = math.pi * self._wheel_diameter
        # PID motor state
        self._target_left = 0
        self._target_right = 0
        self._error_left = 0
        self._error_right = 0
        self._last_error_left = 0
        self._last_error_right = 0
        self._integral_left = 0
        self._integral_right = 0
        self._max_integral = 400
        self._max_pid_output = 60

    def speed(self, speed):
        self._speed = speed

    def forward(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(speed)
        self.right.run(speed)

    def backward(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(-speed)
        self.right.run(-speed)

    def turn_right(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(speed)
        self.right.run(-speed)

    def turn_left(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(-speed)
        self.right.run(speed)

    def run_speed(self, left_speed, right_speed):
        self.left.run(left_speed)
        self.right.run(right_speed)

    def stop(self):
        self.left.stop()
        self.right.stop()

    def brake(self):
        self.left.brake()
        self.right.brake()

    async def stop_then(self, then):
        if then == BRAKE:
            self.brake()
            await asyncio.sleep_ms(500)
            self.stop()
        else:
            self.stop()

    def _distance_driven(self):
        left_angle = abs(self.left.angle())
        right_angle = abs(self.right.angle())
        avg_angle = (left_angle + right_angle) / 2
        return (avg_angle * self._wheel_circ) / 360

    async def _run_for(self, left_speed, right_speed, amount, unit=SECOND, then=STOP):
        if unit == SECOND:
            duration = abs(amount) * 1000
            self.left.run(left_speed)
            self.right.run(right_speed)
            start = ticks_ms()
            while ticks_ms() - start < duration:
                await asyncio.sleep_ms(10)
        elif unit == CM:
            if not self.left._encoder_enabled or not self.right._encoder_enabled:
                return
            distance_mm = abs(amount) * 10
            self.left.reset_angle()
            self.right.reset_angle()
            self.left.run(left_speed)
            self.right.run(right_speed)
            while self._distance_driven() < distance_mm:
                await asyncio.sleep_ms(10)
        await self.stop_then(then)

    async def forward_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(speed, speed, amount, unit, then)

    async def backward_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(-speed, -speed, amount, unit, then)

    async def turn_right_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(speed, -speed, amount, unit, then)

    async def turn_left_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(-speed, speed, amount, unit, then)

    def set_angle_sensor(self, sensor):
        self._angle_sensor = sensor

    async def turn_right_degree(self, speed, degree, then=STOP):
        await self._turn_degree(speed, -speed, degree, then)

    async def turn_left_degree(self, speed, degree, then=STOP):
        await self._turn_degree(-speed, speed, degree, then)

    async def _turn_degree(self, left_speed, right_speed, degree, then=STOP):
        if not hasattr(self, '_angle_sensor'):
            return
        sensor = self._angle_sensor
        await sensor.reset()
        self.left.run(left_speed)
        self.right.run(right_speed)
        while abs(sensor.heading) < abs(degree):
            await asyncio.sleep_ms(10)
        await self.stop_then(then)

    def set_target_rpm(self, left_rpm, right_rpm):
        if left_rpm != self._target_left or right_rpm != self._target_right:
            self._integral_left = 0
            self._integral_right = 0
            self._last_error_left = 0
            self._last_error_right = 0
        self._target_left = left_rpm
        self._target_right = right_rpm

    def pid_update(self, kp, ki, kd):
        if not self.left._encoder_enabled or not self.right._encoder_enabled:
            self.left.run(self._target_left)
            self.right.run(self._target_right)
            return
        self._error_left = self._target_left - self.left.speed()
        self._error_right = self._target_right - self.right.speed()
        self._integral_left = max(-self._max_integral, min(self._max_integral, self._integral_left + self._error_left))
        self._integral_right = max(-self._max_integral, min(self._max_integral, self._integral_right + self._error_right))
        d_left = self._error_left - self._last_error_left
        d_right = self._error_right - self._last_error_right
        pid_left = kp * self._error_left + ki * self._integral_left + kd * d_left
        pid_right = kp * self._error_right + ki * self._integral_right + kd * d_right
        pid_left = max(-self._max_pid_output, min(self._max_pid_output, pid_left))
        pid_right = max(-self._max_pid_output, min(self._max_pid_output, pid_right))
        self._last_error_left = self._error_left
        self._last_error_right = self._error_right
        self.left.run(pid_left)
        self.right.run(pid_right)

    def pid_reset(self):
        self._error_left = 0
        self._error_right = 0
        self._last_error_left = 0
        self._last_error_right = 0
        self._integral_left = 0
        self._integral_right = 0

    def pid_stop(self):
        self._target_left = 0
        self._target_right = 0
        self.pid_reset()
        self.left.stop()
        self.right.stop()
