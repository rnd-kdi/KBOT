from machine import UART
import time

class HuskyLens:
    # --- CONSTANTS (Dựa trên tài liệu Protocol 0.5.1) ---
    HEADER1 = 0x55
    HEADER2 = 0xAA
    ADDRESS = 0x11
    
    # Command Requests (Gửi đi)
    CMD_REQUEST = 0x20              # Yêu cầu tất cả
    CMD_REQUEST_BLOCKS = 0x21
    CMD_REQUEST_ARROWS = 0x22
    CMD_REQUEST_KNOCK = 0x2C        # Kiểm tra kết nối
    CMD_REQUEST_ALGORITHM = 0x2D    # Đổi thuật toán
    
    # Command Returns (Nhận về)
    CMD_RETURN_INFO = 0x29
    CMD_RETURN_BLOCK = 0x2A
    CMD_RETURN_ARROW = 0x2B
    CMD_RETURN_OK = 0x2E
    CMD_RETURN_BUSY = 0x3D
    CMD_RETURN_IS_PRO = 0x3B
    CMD_RETURN_NEED_PRO = 0x3E

    def __init__(self, uart_id=2, tx_pin=23, rx_pin=19, baudrate=9600):
        """Khởi tạo kết nối UART"""
        # Lưu ý: Tùy dòng chip (ESP32/Microbit) mà cấu hình UART có thể khác nhau đôi chút
        self.uart = UART(uart_id, baudrate=baudrate, tx=tx_pin, rx=rx_pin, timeout=10)
        self.buffer = bytearray()
        self.last_block = {}
        self.last_arrow = {"xo": 0, "yo": 0, "xt": 0, "yt": 0, "id": 0}

    def validate_checksum(self, packet):
        """Kiểm tra tính toàn vẹn của gói tin"""
        # Cộng dồn tất cả byte trừ byte cuối, lấy 8 bit thấp
        calculated = sum(packet[:-1]) & 0xFF
        return calculated == packet[-1]

    def COMMAND_REQUEST(self):
        """Gửi lệnh 0x20 để lấy dữ liệu (Block + Arrow)"""
        # 55 AA 11 00 20 30
        cmd = bytes([self.HEADER1, self.HEADER2, self.ADDRESS, 0x00, self.CMD_REQUEST, 0x30])
        self.uart.write(cmd)

    def process_incoming_data(self):
        """Hàm chính để đọc và phân tích buffer"""
        # Đọc dữ liệu mới từ UART vào buffer
        if self.uart.any():
            data = self.uart.read()
            if data:
                self.buffer.extend(data)

        while len(self.buffer) >= 5:
            # 1. Kiểm tra Header
            if self.buffer[0] != self.HEADER1 or self.buffer[1] != self.HEADER2:
                # FIX: Thay thế pop(0) bằng slicing
                self.buffer = self.buffer[1:]
                continue
            
            # 2. Lấy độ dài dữ liệu
            data_len = self.buffer[3]
            packet_len = 5 + data_len + 1 # Header(5) + Data(n) + Checksum(1)
            
            if len(self.buffer) < packet_len:
                break # Chưa đủ gói tin

            # 3. Cắt gói tin và kiểm tra Checksum
            packet = self.buffer[:packet_len]
            if not self.validate_checksum(packet):
                # FIX: Thay thế pop(0) bằng slicing
                self.buffer = self.buffer[1:] # Sai checksum, bỏ byte đầu dò lại
                continue

            # 4. Phân loại và xử lý lệnh
            cmd_type = packet[4]
            data = packet[5:-1]
            
            self.dispatch_command(cmd_type, data)

            # 5. Xóa gói tin đã xử lý
            self.buffer = self.buffer[packet_len:]

    def dispatch_command(self, cmd_type, data):
        """Điều hướng dữ liệu đến hàm xử lý tương ứng"""
        if cmd_type == self.CMD_RETURN_INFO:
            self.COMMAND_RETURN_INFO(data)
        elif cmd_type == self.CMD_RETURN_BLOCK:
            self.COMMAND_RETURN_BLOCK(data)
        elif cmd_type == self.CMD_RETURN_ARROW:
            self.COMMAND_RETURN_ARROW(data)
        elif cmd_type == self.CMD_RETURN_OK:
            self.COMMAND_RETURN_OK(data)
        # Các lệnh chưa phát triển
        elif cmd_type == self.CMD_RETURN_BUSY:
            self.COMMAND_RETURN_BUSY(data)
        elif cmd_type == self.CMD_RETURN_IS_PRO:
            self.COMMAND_RETURN_IS_PRO(data)
        elif cmd_type == self.CMD_RETURN_NEED_PRO:
            self.COMMAND_RETURN_NEED_PRO(data)
        else:
            # Lệnh lạ hoặc chưa define, bỏ qua
            pass

    # ===============================================
    # CÁC HÀM XỬ LÝ (DEVELOPED)
    # ===============================================

    def COMMAND_RETURN_INFO(self, data):
        """Xử lý thông tin chung (0x29)"""
        n_objs = data[0] + (data[1] << 8)
        # Có thể uncomment dòng dưới để debug nếu cần
        # if n_objs > 0: print(f"[INFO] Số lượng đối tượng: {n_objs}")

    def COMMAND_RETURN_BLOCK(self, data):
        """Xử lý dữ liệu Khối (0x2A)"""
        x_center = data[0] + (data[1] << 8)
        y_center = data[2] + (data[3] << 8)
        width    = data[4] + (data[5] << 8)
        height   = data[6] + (data[7] << 8)
        obj_id   = data[8] + (data[9] << 8)
        
        block_data = {"id": obj_id, "x": x_center, "y": y_center, "w": width, "h": height}
        self.last_block[obj_id] = block_data
        # print(f" -> [BLOCK] ID:{obj_id} | Center:({x_center},{y_center}) | Size:{width}x{height}")
        return block_data


    def COMMAND_RETURN_ARROW(self, data):
        """Xử lý dữ liệu Mũi tên (0x2B)"""
        x_origin = data[0] + (data[1] << 8)
        y_origin = data[2] + (data[3] << 8)
        x_target = data[4] + (data[5] << 8)
        y_target = data[6] + (data[7] << 8)
        obj_id   = data[8] + (data[9] << 8)
        
        self.last_arrow = {"id": obj_id, "xo": x_origin, "yo": y_origin, "xt": x_target, "yt": y_target}
        # print(f" -> [ARROW] ID:{obj_id} | Từ:({x_origin},{y_origin}) -> Đến:({x_target},{y_target})")
        return self.last_arrow

    def get_block(self, target_id):
        """Hàm đồng bộ để lấy dữ liệu block (thay thế cho việc sinh code từ blockly)"""
        self.COMMAND_REQUEST()
        time.sleep(0.05)
        self.process_incoming_data()
        return self.last_block.get(target_id, {"x": 0, "y": 0, "w": 0, "h": 0})

    def get_arrow(self):
        """Hàm đồng bộ để lấy dữ liệu arrow (thay thế cho việc sinh code từ blockly)"""
        self.COMMAND_REQUEST()
        time.sleep(0.05)
        self.process_incoming_data()
        return self.last_arrow if hasattr(self, 'last_arrow') else {"xo": 0, "yo": 0, "xt": 0, "yt": 0}

    # ===============================================
    # CÁC HÀM TRỐNG (UNDEVELOPED / PLACEHOLDER)
    # ===============================================

    def COMMAND_RETURN_OK(self, data):
        pass

    def COMMAND_RETURN_BUSY(self, data):
        pass

    def COMMAND_RETURN_IS_PRO(self, data):
        pass

    def COMMAND_RETURN_NEED_PRO(self, data):
        pass
    
    # ===============================================
    # CÁC HÀM REQUEST (DEVELOPED)
    # ===============================================
    def COMMAND_REQUEST_KNOCK(self):
        cmd = bytes([self.HEADER1, self.HEADER2, self.ADDRESS, 0x00, self.CMD_REQUEST_KNOCK, 0x3C])
        self.uart.write(cmd)

    def COMMAND_REQUEST_ALGORITHM(self, alg_id): pass
    def COMMAND_REQUEST_CUSTOM_TEXT(self, text, x, y): pass



# # --- DEMO ---
# husky = HuskyLens(uart_id=2, tx_pin=D4_PIN, rx_pin=D3_PIN)

# print("--- Bắt đầu HuskyLens Library Demo ---")

# while True:
#     # 1. Gửi yêu cầu lấy dữ liệu (Request All)
#     husky.COMMAND_REQUEST()
    
#     # 2. Xử lý phản hồi (Hàm này sẽ tự gọi các process_return_... tương ứng)
#     husky.process_incoming_data()
    
#     # 3. Nghỉ 1 chút
#     time.sleep(0.1)