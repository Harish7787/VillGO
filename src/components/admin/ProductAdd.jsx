import React, { useState } from "react";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductAdd({ onSubmit }) {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    brandId: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    onSubmit(formData);
  };

  return (
    <div className="p-6">

      {/* Hero */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-6">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-black">
              Add New Product
            </h1>

            <p className="text-sky-100 mt-2">
              Publish products to VillGo marketplace
            </p>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-8 space-y-5"
      >

        <div>
          <label className="font-bold text-sm">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl px-4 py-3"
            placeholder="Premium Basmati Rice"
          />
        </div>

        <div>
          <label className="font-bold text-sm">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-bold text-sm">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-bold text-sm">
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />
          </div>

        </div>

        {/* Category */}
        <div>
          <label className="font-bold text-sm">
            Category
          </label>

          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl px-4 py-3"
          >
            <option value="">Select Category</option>
            <option value="1">Rice</option>
            <option value="2">Oil</option>
            <option value="3">Spices</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="font-bold text-sm">
            Brand
          </label>

          <select
            name="brandId"
            value={product.brandId}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl px-4 py-3"
          >
            <option value="">Select Brand</option>
            <option value="1">Fortune</option>
            <option value="2">Aashirvaad</option>
            <option value="3">Ambika</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>

          <label className="font-bold text-sm">
            Product Image
          </label>

          <label className="mt-2 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:bg-slate-50">

            <UploadCloud size={40} />

            <span className="mt-2 text-sm">
              Click to Upload Product Image
            </span>

            <input
              hidden
              type="file"
              name="image"
              onChange={handleChange}
            />

          </label>

        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Save size={18} />
          Save Product
        </button>

      </form>

    </div>
  );
}