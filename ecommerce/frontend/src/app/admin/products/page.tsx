"use client";
import { useState } from "react";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    categoryId: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("sku", form.sku);
      formData.append("categoryId", form.categoryId);

      images.forEach((img) => formData.append("images", img));

      const token = localStorage.getItem("token");
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const text = await res.text();
        if (text) {
          data = JSON.parse(text);
        }
      }

      if (!res.ok) {
        throw new Error(data?.message || "Erro ao criar produto");
      }

      setSuccess("Produto criado com sucesso!");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        sku: "",
        categoryId: "",
      });
      setImages([]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro desconhecido");
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white border border-neutral-200 rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800">Cadastrar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Preço</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Estoque</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              min={0}
              step="1"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Categoria (opcional)</label>
            <input
              type="text"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Imagens</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition disabled:opacity-60"
        >
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
        {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
      {/* Preview das imagens selecionadas */}
      {images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((img, idx) => (
            <div key={idx} className="w-20 h-20 rounded border border-neutral-200 overflow-hidden flex items-center justify-center bg-neutral-50">
              <img src={URL.createObjectURL(img)} alt="" className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}