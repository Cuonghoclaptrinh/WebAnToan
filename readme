# Referer Leak Attack Demo  
**Lỗ hổng rò rỉ JWT qua Referer Header khi đặt token vào Query String**

**Môn học:** An toàn và Bảo mật Thông tin  
**Đề tài:** Phân tích và demo thực tế tấn công Referer Leak + cách phòng chống bằng `Referrer-Policy: no-referrer`

**Điểm bảo vệ:** 10/10 – Đã thuyết trình thành công

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

## Cấu trúc dự án
WebAnToan/
├── bikes_shop-viet/          ← Web chính (có login, cố ý để token vào URL)
└── jwt-leak-collector/       ← Collector (mô phỏng domain của hacker)

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

Cách thực hiện demo

Vào http://localhost:3000 → đăng nhập bằng tài khoản test:
Email:viet@gmail.comMật khẩu:12345678
Chờ ~2 giây → mở tab http://localhost:5173

Kết quả trước khi fix
→ JWT Leak Detected! – Token + email + mật khẩu 
Leak thành công
Chi tiết token bị lộ

Cách fix chỉ 1 dòng
Thêm vào file bikes_shop-viet/public/index.html trong thẻ <head>:
<meta name="referrer" content="no-referrer" />
Kết quả sau khi fix
→ Không còn dữ liệu nhạy cảm nào bị leak!
Sau khi fix – an toàn 100%




Referer Leak Attack Demo

Lỗ hổng rò rỉ JWT qua Referer Header khi đặt token vào Query String

Môn học: An toàn và Bảo mật Thông tin
Đề tài: Phân tích và demo tấn công Referer Leak + cách phòng chống bằng Referrer-Policy: no-referrer

👥 Thành viên nhóm
STT	Họ tên	MSSV	Nhiệm vụ chính
1	Nguyễn Hoàng Việt	22810310336	Frontend demo leak, collector UI, fix Referrer-Policy
2	Đỗ Mạnh Cường	22810340201	Backend Node.js + JWT, phân tích lỗ hổng, viết tài liệu
🔥 Mô tả lỗ hổng Referer Leak Attack

Khi ứng dụng đặt JWT/token trong query string, nếu có bất kỳ request nào đi ra domain khác (iframe, img, script, quảng cáo…), trình duyệt sẽ:

➡️ Tự động gửi header Referer chứa toàn bộ URL hiện tại.
➡️ Attacker chỉ cần đọc document.referrer để thu thập token.

Vì sao nguy hiểm?

❌ Không cần XSS

❌ Không cần người dùng click

❌ Không để lại log

⚡ Rò rỉ token chỉ trong 1–3 giây

📁 Cấu trúc dự án
WebAnToan/
├── bikes_shop-viet/        ← Web chính (login + token trong URL)
└── jwt-leak-collector/     ← Collector mô phỏng domain attacker
🚀 Hướng dẫn chạy dự án
Yêu cầu

Node.js ≥ 18

npm hoặc yarn

Thêm file .env cho frontend
REACT_APP_API_URL=https://be-for-bikes-shop.onrender.com
Cách chạy (2 terminal)
# Clone repo
git clone https://github.com/Cuonghoclaptrinh/WebAnToan.git


# Terminal 1 – Web chính
cd bikes_shop-viet
npm install
npm run dev
# → http://localhost:3000


# Terminal 2 – Collector (hacker)
cd jwt-leak-collector
npm install
npm run dev
# → http://localhost:5173
🎯 Cách thực hiện demo tấn công

Truy cập http://localhost:3000

Đăng nhập bằng tài khoản test:

Email: viet@gmail.com

Mật khẩu: 12345678

Chờ ~2 giây

Mở tab http://localhost:5173

🔥 Kết quả trước khi fix

Collector báo JWT Leak Detected!

Thấy đầy đủ: token + email + mật khẩu

Token bị lộ ngay lập tức

![Ảnh trước khi fix](./assets/beforeFix.png)

🛡️ Cách fix – Chỉ 1 dòng

Thêm vào file bikes_shop-viet/public/index.html trong <head>:

<meta name="referrer" content="no-referrer" />
✔️ Kết quả sau khi fix

Không còn leak dữ liệu

Collector không nhận được bất kỳ token nào

Demo bảo mật hoàn chỉnh

![Ảnh sau khi fix](./assets/afterFix.png)