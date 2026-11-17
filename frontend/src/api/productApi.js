import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // đổi đúng port backend nếu khác
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => api.get("/products");                              // GET
export const getProductById = (id) => api.get(`/products/${id}`);                   // GET theo id
export const createProduct = (product) => api.post("/products", product);           // POST
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);  // PUT
export const deleteProduct = (id) => api.delete(`/products/${id}`);                 // DELETE
