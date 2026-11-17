import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api/productApi";

const emptyForm = { name: "", price: "", quantity: "" };

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError("Không kết nối được tới API: " + err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };
    try {
      if (editingId === null) {
        await createProduct(data); // POST
      } else {
        await updateProduct(editingId, { id: editingId, ...data }); // PUT
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError("Lỗi khi lưu: " + err.message);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: p.price, quantity: p.quantity });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
      await deleteProduct(id); // DELETE
      load();
    } catch (err) {
      setError("Lỗi khi xóa: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Quản lý sản phẩm</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input name="name" placeholder="Tên" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Giá" value={form.price} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Số lượng" value={form.quantity} onChange={handleChange} required />
        <button type="submit">{editingId === null ? "Thêm" : "Cập nhật"}</button>
        {editingId !== null && (
          <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
            Hủy
          </button>
        )}
      </form>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr><th>ID</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th></th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Sửa</button>{" "}
                <button onClick={() => handleDelete(p.id)}>Xóa</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>Chưa có dữ liệu</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
