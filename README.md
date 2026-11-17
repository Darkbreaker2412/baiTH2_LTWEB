# Bài thực hành 2 - ASP.NET Core Web API + EF Core + Axios

## Công nghệ
- Backend: ASP.NET Core Web API (.NET 10), EF Core, SQLite (file `products.db`, không cần cài database)
- Frontend: React + Vite + Axios

## Chạy backend
```bash
cd ProductApi
dotnet tool install --global dotnet-ef        # chỉ cần lần đầu
dotnet restore
dotnet ef migrations add InitialCreate        # tạo thư mục Migrations
dotnet ef database update                     # tạo file products.db + bảng Products
dotnet run
```
Swagger: http://localhost:5000/swagger

## Chạy frontend
```bash
cd frontend
npm install
npm run dev
```
Mở http://localhost:5173. Nếu backend khác port, sửa `baseURL` trong `frontend/src/api/productApi.js`.

## API
| Method | Endpoint | Chức năng |
|---|---|---|
| GET | /api/products | Lấy danh sách |
| GET | /api/products/{id} | Lấy theo id |
| POST | /api/products | Thêm mới |
| PUT | /api/products/{id} | Cập nhật (body phải có id trùng URL) |
| DELETE | /api/products/{id} | Xóa |
