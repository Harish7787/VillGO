// import React from "react";
// import {
//     Plus,
//     ArrowLeft,
//     Pencil,
//     Trash2,
//     RotateCcw,
//     Package
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// export default function ProductTable({
//     products,
//     onDelete,
//     onRestore,
//     onEdit,
//     onBack,
//     onAddProduct
// }) {
//     const navigate = useNavigate();
//     return (
//         <div className="p-6">

//             {/* Hero Section */}
//             <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-3xl p-8 text-white mb-6 shadow-xl">
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

//                     <div>
//                         <h1 className="text-3xl font-black">
//                             Product Management
//                         </h1>

//                         <p className="text-sky-100 mt-2">
//                             Manage inventory, update products and monitor stock levels.
//                         </p>

//                         <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
//                             <Package size={18} />
//                             <span>
//                                 Total Products: {products.length}
//                             </span>
//                         </div>
//                     </div>

//                     <div className="flex gap-3">
//                         <button
//                             onClick={() => navigate("/admin/products/add")}
//                             className="px-5 py-3 bg-white text-sky-700 hover:bg-slate-100 rounded-xl font-bold transition"
//                         >
//                             <Plus size={18} className="inline mr-2" />
//                             Add Product
//                         </button>

//                     </div>
//                 </div>
//             </div>

//             {/* Search */}
//             <div className="bg-white rounded-2xl shadow p-4 mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search Product..."
//                     className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
//                 />
//             </div>

//             {/* Product Table */}
//             <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

//                 <div className="px-6 py-4 border-b">
//                     <h2 className="font-bold text-lg">
//                         Product Inventory
//                     </h2>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full">

//                         <thead className="bg-slate-50">
//                             <tr>
//                                 <th className="px-6 py-4 text-left">Product</th>
//                                 <th className="px-6 py-4 text-left">Price</th>
//                                 <th className="px-6 py-4 text-left">Stock</th>
//                                 <th className="px-6 py-4 text-center">Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {products.map((p) => (
//                                 <tr
//                                     key={p.id}
//                                     className="border-b hover:bg-slate-50 transition"
//                                 >
//                                     <td className="px-6 py-4">
//                                         <div>
//                                             <p className="font-bold text-slate-800">
//                                                 {p.productName}
//                                             </p>

//                                             <p className="text-xs text-slate-500">
//                                                 Product ID: #{p.id}
//                                             </p>
//                                         </div>
//                                     </td>

//                                     <td className="px-6 py-4 font-semibold text-green-600">
//                                         ₹{p.price}
//                                     </td>

//                                     <td className="px-6 py-4">
//                                         <span
//                                             className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock > 10
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-red-100 text-red-700"
//                                                 }`}
//                                         >
//                                             {p.stock} Available
//                                         </span>
//                                     </td>

//                                     <td className="px-6 py-4">
//                                         <div className="flex justify-center gap-3">

//                                             <button
//                                                 onClick={() => onEdit(p)}
//                                                 className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
//                                             >
//                                                 <Pencil size={18} />
//                                             </button>

//                                             <button
//                                                 onClick={() => onDelete(p.id)}
//                                                 className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
//                                             >
//                                                 <Trash2 size={18} />
//                                             </button>

//                                             <button
//                                                 onClick={() => onRestore(p.id)}
//                                                 className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
//                                             >
//                                                 <RotateCcw size={18} />
//                                             </button>

//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>

//                     </table>
//                 </div>

//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import {
  getActiveProducts,
  deleteProduct,
  restoreProduct,
  getDeletedProducts,
} from "../../api/productApi";
import {
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  Package,
  Layers,
  Tag,
  Search,
  RefreshCw,
  UploadCloud,
  X,
  Info,
  DollarSign,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { useNavigate, useInRouterContext } from "react-router-dom";
import Toast from "../common/Toast";
import { getDeletedCategories } from "../../api/categoryApi";
import { getDeletedBrands } from "../../api/brandApi";
import {
  getActiveCategories
} from "../../api/categoryApi";

import {
  getActiveBrands
} from "../../api/brandApi";
export default function ProductTable({
  products: initialProducts = [],
  onDelete = () => { },
  onRestore = () => { },
  onEdit = () => { },
  apiHost = "http://localhost:8080",
  theme = "light"
}) {

  // Safe Router navigation checker to prevent sandbox preview compilation crashes
  let navigate;
  try {
    const inRouter = useInRouterContext ? useInRouterContext() : false;
    const routerNavigate = inRouter ? useNavigate() : null;
    navigate = routerNavigate ? routerNavigate : (path) => {
      console.warn("Navigation fallback triggered:", path);
      window.location.hash = path;
    };
  } catch (e) {
    navigate = (path) => {
      window.location.hash = path;
    };
  }

  // ━━━━━━━━━━━━━━━━━ 1. SELF-CONTAINED BACKEND API MAPPINGS ━━━━━━━━━━━━━━━━━
  // Defined locally using apiHost state to prevent any unresolved "./api" import errors during build
  // const api = {
  //   categories: {
  //     getActive: async () => {
  //       const res = await fetch(`${apiHost}/api/categories/active`);
  //       if (!res.ok) throw new Error("Network response was not ok");
  //       return res.json();
  //     },
  //     create: async (formData) => {
  //       const res = await fetch(`${apiHost}/api/categories/add`, {
  //         method: "POST",
  //         body: formData
  //       });
  //       if (!res.ok) throw new Error("Failed to create category");
  //       return res.json();
  //     },
  //     update: async (id, formData) => {
  //       const res = await fetch(`${apiHost}/api/categories/update/${id}`, {
  //         method: "PUT",
  //         body: formData
  //       });
  //       if (!res.ok) throw new Error("Failed to update category");
  //       return res.json();
  //     },
  //     changeAction: async (id, action) => {
  //       const res = await fetch(`${apiHost}/api/categories/action/${id}`, {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ action })
  //       });
  //       if (!res.ok) throw new Error("Failed to change action status");
  //       return res.json();
  //     },
  //     softDelete: async (id) => {
  //       const res = await fetch(`${apiHost}/api/categories/softdelete/${id}`, {
  //         method: "DELETE"
  //       });
  //       if (!res.ok) throw new Error("Failed to delete category");
  //       return res.json();
  //     },
  //     restore: async (id) => {
  //       const res = await fetch(`${apiHost}/api/categories/restore/${id}`, {
  //         method: "PUT"
  //       });
  //       if (!res.ok) throw new Error("Failed to restore category");
  //       return res.json();
  //     }
  //   },
  //   brands: {
  //     getActive: async () => {
  //       const res = await fetch(`${apiHost}/api/brands/active`);
  //       if (!res.ok) throw new Error("Network response was not ok");
  //       return res.json();
  //     },
  //     create: async (formData) => {
  //       const res = await fetch(`${apiHost}/api/brands`, {
  //         method: "POST",
  //         body: formData
  //       });
  //       if (!res.ok) throw new Error("Failed to create brand");
  //       return res.json();
  //     },
  //     update: async (id, formData) => {
  //       const res = await fetch(`${apiHost}/api/brands/update/${id}`, {
  //         method: "PUT",
  //         body: formData
  //       });
  //       if (!res.ok) throw new Error("Failed to update brand");
  //       return res.json();
  //     },
  //     changeAction: async (id, action) => {
  //       const res = await fetch(`${apiHost}/api/brands/action/${id}`, {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ action })
  //       });
  //       if (!res.ok) throw new Error("Failed to change action status");
  //       return res.json();
  //     },
  //     softDelete: async (id) => {
  //       const res = await fetch(`${apiHost}/api/brands/soft-delete/${id}`, {
  //         method: "DELETE"
  //       });
  //       if (!res.ok) throw new Error("Failed to delete brand");
  //       return res.json();
  //     },
  //     restore: async (id) => {
  //       const res = await fetch(`${apiHost}/api/brands/restore/${id}`, {
  //         method: "PUT"
  //       });
  //       if (!res.ok) throw new Error("Failed to restore brand");
  //       return res.json();
  //     }
  //   },
  //   products: {
  //     getActive: async () => {
  //       const res = await fetch(`${apiHost}/api/products/active`);
  //       if (!res.ok) throw new Error("Failed to fetch products");
  //       return res.json();
  //     },
  //     softDelete: async (id) => {
  //       const res = await fetch(`${apiHost}/api/products/soft-delete/${id}`, {
  //         method: "DELETE"
  //       });
  //       if (!res.ok) throw new Error("Failed to delete product");
  //       return res.json();
  //     },
  //     restore: async (id) => {
  //       const res = await fetch(`${apiHost}/api/products/restore/${id}`, {
  //         method: "PUT"
  //       });
  //       if (!res.ok) throw new Error("Failed to restore product");
  //       return res.json();
  //     }
  //   }
  // };

  // ━━━━━━━━━━━━━━━━━ 2. RELIABLE THEME AUTO DETECTOR ━━━━━━━━━━━━━━━━━
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    const checkTheme = () => {
      const isDarkClass = document.documentElement.classList.contains("dark");
      const localTheme = localStorage.getItem("theme");
      if (localTheme) {
        setIsDark(localTheme === "dark");
      } else {
        setIsDark(theme === "dark" || isDarkClass);
      }
    };

    checkTheme();
    // Watch for document class changes triggered by the Dashboard Sidebar
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  // ━━━━━━━━━━━━━━━━━ 3. STATE CONTROLLERS ━━━━━━━━━━━━━━━━━
  const [activeTab, setActiveTab] = useState("products"); // products | categories | brands
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | deleted
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  // ━━━━━━━━━━━━━━━━━ 4. DATA LIST STATES ━━━━━━━━━━━━━━━━━
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  // Modal controller states
  const [categoryModal, setCategoryModal] = useState({ open: false, isEdit: false, id: null, name: "", image: null });
  const [brandModal, setBrandModal] = useState({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);

  // Sync products prop with internal productsList safely
  // useEffect(() => {
  //   if (initialProducts && initialProducts.length > 0) {
  //     const mapped = initialProducts.map(p => ({
  //       id: p.id || Math.floor(Math.random() * 1000),
  //       productName: p.productName || p.name || "Unnamed Product",
  //       price: p.price || 0,
  //       stock: p.stock !== undefined ? p.stock : (p.quantity || 0),
  //       category: p.category || "Uncategorized",
  //       brand: p.brand || "Local Mandi",
  //       active: p.active !== undefined ? p.active : true,
  //       deleted: p.deleted || false
  //     }));
  //     setProductsList(mapped);
  //   } else {
  //     // Fallback premium datasets when offline
  //     setProductsList([
  //       { id: 101, productName: "Fortune Premium Mustard Oil", price: 175, stock: 120, category: "Edible Oils", brand: "Fortune", active: true, deleted: false },
  //       { id: 102, productName: "Aashirvaad Shudh Chakki Atta", price: 460, stock: 8, category: "Flour (Atta)", brand: "Aashirvaad", active: true, deleted: false },
  //       { id: 103, productName: "Ambika Kashmiri Chili Powder", price: 125, stock: 85, category: "Spices", brand: "Ambika", active: true, deleted: false }
  //     ]);
  //   }
  // }, [initialProducts]);

  // Fetch product catalog lists, categories, and brands dynamically from Active controller endpoints

  const fetchActiveMetadata = async () => {
    setLoading(true);
    try {
      const fetchProducts = async () => {
        try {

          setLoading(true);

          const response = await getActiveProducts();

          const products = response.data || [];
          console.log("Fetched products:", products);
          setProductsList(products);

        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      const response = await getActiveCategories();
      const catData = response.data;
      if (Array.isArray(catData)) {
        setCategoriesList(catData);
      } else {
        setCategoriesList([
          { id: 1, name: "Rice & Grains", action: true, deleted: false },
          { id: 2, name: "Edible Oils", action: true, deleted: false },
          { id: 3, name: "Spices", action: true, deleted: false }
        ]);
      }

      const brandData = await getActiveBrands();
      if (Array.isArray(brandData)) {
        setBrandsList(brandData);
      } else {
        setBrandsList([
          { id: 1, name: "Fortune", action: true, isDeleted: false, categoryName: "Edible Oils" },
          { id: 2, name: "Aashirvaad", action: true, isDeleted: false, categoryName: "Rice & Grains" },
          { id: 3, name: "Ambika", action: true, isDeleted: false, categoryName: "Spices" }
        ]);
      }
    } catch (err) {
      // console.warn("Backend server not responding, running with client-side fallback state.");

      console.error("API Error:", err);

      if (categoriesList.length === 0) {
        setCategoriesList([
          { id: 1, name: "Rice & Grains", action: true, deleted: false },
          { id: 2, name: "Edible Oils", action: true, deleted: false },
          { id: 3, name: "Spices", action: true, deleted: false }
        ]);
      }
      if (brandsList.length === 0) {
        setBrandsList([
          { id: 1, name: "Fortune", action: true, isDeleted: false, categoryName: "Edible Oils" },
          { id: 2, name: "Aashirvaad", action: true, isDeleted: false, categoryName: "Rice & Grains" },
          { id: 3, name: "Ambika", action: true, isDeleted: false, categoryName: "Spices" }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };
  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await getActiveProducts();

  //     const data = response.data.data || response.data;

  //     const mappedProducts = data.map((p) => ({
  //       id: p.id,
  //       productName: p.productName || p.name || "",
  //       category: p.category?.name || p.category || "",
  //       brand: p.brand?.name || p.brand || "",
  //       price: p.price || 0,
  //       stock: p.stock || p.quantity || 0,
  //       deleted: p.deleted || false,
  //     }));

  //     setProductsList(mappedProducts);

  //   } catch (err) {
  //     console.error(err);
  //     showToast("Failed to load products", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchProducts = async () => {
    try {

      setLoading(true);
const response =
  statusFilter === "deleted"
    ? await getDeletedProducts()
    : await getActiveProducts();

// console.log("Status Filter:", statusFilter);
// console.log("API Response:", response.data);

      setProductsList(response.data.data);

      const data = response.data.data || [];

      // const mapped = data.map((p) => ({
      //   id: p.id,
      //   productName: p.productName || p.name || "",
      //   category:
      //     p.category?.categoryName ||
      //     p.category?.name ||
      //     p.categoryName ||
      //     "",
      //   brand:
      //     p.brand?.brandName ||
      //     p.brand?.name ||
      //     p.brandName ||
      //     "",
      //   price: p.price ?? 0,
      //   stock: p.stock ?? p.quantity ?? 0,
      //   deleted: p.deleted ?? false,
      // }));

      const mapped = data.map((p) => ({
    id: p.id,
    productName: p.productName || p.name || "",
    category:
        p.category?.categoryName ||
        p.category?.name ||
        p.categoryName ||
        "",
    brand:
        p.brand?.brandName ||
        p.brand?.name ||
        p.brandName ||
        "",
    price: p.price ?? 0,
    stock: p.stock ?? p.quantity ?? 0,

    // ⭐ IMPORTANT
    deleted: statusFilter === "deleted",
}));

      setProductsList(mapped);

    } finally {
      setLoading(false);
    }
  };
const fetchCategories = async () => {
  try {
    const response =
      statusFilter === "deleted"
        ? await getDeletedCategories()
        : await getActiveCategories();

    console.log("Category Response:", response);

    const data = response.data || [];

    setCategoriesList(
      data.map((c, index) => ({
        id: c.id ?? c.sn ?? index,
        name: c.name,
        image: c.image,
        action: c.action,
        deleted: statusFilter === "deleted",
      }))
    );
  } catch (err) {
    console.error(err);
    setCategoriesList([]);
  }
};
const fetchBrands = async () => {
  try {
    const response =
      statusFilter === "deleted"
        ? await getDeletedBrands()
        : await getActiveBrands();

    console.log("Brand Response:", response);

    const data = response.data || [];

    setBrandsList(
      data.map((b, index) => ({
        id: b.id ?? b.sn ?? index,
        name: b.name,
        categoryId: b.categoryId,
        categoryName: b.categoryName,
        image: b.image,
        action: b.action,
        isDeleted: statusFilter === "deleted",
      }))
    );
  } catch (err) {
    console.error(err);
    setBrandsList([]);
  }
};

  // useEffect(() => {
  //     fetchProducts();
  // }, []);

useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
}, [statusFilter]);
  // ━━━━━━━━━━━━━━━━━ 5. CATEGORY ENDPOINTS CRUD ━━━━━━━━━━━━━━━━━
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", categoryModal.name);
      if (categoryModal.image) {
        formData.append("image", categoryModal.image);
      }

      if (categoryModal.isEdit) {
        await api.categories.update(categoryModal.id, formData);
        showToast("Category updated successfully!");
      } else {
        await api.categories.create(formData);
        showToast("Category created successfully!");
      }
      fetchActiveMetadata();
      setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null });
      setImagePreview(null);
    } catch (err) {
      if (categoryModal.isEdit) {
        setCategoriesList(categoriesList.map(c => c.id === categoryModal.id ? { ...c, name: categoryModal.name } : c));
      } else {
        setCategoriesList([...categoriesList, { id: Date.now(), name: categoryModal.name, action: true, deleted: false }]);
      }
      showToast("Updated client state locally.");
      setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null });
      setImagePreview(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategoryStatus = async (id, currentStatus) => {
    try {
      await api.categories.changeAction(id, !currentStatus);
      showToast("Category status updated!");
      fetchActiveMetadata();
    } catch (err) {
      setCategoriesList(categoriesList.map(c => c.id === id ? { ...c, action: !currentStatus } : c));
      showToast("Category action toggled locally.");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.categories.softDelete(id);
      showToast("Category deleted successfully!");
      fetchActiveMetadata();
    } catch (err) {
      setCategoriesList(categoriesList.map(c => c.id === id ? { ...c, deleted: true } : c));
      showToast("Category soft-deleted locally.");
    }
  };

  const restoreCategory = async (id) => {
    try {
      await api.categories.restore(id);
      showToast("Category restored successfully!");
      fetchActiveMetadata();
    } catch (err) {
      setCategoriesList(categoriesList.map(c => c.id === id ? { ...c, deleted: false } : c));
      showToast("Category restored locally.");
    }
  };

  // ━━━━━━━━━━━━━━━━━ 6. BRAND ENDPOINTS CRUD ━━━━━━━━━━━━━━━━━
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", brandModal.name);
      formData.append("categoryId", brandModal.categoryId);
      if (brandModal.image) {
        formData.append("image", brandModal.image);
      }

      if (brandModal.isEdit) {
        await api.brands.update(brandModal.id, formData);
        showToast("Brand updated successfully!");
      } else {
        await api.brands.create(formData);
        showToast("Brand created successfully!");
      }
      fetchActiveMetadata();
      setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
      setImagePreview(null);
    } catch (err) {
      if (brandModal.isEdit) {
        setBrandsList(brandsList.map(b => b.id === brandModal.id ? { ...b, name: brandModal.name } : b));
      } else {
        const catName = categoriesList.find(c => c.id === parseInt(brandModal.categoryId))?.name || "General";
        setBrandsList([...brandsList, { id: Date.now(), name: brandModal.name, action: true, isDeleted: false, categoryName: catName }]);
      }
      showToast("Updated brand state locally.");
      setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
      setImagePreview(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleBrandStatus = async (id, currentStatus) => {
    try {
      await api.brands.changeAction(id, !currentStatus);
      showToast("Brand status updated!");
      fetchActiveMetadata();
    } catch (err) {
      setBrandsList(brandsList.map(b => b.id === id ? { ...b, action: !currentStatus } : b));
      showToast("Brand action toggled locally.");
    }
  };

  const deleteBrand = async (id) => {
    try {
      await api.brands.softDelete(id);
      showToast("Brand deleted successfully!");
      fetchActiveMetadata();
    } catch (err) {
      setBrandsList(brandsList.map(b => b.id === id ? { ...b, isDeleted: true } : b));
      showToast("Brand soft-deleted locally.");
    }
  };

  const restoreBrand = async (id) => {
    try {
      await api.brands.restore(id);
      showToast("Brand restored successfully!");
      fetchActiveMetadata();
    } catch (err) {
      setBrandsList(brandsList.map(b => b.id === id ? { ...b, isDeleted: false } : b));
      showToast("Brand restored locally.");
    }
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ━━━━━━━━━━━━━━━━━ 7. PRODUCT CRUD ACTION DISPATCHERS ━━━━━━━━━━━━━━━━━
  const handleProductDelete = async (id) => {
    try {

      await deleteProduct(id);

      showToast("Product deleted", "success");

      fetchProducts();

    } catch (err) {

      showToast("Delete failed", "error");

    }
  };

  const handleProductRestore = async (id) => {

    try {

      await restoreProduct(id);

      showToast("Product restored", "success");

      fetchProducts();

    } catch (err) {

      showToast("Restore failed", "error");

    }

  };

  // Filtering based on Search Query & Status Filters
  const filteredProducts = productsList.filter((p) => {

    const productName = (p.productName || "").toLowerCase();
    const category = (p.category || "").toLowerCase();
    const brand = (p.brand || "").toLowerCase();

    const search = searchQuery.toLowerCase();

    const matchesSearch =
      productName.includes(search) ||
      category.includes(search) ||
      brand.includes(search);

    if (statusFilter === "active")
      return matchesSearch && !p.deleted;

    if (statusFilter === "deleted")
      return matchesSearch && p.deleted;

    return matchesSearch;
  });

  const filteredCategories = categoriesList.filter(c => {
    const matchesSearch = (c.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === "active") return matchesSearch && !c.deleted;
    if (statusFilter === "deleted") return matchesSearch && c.deleted;
    return matchesSearch;
  });

  const filteredBrands = brandsList.filter(b => {
    const matchesSearch = (b.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.categoryName && b.categoryName.toLowerCase().includes(searchQuery.toLowerCase()));
    if (statusFilter === "active") return matchesSearch && !b.isDeleted;
    if (statusFilter === "deleted") return matchesSearch && b.isDeleted;
    return matchesSearch;
  });

  return (
    <div className={`flex-1 p-4 md:p-8 min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0b1120] text-slate-100 dark" : "bg-slate-50 text-slate-800"
      }`}>
      <div className={isDark ? "dark" : ""}>

        {/* {toast.show && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl bg-emerald-600 text-white font-bold animate-bounce">
            <span>{toast.message}</span>
          </div>
        )} */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToast({
                show: false,
                message: "",
                type: "success",
              })
            }
          />
        )}

        {/* Header banner */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-6 pointer-events-none">
            <Package size={220} />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 relative z-10">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Product & Category Hub
              </h1>
              <p className="text-sky-100 text-sm mt-1">
                Centralized platform for managing B2B marketplace inventory, categories, and brands
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <Package size={14} />
                  Products: {productsList.length}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <Layers size={14} />
                  Categories: {categoriesList.length}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <Tag size={14} />
                  Brands: {brandsList.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (activeTab === "products") navigate("/admin/products/add");
                  else if (activeTab === "categories") setCategoryModal({ open: true, isEdit: false, id: null, name: "", image: null });
                  else if (activeTab === "brands") setBrandModal({ open: true, isEdit: false, id: null, name: "", categoryId: "", image: null });
                }}
                className="px-5 py-3 bg-white text-slate-900 hover:bg-sky-50 rounded-2xl font-black text-sm shadow-md flex items-center gap-2 transition active:scale-95 shrink-0"
              >
                <Plus size={18} />
                Add New {activeTab === "products" ? "Product" : activeTab === "categories" ? "Category" : "Brand"}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "products"
                ? "border-sky-500 text-sky-500 dark:text-sky-400 font-black"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
          >
            <Package size={16} />
            Products Catalog
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "categories"
                ? "border-sky-500 text-sky-500 dark:text-sky-400 font-black"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
          >
            <Layers size={16} />
            Category Master
          </button>

          <button
            onClick={() => setActiveTab("brands")}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "brands"
                ? "border-sky-500 text-sky-500 dark:text-sky-400 font-black"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
          >
            <Tag size={16} />
            Brands Hub
          </button>
        </div>

        {/* Filters Panel */}
        <div className={`border p-4 mb-6 rounded-2xl shadow transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

            {/* Search inputs */}
            <div className="relative md:col-span-8">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${isDark
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-sky-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-sky-500/20"
                  }`}
              />
            </div>

            {/* Status dropdown filters */}
            <div className="md:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 cursor-pointer transition-all ${isDark
                    ? "bg-slate-800 border-slate-700 text-white focus:ring-sky-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
                  }`}
              >
                <option value="all">All Records</option>
                <option value="active">Active Only</option>
                <option value="deleted">Soft-Deleted Only</option>
              </select>
            </div>

            {/* Refresh button */}
            <div className="md:col-span-1 flex justify-end">
              <button
                onClick={fetchActiveMetadata}
                disabled={loading}
                className={`p-3 rounded-xl border transition flex items-center justify-center w-full md:w-auto ${isDark
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                title="Refresh Table Records"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
            </div>

          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━ TAB 1: PRODUCTS CATALOG SECTION ━━━━━━━━━━━━━━━━━ */}
        {activeTab === "products" && (
          <div className={`rounded-3xl shadow-lg border overflow-hidden transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800/80" : "bg-white border-slate-100"
            }`}>
            <div className={`px-6 py-4 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}>
              <h2 className="font-bold text-lg">Marketplace Catalog Inventory</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`text-xs font-bold uppercase tracking-wider ${isDark ? "bg-slate-800/60 text-slate-400" : "bg-slate-50 text-slate-500"
                  }`}>
                  <tr>
                    <th className="px-6 py-4 text-left">Product Details</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Brand</th>
                    <th className="px-6 py-4 text-left">Wholesale Price</th>
                    <th className="px-6 py-4 text-left">Stock Available</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className={`transition ${isDark ? "hover:bg-slate-800/30 text-slate-100" : "hover:bg-slate-50 text-slate-800"
                      } ${p.deleted ? "opacity-55" : ""}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sky-500 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"
                            }`}>
                            {p.productName.substring(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold">{p.productName}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">ID: #{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">{p.category}</td>
                      <td className="px-6 py-4">
                        <span className="bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs px-2.5 py-1 rounded-lg font-bold border border-sky-500/20">
                          {p.brand}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-emerald-500 text-base">₹{p.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.stock > 10
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                          }`}>
                          {p.stock} Units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2.5">
                          {!p.deleted ? (
                            <>
                              <button
                                onClick={() => onEdit(p)}
                                className={`p-2 rounded-xl transition-all active:scale-95 ${isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                                  }`}
                                title="Edit Product"
                              >
                                <Pencil size={15} />
                              </button>

                              <button
                                onClick={() => handleProductDelete(p.id)}
                                className={`p-2 rounded-xl transition-all active:scale-95 ${isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                                  }`}
                                title="Delete Product"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleProductRestore(p.id)}
                              className={`p-2 rounded-xl transition-all active:scale-95 ${isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                }`}
                              title="Restore Product"
                            >
                              <RotateCcw size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        No product matches found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━ TAB 2: CATEGORY HUB SECTION ━━━━━━━━━━━━━━━━━ */}
        {activeTab === "categories" && (
          <div className={`rounded-3xl shadow-lg border overflow-hidden transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800/80" : "bg-white border-slate-100"
            }`}>
            <div className={`px-6 py-4 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}>
              <h2 className="font-bold text-lg">Category Mapping Directory</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className={`text-xs font-bold uppercase tracking-wider ${isDark ? "bg-slate-800/60 text-slate-400" : "bg-slate-50 text-slate-500"
                  }`}>
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Category Name</th>
                    <th className="px-6 py-4">API Active Status</th>
                    <th className="px-6 py-4 text-center">Manage Actions</th>
                  </tr>
                </thead>

                <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
                  {filteredCategories.map((c) => (
                    <tr key={c.id} className={`transition ${isDark ? "hover:bg-slate-800/30 text-slate-100" : "hover:bg-slate-50 text-slate-800"
                      } ${c.deleted ? "opacity-55" : ""}`}>
                      <td className="px-6 py-4 font-mono text-slate-400">#{c.id}</td>
                      <td className="px-6 py-4 font-bold flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sky-500 text-xs ${isDark ? "bg-slate-800 shadow-inner" : "bg-slate-100 shadow-inner"
                          }`}>
                          {c.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span>{c.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleCategoryStatus(c.id, c.action)}
                          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${c.action
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                            }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${c.action ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                          {c.action ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2.5">
                          {!c.deleted ? (
                            <>
                              <button
                                onClick={() => setCategoryModal({ open: true, isEdit: true, id: c.id, name: c.name, image: null })}
                                className={`p-2 rounded-xl transition ${isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                                  }`}
                                title="Edit Category"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => deleteCategory(c.id)}
                                className={`p-2 rounded-xl transition ${isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                                  }`}
                                title="Delete Category"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => restoreCategory(c.id)}
                              className={`p-2 rounded-xl transition ${isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                }`}
                              title="Restore Category"
                            >
                              <RotateCcw size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━ TAB 3: BRAND HUB SECTION ━━━━━━━━━━━━━━━━━ */}
        {activeTab === "brands" && (
          <div className={`rounded-3xl shadow-lg border overflow-hidden transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800/80" : "bg-white border-slate-100"
            }`}>
            <div className={`px-6 py-4 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}>
              <h2 className="font-bold text-lg">Active Brands Directory</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className={`text-xs font-bold uppercase tracking-wider ${isDark ? "bg-slate-800/60 text-slate-400" : "bg-slate-50 text-slate-500"
                  }`}>
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Parent Category</th>
                    <th className="px-6 py-4">API Active Status</th>
                    <th className="px-6 py-4 text-center">Manage Actions</th>
                  </tr>
                </thead>

                <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
                  {filteredBrands.map((b) => (
                    <tr key={b.id} className={`transition ${isDark ? "hover:bg-slate-800/30 text-slate-100" : "hover:bg-slate-50 text-slate-800"
                      } ${b.isDeleted ? "opacity-55" : ""}`}>
                      <td className="px-6 py-4 font-mono text-slate-400">#{b.id}</td>
                      <td className="px-6 py-4 font-bold flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-indigo-500 text-xs ${isDark ? "bg-slate-800 shadow-inner" : "bg-slate-100 shadow-inner"
                          }`}>
                          {b.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span>{b.name}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-semibold">
                        {b.categoryName || "Edible Oils"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleBrandStatus(b.id, b.action)}
                          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${b.action
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                            }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${b.action ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                          {b.action ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2.5">
                          {!b.isDeleted ? (
                            <>
                              <button
                                onClick={() => setBrandModal({ open: true, isEdit: true, id: b.id, name: b.name, categoryId: b.categoryId || "1", image: null })}
                                className={`p-2 rounded-xl transition ${isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                                  }`}
                                title="Edit Brand"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => deleteBrand(b.id)}
                                className={`p-2 rounded-xl transition ${isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                                  }`}
                                title="Delete Brand"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => restoreBrand(b.id)}
                              className={`p-2 rounded-xl transition ${isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                }`}
                              title="Restore Brand"
                            >
                              <RotateCcw size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBrands.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        No brands found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━ CATEGORY MODALS FORM ━━━━━━━━━━━━━━━━━ */}
        {categoryModal.open && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className={`border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-100 text-slate-800"
              }`}>

              <button
                onClick={() => { setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null }); setImagePreview(null); }}
                className={`absolute top-4 right-4 p-1.5 rounded-xl transition ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-black flex items-center gap-2 mb-4">
                <Layers className="text-sky-500" />
                {categoryModal.isEdit ? "Update Category Model" : "Create New Category"}
              </h3>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="font-bold text-xs block mb-1 text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category Name</label>
                  <input
                    type="text"
                    required
                    value={categoryModal.name}
                    onChange={(e) => setCategoryModal({ ...categoryModal, name: e.target.value })}
                    placeholder="e.g. Edible Oils"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all shadow-inner ${isDark
                        ? "bg-slate-800 border-slate-700 text-white focus:ring-sky-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
                      }`}
                  />
                </div>

                <div>
                  <label className="font-bold text-xs block mb-1 text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category Image</label>
                  {!imagePreview ? (
                    <label className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDark ? "border-slate-700 hover:bg-slate-800/40" : "border-slate-200 hover:bg-slate-50"
                      }`}>
                      <UploadCloud size={28} className="text-sky-500 mb-1" />
                      <span className="text-xs font-bold">Click to upload file</span>
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setCategoryModal)}
                      />
                    </label>
                  ) : (
                    <div className={`flex items-center justify-between border p-3 rounded-2xl ${isDark ? "border-slate-800 bg-slate-800/50" : "border-slate-100 bg-slate-50"
                      }`}>
                      <div className="flex items-center gap-3">
                        <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-xl shadow-md border" />
                        <p className="text-xs font-bold">Ready to dispatch</p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); setImagePreview(null); setCategoryModal(prev => ({ ...prev, image: null })); }}
                        className="p-1.5 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:scale-95 transition flex items-center justify-center"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null }); setImagePreview(null); }}
                    className={`px-4 py-2 text-xs font-black rounded-xl transition ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-750" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {loading && <RefreshCw size={12} className="animate-spin" />}
                    {categoryModal.isEdit ? "Update Category" : "Save Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━ BRAND MODALS FORM ━━━━━━━━━━━━━━━━━ */}
        {brandModal.open && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className={`border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-100 text-slate-800"
              }`}>

              <button
                onClick={() => { setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null }); setImagePreview(null); }}
                className={`absolute top-4 right-4 p-1.5 rounded-xl transition ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-black flex items-center gap-2 mb-4">
                <Tag className="text-sky-500" />
                {brandModal.isEdit ? "Update Brand Model" : "Create New Brand"}
              </h3>

              <form onSubmit={handleBrandSubmit} className="space-y-4">
                <div>
                  <label className="font-bold text-xs block mb-1 text-slate-500 dark:text-slate-400 uppercase tracking-wider">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={brandModal.name}
                    onChange={(e) => setBrandModal({ ...brandModal, name: e.target.value })}
                    placeholder="e.g. Fortune"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all shadow-inner ${isDark
                        ? "bg-slate-800 border-slate-700 text-white focus:ring-sky-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
                      }`}
                  />
                </div>

                <div>
                  <label className="font-bold text-xs block mb-1 text-slate-500 dark:text-slate-400 uppercase tracking-wider">Link Parent Category</label>
                  <select
                    required
                    value={brandModal.categoryId}
                    onChange={(e) => setBrandModal({ ...brandModal, categoryId: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 cursor-pointer transition-all shadow-inner ${isDark
                        ? "bg-slate-800 border-slate-700 text-white focus:ring-sky-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
                      }`}
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-xs block mb-1 text-slate-500 dark:text-slate-400 uppercase tracking-wider">Brand Logo Image</label>
                  {!imagePreview ? (
                    <label className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDark ? "border-slate-700 hover:bg-slate-800/40" : "border-slate-200 hover:bg-slate-50"
                      }`}>
                      <UploadCloud size={28} className="text-sky-500 mb-1" />
                      <span className="text-xs font-bold">Click to upload file</span>
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setBrandModal)}
                      />
                    </label>
                  ) : (
                    <div className={`flex items-center justify-between border p-3 rounded-2xl ${isDark ? "border-slate-800 bg-slate-800/50" : "border-slate-100 bg-slate-50"
                      }`}>
                      <div className="flex items-center gap-3">
                        <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-xl shadow-md border animate-fade-in" />
                        <p className="text-xs font-bold">Ready to dispatch</p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); setImagePreview(null); setBrandModal(prev => ({ ...prev, image: null })); }}
                        className="p-1.5 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:scale-95 transition flex items-center justify-center"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null }); setImagePreview(null); }}
                    className={`px-4 py-2 text-xs font-black rounded-xl transition ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-750" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {loading && <RefreshCw size={12} className="animate-spin" />}
                    {brandModal.isEdit ? "Update Brand" : "Save Brand"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}