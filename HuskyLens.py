from machine import SoftI2C, Pin
from time import sleep_ms

class HuskyLens:
    HEADER1 = 0x55
    HEADER2 = 0xAA
    ADDRESS = 0x11

    CMD_REQUEST = 0x20
    CMD_REQUEST_KNOCK = 0x2C
    CMD_REQUEST_ALGORITHM = 0x2D

    CMD_RETURN_INFO = 0x29
    CMD_RETURN_BLOCK = 0x2A
    CMD_RETURN_ARROW = 0x2B
    CMD_RETURN_OK = 0x2E

    def __init__(self, sda_pin, scl_pin, i2c_addr=0x32):
        self.i2c = SoftI2C(scl=Pin(scl_pin), sda=Pin(sda_pin), freq=100000)
        self.i2c_addr = i2c_addr
        self._buf = bytearray(64)
        self._wait_for_device()

        self.buffer = bytearray()
        self.last_block = {}
        self.last_arrow = {"xo": 0, "yo": 0, "xt": 0, "yt": 0, "id": 0}
        self._fresh_blocks = set()
        self._fresh_arrow = False
        self._block_miss = {}
        self._arrow_miss = 0
        self.MISS_THRESHOLD = 20

    def _wait_for_device(self):
        """Đợi HuskyLens sẵn sàng trên I2C bus (retry khi khởi động)"""
        for _ in range(10):
            try:
                self.i2c.readfrom(self.i2c_addr, 1)
                return
            except:
                sleep_ms(200)
        print("[HuskyLens] Không tìm thấy thiết bị I2C!")

    def _send(self, data):
        try:
            self.i2c.writeto(self.i2c_addr, data)
        except:
            pass

    def _receive(self):
        try:
            self.i2c.readfrom_into(self.i2c_addr, self._buf)
            if self._buf[0] == self.HEADER1 and self._buf[1] == self.HEADER2:
                pos = 0
                while pos + 5 <= 64:
                    if self._buf[pos] != self.HEADER1 or self._buf[pos + 1] != self.HEADER2:
                        break
                    pkt_len = 6 + self._buf[pos + 3]
                    if pos + pkt_len > 64:
                        break
                    pos += pkt_len
                if pos > 0:
                    return self._buf[:pos]
        except:
            pass
        return None

    def _parse(self):
        data = self._receive()
        if data:
            self.buffer.extend(data)

        while len(self.buffer) >= 6:
            if self.buffer[0] != self.HEADER1 or self.buffer[1] != self.HEADER2:
                self.buffer = self.buffer[1:]
                continue

            pkt_len = 6 + self.buffer[3]
            if len(self.buffer) < pkt_len:
                break

            pkt = self.buffer[:pkt_len]
            if (sum(pkt[:-1]) & 0xFF) != pkt[-1]:
                self.buffer = self.buffer[1:]
                continue

            cmd = pkt[4]
            d = pkt[5:-1]

            if cmd == self.CMD_RETURN_BLOCK and len(d) == 10:
                obj_id = d[8] | (d[9] << 8)
                self.last_block[obj_id] = {
                    "id": obj_id,
                    "x": d[0] | (d[1] << 8),
                    "y": d[2] | (d[3] << 8),
                    "w": d[4] | (d[5] << 8),
                    "h": d[6] | (d[7] << 8),
                }
                self._fresh_blocks.add(obj_id)
            elif cmd == self.CMD_RETURN_ARROW and len(d) == 10:
                obj_id = d[8] | (d[9] << 8)
                self.last_arrow = {
                    "id": obj_id,
                    "xo": d[0] | (d[1] << 8),
                    "yo": d[2] | (d[3] << 8),
                    "xt": d[4] | (d[5] << 8),
                    "yt": d[6] | (d[7] << 8),
                }
                self._fresh_arrow = True

            self.buffer = self.buffer[pkt_len:]

    def _request(self):
        cmd = bytes([self.HEADER1, self.HEADER2, self.ADDRESS, 0x00, self.CMD_REQUEST, 0x30])
        self._send(cmd)

    async def get_block(self, target_id):
        self._fresh_blocks.clear()
        self._parse()
        self._request()
        if target_id in self._fresh_blocks:
            self._block_miss[target_id] = 0
            return self.last_block[target_id]
        self._block_miss[target_id] = self._block_miss.get(target_id, 0) + 1
        if self._block_miss[target_id] < self.MISS_THRESHOLD:
            return self.last_block.get(target_id, {"x": 0, "y": 0, "w": 0, "h": 0})
        return {"x": 0, "y": 0, "w": 0, "h": 0}

    async def get_arrow(self):
        self._fresh_arrow = False
        self._parse()
        self._request()
        if self._fresh_arrow:
            self._arrow_miss = 0
            return self.last_arrow
        self._arrow_miss += 1
        if self._arrow_miss < self.MISS_THRESHOLD:
            return self.last_arrow
        return {"xo": 0, "yo": 0, "xt": 0, "yt": 0, "id": 0}