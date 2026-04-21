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
        self._kp = 1.5
        self._ki = 0.07
        self._kd = 0.5
        self._pid_running = False
        # Remote control state
        self.mode_auto = True
        self._min_speed = 40
        self._teleop_cmd = ''
        self._teleop_cmd_handlers = {}
        # Line following state
        self._line_sensor = None
        self._last_line_state = LINE_CENTER
        # Vision tracking PID state
        self._tx_kp = 0.23
        self._tx_ki = 0
        self._tx_kd = 0.4
        self._ty_kp = 0.55
        self._ty_ki = 0
        self._ty_kd = 0.52
        self._tx_lerr = 0
        self._tx_int = 0
        self._ty_lerr = 0
        self._ty_int = 0
        self._tx_out = 0
        self._ty_out = 0
        self._t_min = 25
        self._t_max = 80
        self._t_dz = 5
        self._t_imax = 50

    def speed(self, speed, min_speed=None):
        self._speed = speed
        if min_speed is not None:
            self._min_speed = min_speed

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
        if not self._pid_running:
            self._pid_running = True
            asyncio.create_task(self._pid_loop())

    def pid_set(self, kp, ki, kd):
        self._kp = kp
        self._ki = ki
        self._kd = kd

    async def _pid_loop(self):
        while self._pid_running:
            self._pid_update()
            await asyncio.sleep_ms(50)

    def _pid_update(self):
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
        pid_left = self._kp * self._error_left + self._ki * self._integral_left + self._kd * d_left
        pid_right = self._kp * self._error_right + self._ki * self._integral_right + self._kd * d_right
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
        self._pid_running = False
        self._target_left = 0
        self._target_right = 0
        self.pid_reset()
        self.left.stop()
        self.right.stop()

    # ============ Remote Control (Gamepad) ============

    async def run_teleop(self, gamepad, accel_steps=5):
        self.mode_auto = False
        self._teleop_cmd = ''
        speed = self._min_speed
        turn_speed = self._min_speed
        last_dir = -1
        while True:
            if self.mode_auto:
                await asyncio.sleep_ms(100)
                continue

            dir = -1
            if gamepad.data[AL_DISTANCE] > 50:
                dir = gamepad.data[AL_DIR]
            elif gamepad.data[BTN_UP] and gamepad.data[BTN_LEFT]:
                self._teleop_cmd = BTN_UP
                dir = DIR_LF
            elif gamepad.data[BTN_UP] and gamepad.data[BTN_RIGHT]:
                self._teleop_cmd = BTN_UP
                dir = DIR_RF
            elif gamepad.data[BTN_DOWN] and gamepad.data[BTN_LEFT]:
                self._teleop_cmd = BTN_DOWN
                dir = DIR_LB
            elif gamepad.data[BTN_DOWN] and gamepad.data[BTN_RIGHT]:
                self._teleop_cmd = BTN_DOWN
                dir = DIR_RB
            elif gamepad.data[BTN_UP]:
                self._teleop_cmd = BTN_UP
                dir = DIR_FW
            elif gamepad.data[BTN_DOWN]:
                self._teleop_cmd = BTN_DOWN
                dir = DIR_BW
            elif gamepad.data[BTN_LEFT]:
                self._teleop_cmd = BTN_LEFT
                dir = DIR_L
            elif gamepad.data[BTN_RIGHT]:
                self._teleop_cmd = BTN_RIGHT
                dir = DIR_R
            elif gamepad.data[BTN_L1]:
                self._teleop_cmd = BTN_L1
            elif gamepad.data[BTN_R1]:
                self._teleop_cmd = BTN_R1
            elif gamepad.data[BTN_TRIANGLE]:
                self._teleop_cmd = BTN_TRIANGLE
            elif gamepad.data[BTN_SQUARE]:
                self._teleop_cmd = BTN_SQUARE
            elif gamepad.data[BTN_CROSS]:
                self._teleop_cmd = BTN_CROSS
            elif gamepad.data[BTN_CIRCLE]:
                self._teleop_cmd = BTN_CIRCLE
            elif gamepad.data[BTN_L2]:
                self._teleop_cmd = BTN_L2
            elif gamepad.data[BTN_R2]:
                self._teleop_cmd = BTN_R2
            elif gamepad.data[BTN_M1]:
                self._teleop_cmd = BTN_M1
            elif gamepad.data[BTN_M2]:
                self._teleop_cmd = BTN_M2
            elif gamepad.data[BTN_THUMBL]:
                self._teleop_cmd = BTN_THUMBL
            elif gamepad.data[BTN_THUMBR]:
                self._teleop_cmd = BTN_THUMBR
            else:
                self._teleop_cmd = ''

            if dir != last_dir:
                speed = self._min_speed
                turn_speed = self._min_speed
            else:
                speed = min(speed + accel_steps, self._speed)
                turn_speed = min(turn_speed + int(accel_steps / 2), self._speed)

            if self._teleop_cmd in self._teleop_cmd_handlers:
                if self._teleop_cmd_handlers[self._teleop_cmd] is not None:
                    await self._teleop_cmd_handlers[self._teleop_cmd]()
                    await asyncio.sleep_ms(200)
            else:
                if dir == DIR_FW:
                    self.run_speed(speed, speed)
                elif dir == DIR_BW:
                    self.run_speed(-speed, -speed)
                elif dir == DIR_L:
                    self.run_speed(-turn_speed, turn_speed)
                elif dir == DIR_R:
                    self.run_speed(turn_speed, -turn_speed)
                elif dir == DIR_RF:
                    self.run_speed(speed, int(speed / 2))
                elif dir == DIR_LF:
                    self.run_speed(int(speed / 2), speed)
                elif dir == DIR_RB:
                    self.run_speed(-speed, int(-speed / 2))
                elif dir == DIR_LB:
                    self.run_speed(int(-speed / 2), -speed)
                else:
                    self.stop()

            last_dir = dir
            await asyncio.sleep_ms(10)

    def on_teleop_command(self, cmd, callback):
        self._teleop_cmd_handlers[cmd] = callback

    # ============ Line Following ============

    def line_sensor(self, sensor):
        self._line_sensor = sensor

    async def follow_line(self, backward=True, line_state=None):
        if self._line_sensor is None:
            return
        if line_state is None:
            line_state = self._line_sensor.check()

        if line_state == LINE_END:
            if backward:
                self.run_speed(-self._min_speed, -self._min_speed)
        elif line_state == LINE_CENTER:
            if self._last_line_state == LINE_CENTER:
                self.forward()
            else:
                self.run_speed(self._min_speed, self._min_speed)
        elif line_state == LINE_CROSS:
            self.run_speed(self._min_speed, self._min_speed)
        elif line_state == LINE_RIGHT:
            self.run_speed(self._min_speed, int(self._min_speed * 1.25))
        elif line_state == LINE_RIGHT2:
            self.run_speed(0, self._min_speed)
        elif line_state == LINE_RIGHT3:
            while line_state != LINE_CENTER and line_state != LINE_LEFT:
                self.run_speed(-self._min_speed, self._min_speed)
                line_state = self._line_sensor.check()
            self._last_line_state = line_state
            return
        elif line_state == LINE_LEFT:
            self.run_speed(int(self._min_speed * 1.25), self._min_speed)
        elif line_state == LINE_LEFT2:
            self.run_speed(self._min_speed, 0)
        elif line_state == LINE_LEFT3:
            while line_state != LINE_CENTER and line_state != LINE_RIGHT:
                self.run_speed(self._min_speed, -self._min_speed)
                line_state = self._line_sensor.check()
            self._last_line_state = line_state
            return

        self._last_line_state = line_state

    async def follow_line_until_cross(self, then=STOP):
        status = 1
        count = 0
        while True:
            line_state = self._line_sensor.check()
            if status == 1:
                if line_state != LINE_CROSS:
                    status = 2
            elif status == 2:
                if line_state == LINE_CROSS:
                    count += 1
                    if count == 2:
                        break
            await self.follow_line(True, line_state)
            if status == 2 and count == 1:
                await asyncio.sleep_ms(20)
            else:
                await asyncio.sleep_ms(10)
        await self.stop_then(then)

    async def follow_line_until_end(self, then=STOP):
        count = 2
        while True:
            line_state = self._line_sensor.check()
            if line_state == LINE_END:
                count -= 1
                if count == 0:
                    break
            await self.follow_line(False, line_state)
            await asyncio.sleep_ms(10)
        await self.stop_then(then)

    async def follow_line_by_time(self, duration, then=STOP):
        start = ticks_ms()
        duration_ms = duration * 1000
        while ticks_ms() - start < duration_ms:
            await self.follow_line(True)
            await asyncio.sleep_ms(10)
        await self.stop_then(then)

    async def follow_line_until(self, condition, then=STOP):
        status = 1
        count = 0
        while True:
            line_state = self._line_sensor.check()
            if status == 1:
                if line_state != LINE_CROSS:
                    status = 2
            elif status == 2:
                if condition():
                    count += 1
                    if count == 2:
                        break
            await self.follow_line(True, line_state)
            await asyncio.sleep_ms(10)
        await self.stop_then(then)

    async def turn_until_line_detected(self, steering, then=STOP):
        status = 0
        counter = 0
        if steering > 0:
            self.run_speed(self._speed, -self._speed)
        else:
            self.run_speed(-self._speed, self._speed)
        while True:
            line_state = self._line_sensor.check()
            if status == 0:
                if line_state == LINE_END:
                    status = 1
            elif status == 1:
                if line_state != LINE_END:
                    if steering > 0:
                        self.run_speed(int(self._speed * 0.75), int(-self._speed * 0.75))
                    else:
                        self.run_speed(int(-self._speed * 0.75), int(self._speed * 0.75))
                    counter -= 1
                    if counter <= 0:
                        break
            await asyncio.sleep_ms(10)
        await self.stop_then(then)

    # ============ Vision Tracking PID ============

    def track_set_pid_x(self, kp, ki, kd):
        self._tx_kp = kp
        self._tx_ki = ki
        self._tx_kd = kd

    def track_set_pid_y(self, kp, ki, kd):
        self._ty_kp = kp
        self._ty_ki = ki
        self._ty_kd = kd

    def track_set_speed(self, min_speed, max_speed):
        self._t_min = min_speed
        self._t_max = max_speed

    def track_x(self, current_x, target_x):
        e = current_x - target_x
        if abs(e) <= self._t_dz:
            e = 0
        self._tx_int = max(-self._t_imax, min(self._t_imax, self._tx_int + e))
        d = e - self._tx_lerr
        self._tx_out = self._tx_kp * e + self._tx_ki * self._tx_int + self._tx_kd * d
        self._tx_lerr = e

    def track_y(self, current_y, target_y):
        e = target_y - current_y
        if abs(e) <= self._t_dz:
            e = 0
        self._ty_int = max(-self._t_imax, min(self._t_imax, self._ty_int + e))
        d = e - self._ty_lerr
        self._ty_out = self._ty_kp * e + self._ty_ki * self._ty_int + self._ty_kd * d
        self._ty_lerr = e

    def _track_limit(self, value):
        if abs(value) <= self._t_min:
            return 0
        if value > self._t_max:
            return self._t_max
        if value < -self._t_max:
            return -self._t_max
        return value

    @property
    def track_vt(self):
        return self._track_limit(self._tx_out + self._ty_out)

    @property
    def track_vp(self):
        return self._track_limit(self._ty_out - self._tx_out)
