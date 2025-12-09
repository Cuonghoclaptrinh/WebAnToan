# Referer Leak Attack Demo  
**Lỗ hổng rò rỉ JWT qua Referer Header khi đặt token vào Query String**


**Đề tài:** Phân tích và demo thực tế tấn công Referer Leak + cách phòng chống bằng `Referrer-Policy: no-referrer`



---

## Thành viên nhóm

| STT | Họ tên              | MSSV          | Nhiệm vụ chính                                                                                 |
|-----|---------------------|---------------|-------------------------------------------------------------------------------------------------|
| 1   | Nguyễn Hoàng Việt   | 22810310336   | Frontend chính, thiết kế & triển khai toàn bộ demo leak, collector UI, fix bằng Referrer-Policy |
| 2   | Đỗ Mạnh Cường       | 22810340201   | Backend Node.js + JWT, nghiên cứu lỗ hổng, viết tài liệu, chuẩn bị slide thuyết trình           |

---

## Mô tả lỗ hổng (Referer Leak Attack)

> Khi ứng dụng **đặt JWT/token vào query string** và có **bất kỳ request nào ra domain khác** (iframe, img, script, quảng cáo…), trình duyệt sẽ **tự động gửi header `Referer`** chứa **toàn bộ URL hiện tại** → attacker chỉ cần đọc `document.referrer` là **lấy được token ngay lập tức**.

**Đặc biệt nguy hiểm vì:**
- Không cần XSS  
- Không cần người dùng click  
- Không để lại dấu vết  
- Hoàn toàn âm thầm trong dưới 3 giây

---

## 📁 Cấu trúc dự án
WebAnToan/
├── bikes_shop-viet/        ← Web chính (login + token trong URL)
└── jwt-leak-collector/     ← Collector mô phỏng domain attacker

## Hướng dẫn sử dụng (Chỉ 2 lệnh là chạy)

Hãy thêm 1 file .env có nội dung như sau: REACT_APP_API_URL=https://be-for-bikes-shop.onrender.com

### Yêu cầu
- Node.js ≥ 18
- npm hoặc yarn

### Cách chạy

```bash
# Bước 1: Clone repo
git clone https://github.com/Cuonghoclaptrinh/WebAnToan.git

# Bước 2: Chạy 2 dự án riêng biệt (mở 2 terminal)
# Terminal 1 – Web chính (có login)
cd bikes_shop-viet
npm install
npm run dev
# → Mở http://localhost:3000

# Terminal 2 – Collector (mô phỏng hacker)
cd jwt-leak-collector
npm install
npm run dev
# → Mở http://localhost:5173
```

## 🎯 Cách thực hiện demo tấn công

Truy cập http://localhost:3000

<img width="1440" height="837" alt="Screenshot 2025-12-09 at 10 01 56" src="https://github.com/Cuonghoclaptrinh/WebAnToan/blob/main/bikes_shop-viet/src/assets/homepage.png" />

Đăng nhập bằng tài khoản test:

Email: viet@gmail.com

Mật khẩu: 12345678

<img width="1440" height="837" alt="Screenshot 2025-12-09 at 10 01 56" src="https://github.com/Cuonghoclaptrinh/WebAnToan/blob/main/bikes_shop-viet/src/assets/login.png" />

Chờ ~2 giây

Mở tab http://localhost:5173

**🔥 Kết quả trước khi fix**

+ Collector báo JWT Leak Detected!

+ Thấy đầy đủ: token + email + mật khẩu

+ Token bị lộ ngay lập tức

<img width="1440" height="837" alt="Screenshot 2025-12-09 at 10 01 56" src="https://github.com/Cuonghoclaptrinh/WebAnToan/blob/main/bikes_shop-viet/src/assets/beforeFix.png" />

**🛡️ Cách fix – Chỉ 1 dòng**

Thêm vào file bikes_shop-viet/public/index.html trong <head>:

<meta name="referrer" content="no-referrer" />

**✔️ Kết quả sau khi fix**

+ Không còn leak dữ liệu

+ Collector không nhận được bất kỳ token nào

+ Demo bảo mật hoàn chỉnh

<img width="1440" height="837" alt="Screenshot 2025-12-09 at 10 01 56" src="https://github.com/Cuonghoclaptrinh/WebAnToan/blob/main/bikes_shop-viet/src/assets/afterFix.png" />


