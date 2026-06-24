import React from "react";
import {
    Plus,
    ArrowLeft,
    Pencil,
    Trash2,
    RotateCcw,
    Package
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ProductTable({
    products,
    onDelete,
    onRestore,
    onEdit,
    onBack,
    onAddProduct
}) {
    const navigate = useNavigate();
    return (
        <div className="p-6">

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-3xl p-8 text-white mb-6 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                    <div>
                        <h1 className="text-3xl font-black">
                            Product Management
                        </h1>

                        <p className="text-sky-100 mt-2">
                            Manage inventory, update products and monitor stock levels.
                        </p>

                        <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                            <Package size={18} />
                            <span>
                                Total Products: {products.length}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/admin/products/add")}
                            className="px-5 py-3 bg-white text-sky-700 hover:bg-slate-100 rounded-xl font-bold transition"
                        >
                            <Plus size={18} className="inline mr-2" />
                            Add Product
                        </button>

                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow p-4 mb-4">
                <input
                    type="text"
                    placeholder="Search Product..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                <div className="px-6 py-4 border-b">
                    <h2 className="font-bold text-lg">
                        Product Inventory
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left">Product</th>
                                <th className="px-6 py-4 text-left">Price</th>
                                <th className="px-6 py-4 text-left">Stock</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b hover:bg-slate-50 transition"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-slate-800">
                                                {p.productName}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Product ID: #{p.id}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-green-600">
                                        ₹{p.price}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock > 10
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {p.stock} Available
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() => onEdit(p)}
                                                className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                onClick={() => onDelete(p.id)}
                                                className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <button
                                                onClick={() => onRestore(p.id)}
                                                className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
                                            >
                                                <RotateCcw size={18} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
}