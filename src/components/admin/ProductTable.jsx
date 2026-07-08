

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Plus,
//   Pencil,
//   Trash2,
//   RotateCcw,
//   Package,
//   Layers,
//   Tag,
//   Search,
//   RefreshCw,
//   UploadCloud,
//   X,
//   CheckCircle,
//   AlertTriangle,
//   FolderOpen
// } from "lucide-react";
// import { useNavigate, useInRouterContext } from "react-router-dom";

// // ━━━━━━━━━━━━━━━━━ INLINED SECURE API WRAPPERS ━━━━━━━━━━━━━━━━━
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ""
//     }
//   };
// };

// const getMultipartHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//       "Content-Type": "multipart/form-data"
//     }
//   };
// };

// // --- Inlined Category APIs ---
// const getActiveCategories = (host) => axios.get(`${host}/api/categories/active`, getAuthHeaders());
// const getDeletedCategories = (host) => axios.get(`${host}/api/categories/deleted`, getAuthHeaders());
// const createCategory = (host, formData) => axios.post(`${host}/api/categories/add`, formData, getMultipartHeaders());
// const updateCategory = (host, id, formData) => axios.put(`${host}/api/categories/update/${id}`, formData, getMultipartHeaders());
// const deleteCategory = (host, id) => axios.delete(`${host}/api/categories/softdelete/${id}`, getAuthHeaders());
// const restoreCategory = (host, id) => axios.put(`${host}/api/categories/restore/${id}`, {}, getAuthHeaders());
// const changeCategoryAction = (host, id, action) => axios.put(`${host}/api/categories/action/${id}`, { action }, getAuthHeaders());

// // --- Inlined Product APIs ---
// const getActiveProducts = (host) => axios.get(`${host}/api/products/active`);
// const getDeletedProducts = (host) => axios.get(`${host}/api/products/deleted`, getAuthHeaders());
// const deleteProduct = (host, id) => axios.delete(`${host}/api/products/delete/${id}`, getAuthHeaders());
// const restoreProduct = (host, id) => axios.put(`${host}/api/products/restore/${id}`, {}, getAuthHeaders());

// // --- Inlined Brand APIs ---
// const getActiveBrands = (host) => axios.get(`${host}/api/brands/active`, getAuthHeaders());
// const getDeletedBrands = (host) => axios.get(`${host}/api/brands/deleted`, getAuthHeaders());
// const createBrand = (host, formData) => axios.post(`${host}/api/brands`, formData, getAuthHeaders());
// const updateBrand = (host, id, formData) => axios.put(`${host}/api/brands/update/${id}`, formData, getAuthHeaders());
// const deleteBrand = (host, id) => axios.delete(`${host}/api/brands/soft-delete/${id}`, getAuthHeaders());
// const restoreBrand = (host, id) => axios.put(`${host}/api/brands/restore/${id}`, {}, getAuthHeaders());
// const changeBrandAction = (host, id, action) => axios.put(`${host}/api/brands/action/${id}`, { action }, getAuthHeaders());

// // ━━━━━━━━━━━━━━━━━ INLINED PREMIUM TOAST ━━━━━━━━━━━━━━━━━
// function Toast({ message, type, onClose }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3500);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const isSuccess = type === "success";

//   return (
//     <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-black animate-bounce backdrop-blur-md transition-all duration-300 bg-white dark:bg-[#111b30] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
//       <span className={`flex h-2.5 w-2.5 relative`}>
//         <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSuccess ? "bg-emerald-400" : "bg-rose-400"}`}></span>
//         <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSuccess ? "bg-emerald-500" : "bg-rose-500"}`}></span>
//       </span>
//       <span>{message}</span>
//       <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition ml-2">
//         <X size={14} />
//       </button>
//     </div>
//   );
// }

// export default function ProductTable({
//   products: initialProducts = [],
//   onDelete = () => { },
//   onRestore = () => { },
//   onEdit = () => { },
//   apiHost = "http://localhost:8080",
//   theme = "light"
// }) {

//   // ━━━━━━━━━━━━━━━━━ SAFE NAVIGATION CHECKER ━━━━━━━━━━━━━━━━━
//   let navigate;
//   try {
//     const inRouter = useInRouterContext ? useInRouterContext() : false;
//     const routerNavigate = inRouter ? useNavigate() : null;
//     navigate = routerNavigate ? routerNavigate : (path) => {
//       console.warn("Navigation fallback triggered:", path);
//       window.location.hash = path;
//     };
//   } catch (e) {
//     navigate = (path) => {
//       window.location.hash = path;
//     };
//   }

//   // ━━━━━━━━━━━━━━━━━ PREMIUM THEME DETECTOR ━━━━━━━━━━━━━━━━━
//   const [isDark, setIsDark] = useState(theme === "dark");

//   useEffect(() => {
//     const checkTheme = () => {
//       const isDarkClass = document.documentElement.classList.contains("dark");
//       const localTheme = localStorage.getItem("theme");
//       if (localTheme) {
//         setIsDark(localTheme === "dark");
//       } else {
//         setIsDark(theme === "dark" || isDarkClass);
//       }
//     };

//     checkTheme();
//     const observer = new MutationObserver(checkTheme);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
//     return () => observer.disconnect();
//   }, [theme]);

//   // ━━━━━━━━━━━━━━━━━ SYSTEM STATE CONTROLLERS ━━━━━━━━━━━━━━━━━
//   const [activeTab, setActiveTab] = useState("products"); // products | categories | brands
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("active"); // all | active | deleted
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" });

//   const showToast = (message, type = "success") => {
//     setToast({ show: true, message, type });
//   };

//   // ━━━━━━━━━━━━━━━━━ DATA DIRECTORY STATES ━━━━━━━━━━━━━━━━━
//   const [productsList, setProductsList] = useState([]);
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [brandsList, setBrandsList] = useState([]);

//   // Modals UI controller states
//   const [categoryModal, setCategoryModal] = useState({ open: false, isEdit: false, id: null, name: "", image: null });
//   const [brandModal, setBrandModal] = useState({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
//   const [imagePreview, setImagePreview] = useState(null);

//   // ━━━━━━━━━━━━━━━━━ DYNAMIC API INTEGRATIONS ━━━━━━━━━━━━━━━━━
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = statusFilter === "deleted"
//         ? await getDeletedProducts(apiHost)
//         : await getActiveProducts(apiHost);

//       const rawData = response?.data?.data || response?.data || [];
//       const mapped = rawData.map((p) => ({
//         id: p.id,
//         productName: p.productName || p.name || "Unnamed Product",
//         category: p.category?.categoryName || p.category?.name || p.categoryName || "General",
//         brand: p.brand?.brandName || p.brand?.name || p.brandName || "Local Brand",
//         price: p.price ?? 0,
//         stock: p.stock ?? p.quantity ?? 0,
//         deleted: statusFilter === "deleted"
//       }));

//       setProductsList(mapped);
//     } catch (err) {
//       console.warn("Backend server connection failed, showing fallback simulated products.");
//       const fallbackProducts = [
//         { id: 101, productName: "Fortune Premium Mustard Oil", category: "Edible Oils", brand: "Fortune", price: 175, stock: 450, deleted: false },
//         { id: 102, productName: "Aashirvaad Shudh Chakki Atta", category: "Rice & Grains", brand: "Aashirvaad", price: 460, stock: 120, deleted: false },
//         { id: 103, productName: "Fortune Soya Health Oil 1L", category: "Edible Oils", brand: "Fortune", price: 140, stock: 8, deleted: false },
//         { id: 104, productName: "Ambika Kashmiri Red Chili Powder", category: "Spices", brand: "Ambika", price: 95, stock: 0, deleted: false },
//         { id: 105, productName: "Saffola Gold Blended Oil 5L", category: "Edible Oils", brand: "Fortune", price: 820, stock: 85, deleted: true },
//       ];
//       setProductsList(statusFilter === "deleted" ? fallbackProducts.filter(p => p.deleted) : fallbackProducts.filter(p => !p.deleted));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = statusFilter === "deleted"
//         ? await getDeletedCategories()
//         : await getActiveCategories();

//       const rawData = response?.data || [];
//       setCategoriesList(
//         rawData.map((c, index) => ({
//           id: c.id ?? c.sn ?? index,
//           name: c.name || "Unnamed Category",
//           image: c.image,
//           action: c.action ?? true,
//           deleted: statusFilter === "deleted",
//         }))
//       );
//     } catch (err) {
//       const fallbackCategories = [
//         { id: 1, name: "Rice & Grains", action: true, deleted: false },
//         { id: 2, name: "Edible Oils", action: true, deleted: false },
//         { id: 3, name: "Spices", action: false, deleted: false },
//         { id: 4, name: "Flours & Suji", action: true, deleted: true }
//       ];
//       setCategoriesList(statusFilter === "deleted" ? fallbackCategories.filter(c => c.deleted) : fallbackCategories.filter(c => !c.deleted));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBrands = async () => {
//     setLoading(true);
//     try {
//       const response = statusFilter === "deleted"
//         ? await getDeletedBrands(apiHost)
//         : await getActiveBrands(apiHost);

//       const rawData = response?.data || [];
//       setBrandsList(
//         rawData.map((b, index) => ({
//           id: b.id ?? b.sn ?? index,
//           name: b.name || "Unnamed Brand",
//           categoryId: b.categoryId,
//           categoryName: b.categoryName || "Edible Oils",
//           image: b.image,
//           action: b.action ?? true,
//           isDeleted: statusFilter === "deleted",
//         }))
//       );
//     } catch (err) {
//       const fallbackBrands = [
//         { id: 1, name: "Fortune", action: true, isDeleted: false, categoryName: "Edible Oils" },
//         { id: 2, name: "Aashirvaad", action: true, isDeleted: false, categoryName: "Rice & Grains" },
//         { id: 3, name: "Ambika", action: false, isDeleted: false, categoryName: "Spices" },
//         { id: 4, name: "TATA Salt", action: true, isDeleted: true, categoryName: "Spices" }
//       ];
//       setBrandsList(statusFilter === "deleted" ? fallbackBrands.filter(b => b.isDeleted) : fallbackBrands.filter(b => !b.isDeleted));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Sync state triggers
//   // useEffect(() => {
//   //   fetchProducts();
//   //   fetchCategories();
//   //   fetchBrands();
//   // }, [statusFilter]);

//   useEffect(() => {
//     fetchProducts();
//     fetchActiveMetadata();
// }, [statusFilter]);

//   const handleRefreshAll = () => {
//     fetchProducts();
//     fetchCategories();
//     fetchBrands();
//     showToast("All databases re-synced successfully", "success");
//   };

//   // ━━━━━━━━━━━━━━━━━ CATEGORY ACTIONS ━━━━━━━━━━━━━━━━━
//   const handleCategorySubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", categoryModal.name);
//       formData.append("action", true);
//       if (categoryModal.image) {
//         formData.append("image", categoryModal.image);
//       }

//       if (categoryModal.isEdit) {
//         await updateCategory(apiHost, categoryModal.id, formData);
//         showToast("Category updated successfully", "success");
//       } else {
//         await createCategory(apiHost, formData);
//         showToast("Category created successfully", "success");
//       }
//       fetchCategories();
//       setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null });
//       setImagePreview(null);
//     } catch (err) {
//       if (categoryModal.isEdit) {
//         setCategoriesList(categoriesList.map(c => c.id === categoryModal.id ? { ...c, name: categoryModal.name } : c));
//         showToast("Category updated locally (Demo Mode)", "success");
//       } else {
//         setCategoriesList([...categoriesList, { id: Date.now(), name: categoryModal.name, action: true, deleted: false }]);
//         showToast("New category created locally (Demo Mode)", "success");
//       }
//       setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null });
//       setImagePreview(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleCategoryStatus = async (id, currentStatus) => {
//     try {
//       await changeCategoryAction(apiHost,id,!currentStatus);
//       showToast("Category status updated", "success");
//       await fetchActiveMetadata();
//     } catch (err) {
//       setCategoriesList(categoriesList.map(c => c.id === id ? { ...c, action: !currentStatus } : c));
//       showToast("Toggled status locally (Demo Mode)", "success");
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await deleteCategory(apiHost,id);
//       showToast("Category soft-deleted", "success");
//       await fetchActiveMetadata();
//     } catch (err) {
//       setCategoriesList(categoriesList.map(c => c.id === id ? { ...c, deleted: true } : c));
//       showToast("Category soft-deleted locally (Demo Mode)", "success");
//     }
//   };

//   const handleRestoreCategory = async (id) => {
//     try {
//       await restoreCategory(apiHost,id);
//       showToast("Category restored successfully", "success");
//     await fetchActiveMetadata();
//     } catch (err) {
//       setCategoriesList(categoriesList.map(c => c.id === id ? { ...c, deleted: false } : c));
//       showToast("Category restored locally (Demo Mode)", "success");
//     }
//   };

//   // ━━━━━━━━━━━━━━━━━ BRAND ACTIONS ━━━━━━━━━━━━━━━━━
//   const handleBrandSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", brandModal.name);
//       formData.append("categoryId", brandModal.categoryId);
//       if (brandModal.image) {
//         formData.append("image", brandModal.image);
//       }

//       if (brandModal.isEdit) {
//         await updateBrand(apiHost, brandModal.id, formData);
//         showToast("Brand updated successfully", "success");
//       } else {
//         await createBrand(apiHost, formData);
//         showToast("Brand registered successfully", "success");
//       }
//       await fetchActiveMetadata();
//       setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
//       setImagePreview(null);
//     } catch (err) {
//       if (brandModal.isEdit) {
//         setBrandsList(brandsList.map(b => b.id === brandModal.id ? { ...b, name: brandModal.name, categoryId: brandModal.categoryId } : b));
//         showToast("Brand updated locally (Demo Mode)", "success");
//       } else {
//         const catName = categoriesList.find(c => String(c.id) === String(brandModal.categoryId))?.name || "General";
//         setBrandsList([...brandsList, { id: Date.now(), name: brandModal.name, action: true, isDeleted: false, categoryName: catName, categoryId: brandModal.categoryId }]);
//         showToast("Brand added locally (Demo Mode)", "success");
//       }
//       setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
//       setImagePreview(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleBrandStatus = async (id, currentStatus) => {
//     try {
//       await changeBrandAction(apiHost, id, !currentStatus);
//       showToast("Brand configuration altered", "success");
//     await fetchActiveMetadata();
//     } catch (err) {
//       setBrandsList(brandsList.map(b => b.id === id ? { ...b, action: !currentStatus } : b));
//       showToast("Toggled brand status locally", "success");
//     }
//   };

//   const handleDeleteBrand = async (id) => {
//     try {
//       await deleteBrand(apiHost, id);
//       showToast("Brand soft-deleted from hub", "success");
//     await fetchActiveMetadata();
//     } catch (err) {
//       setBrandsList(brandsList.map(b => b.id === id ? { ...b, isDeleted: true } : b));
//       showToast("Brand marked as soft-deleted locally", "success");
//     }
//   };

//   const handleRestoreBrand = async (id) => {
//     try {
//       await restoreBrand(apiHost, id);
//       showToast("Brand restored to catalog", "success");
//       await fetchActiveMetadata();
//     } catch (err) {
//       setBrandsList(brandsList.map(b => b.id === id ? { ...b, isDeleted: false } : b));
//       showToast("Brand restored locally", "success");
//     }
//   };

//   // ━━━━━━━━━━━━━━━━━ PRODUCT ACTIONS ━━━━━━━━━━━━━━━━━
//   const handleProductDelete = async (id) => {
//     try {
//       await deleteProduct(apiHost, id);
//       showToast("Product soft-deleted successfully", "success");
//       fetchProducts();
//     } catch (err) {
//       setProductsList(productsList.map(p => p.id === id ? { ...p, deleted: true } : p));
//       showToast("Product deleted locally (Demo Mode)", "success");
//     }
//   };

//   const handleProductRestore = async (id) => {
//     try {
//       await restoreProduct(apiHost, id);
//       showToast("Product restored to public bazaar", "success");
//       fetchProducts();
//     } catch (err) {
//       setProductsList(productsList.map(p => p.id === id ? { ...p, deleted: false } : p));
//       showToast("Product restored locally (Demo Mode)", "success");
//     }
//   };

//   // ━━━━━━━━━━━━━━━━━ FILE PREVIEW CONTROLLER ━━━━━━━━━━━━━━━━━
//   const handleFileChange = (e, setter) => {
//     const file = e.target.files[0];
//     if (file) {
//       setter(prev => ({ ...prev, image: file }));
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   // ━━━━━━━━━━━━━━━━━ REAL-TIME SEARCH FILTER LOGIC ━━━━━━━━━━━━━━━━━
//   const filteredProducts = productsList.filter((p) => {
//     const productName = (p.productName || "").toLowerCase();
//     const category = (p.category || "").toLowerCase();
//     const brand = (p.brand || "").toLowerCase();
//     const search = searchQuery.toLowerCase();

//     return productName.includes(search) || category.includes(search) || brand.includes(search);
//   });

//   const filteredCategories = categoriesList.filter((c) => {
//     return (c.name || "").toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   const filteredBrands = brandsList.filter((b) => {
//     const search = searchQuery.toLowerCase();
//     return (b.name || "").toLowerCase().includes(search) || (b.categoryName && b.categoryName.toLowerCase().includes(search));
//   });
// const fetchActiveMetadata = async () => {
//   setLoading(true);

//   try {
//     const [catRes, brandRes] = await Promise.all([
//       statusFilter === "deleted"
//         ? getDeletedCategories(apiHost)
//         : getActiveCategories(apiHost),

//       statusFilter === "deleted"
//         ? getDeletedBrands(apiHost)
//         : getActiveBrands(apiHost),
//     ]);

//     // Categories
//     setCategoriesList(
//       (catRes.data || []).map((c) => ({
//         id: c.id,
//         name: c.name,
//         image: c.image,
//         action: c.action,
//         deleted: c.deleted ?? statusFilter === "deleted",
//       }))
//     );

//     // Brands
//     setBrandsList(
//       (brandRes.data || []).map((b) => ({
//         id: b.id,
//         name: b.name,
//         categoryId: b.categoryId,
//         categoryName: b.categoryName,
//         image: b.image,
//         action: b.action,
//         isDeleted: b.deleted ?? statusFilter === "deleted",
//       }))
//     );
//   } catch (e) {
//     console.log(e);
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className={`flex-1 p-4 md:p-8 min-h-screen transition-colors duration-300 ${
//       isDark ? "bg-[#0b1120] text-slate-100" : "bg-slate-50 text-slate-800"
//     }`}>
      
//       {/* Dynamic Native Toast Notification */}
//       {toast.show && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast({ show: false, message: "", type: "success" })}
//         />
//       )}

//       {/* Corporate Hero Branding Segment */}
//       <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
//         <div className="absolute right-0 top-0 opacity-10 transform translate-x-8 -translate-y-8 pointer-events-none">
//           <Package size={260} />
//         </div>

//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
//           <div>
//             <div className="flex items-center gap-2 text-xs bg-white/20 px-3 py-1 rounded-full w-fit font-black tracking-wider uppercase mb-3 text-sky-100">
//               <span className="flex h-2.5 w-2.5 relative">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
//               </span>
//               Villgo Enterprise Console
//             </div>
//             <h1 className="text-2xl md:text-4xl font-black tracking-tight">
//               Product & Category Hub
//             </h1>
//             <p className="text-sky-100 text-xs md:text-sm mt-1 max-w-xl">
//               Organize bulk commodities, link retail categories, and track B2B brand relationships in premium realtime dashboard.
//             </p>

//             {/* Quick Metrics Badge Shelf */}
//             <div className="flex flex-wrap gap-2.5 mt-5">
//               <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-all px-4 py-2 rounded-2xl text-xs font-bold border border-white/5">
//                 <Package size={14} className="text-sky-200" />
//                 <span>Products: <strong className="text-white">{productsList.length}</strong></span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-all px-4 py-2 rounded-2xl text-xs font-bold border border-white/5">
//                 <Layers size={14} className="text-sky-200" />
//                 <span>Categories: <strong className="text-white">{categoriesList.length}</strong></span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-all px-4 py-2 rounded-2xl text-xs font-bold border border-white/5">
//                 <Tag size={14} className="text-sky-200" />
//                 <span>Brands: <strong className="text-white">{brandsList.length}</strong></span>
//               </div>
//             </div>
//           </div>

//           <div className="flex self-stretch lg:self-auto justify-end gap-3 shrink-0">
//             <button
//               onClick={() => {
//                 if (activeTab === "products") navigate("/admin/products/add");
//                 else if (activeTab === "categories") setCategoryModal({ open: true, isEdit: false, id: null, name: "", image: null });
//                 else if (activeTab === "brands") setBrandModal({ open: true, isEdit: false, id: null, name: "", categoryId: categoriesList[0]?.id || "1", image: null });
//               }}
//               className="w-full sm:w-auto px-6 py-4 bg-white text-slate-900 hover:bg-sky-50 active:scale-95 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-2.5 transition duration-150"
//             >
//               <Plus size={18} className="text-sky-600 stroke-[3]" />
//               Add {activeTab === "products" ? "Product" : activeTab === "categories" ? "Category" : "Brand"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Advanced Navigation Tabs */}
//       <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar gap-1">
//         <button
//           onClick={() => setActiveTab("products")}
//           className={`px-5 py-3.5 text-sm font-black border-b-2 transition-all flex items-center gap-2 shrink-0 ${
//             activeTab === "products"
//               ? "border-sky-500 text-sky-500 dark:text-sky-400"
//               : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
//           }`}
//         >
//           <Package size={16} />
//           Products Catalog
//         </button>

//         <button
//           onClick={() => setActiveTab("categories")}
//           className={`px-5 py-3.5 text-sm font-black border-b-2 transition-all flex items-center gap-2 shrink-0 ${
//             activeTab === "categories"
//               ? "border-sky-500 text-sky-500 dark:text-sky-400"
//               : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
//           }`}
//         >
//           <Layers size={16} />
//           Category Master
//         </button>

//         <button
//           onClick={() => setActiveTab("brands")}
//           className={`px-5 py-3.5 text-sm font-black border-b-2 transition-all flex items-center gap-2 shrink-0 ${
//             activeTab === "brands"
//               ? "border-sky-500 text-sky-500 dark:text-sky-400"
//               : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
//           }`}
//         >
//           <Tag size={16} />
//           Brands Directory
//         </button>
//       </div>

//       {/* Consolidated Premium Filters Bar */}
//       <div className={`border p-4 mb-6 rounded-2xl shadow-sm transition-all duration-300 ${
//         isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/60"
//       }`}>
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
//           {/* Real-time search engine */}
//           <div className="relative w-full md:flex-1">
//             <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
//               <Search size={18} />
//             </span>
//             <input
//               type="text"
//               placeholder={`Search in ${activeTab} by names, ID numbers or parameters...`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
//                 isDark
//                   ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:ring-sky-500/20"
//                   : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-sky-500/20"
//               }`}
//             />
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto self-stretch">
//             {/* Soft Deleted Toggle State Selector */}
//             <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 w-full sm:w-auto">
//               <button
//                 onClick={() => setStatusFilter("active")}
//                 className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
//                   statusFilter === "active"
//                     ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
//                     : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
//                 }`}
//               >
//                 <CheckCircle size={12} />
//                 Active
//               </button>
//               <button
//                 onClick={() => setStatusFilter("deleted")}
//                 className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
//                   statusFilter === "deleted"
//                     ? "bg-white dark:bg-slate-800 text-rose-500 shadow-sm"
//                     : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
//                 }`}
//               >
//                 <AlertTriangle size={12} />
//                 Trash Bin
//               </button>
//             </div>

//             {/* Smart Sync and Reload Icon */}
//             <button
//               onClick={handleRefreshAll}
//               disabled={loading}
//               className={`p-3 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
//                 isDark
//                   ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
//                   : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
//               }`}
//               title="Sync & Hydrate Databases"
//             >
//               <RefreshCw size={18} className={loading ? "animate-spin" : "hover:rotate-180 transition-transform duration-300"} />
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Loading Skeletons */}
//       {loading && (
//         <div className="space-y-3">
//           <div className="h-12 bg-slate-300/20 dark:bg-slate-800/50 animate-pulse rounded-xl w-full" />
//           <div className="h-20 bg-slate-300/20 dark:bg-slate-800/50 animate-pulse rounded-xl w-full" />
//           <div className="h-20 bg-slate-300/20 dark:bg-slate-800/50 animate-pulse rounded-xl w-full" />
//         </div>
//       )}

//       {/* ━━━━━━━━━━━━━━━━━ TAB 1: PRODUCTS BAZAAR CATALOG ━━━━━━━━━━━━━━━━━ */}
//       {!loading && activeTab === "products" && (
//         <div className="space-y-4">
          
//           {/* Mobile responsive card list (Visible only on mobile screen widths) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
//             {filteredProducts.map((p) => (
//               <div
//                 key={p.id}
//                 className={`border p-5 rounded-2xl shadow-sm flex flex-col justify-between transition-all ${
//                   isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/80"
//                 } ${p.deleted ? "opacity-60" : ""}`}
//               >
//                 <div>
//                   <div className="flex justify-between items-start mb-3">
//                     <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg">
//                       #{p.id}
//                     </span>
//                     <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
//                       {p.brand}
//                     </span>
//                   </div>
//                   <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm line-clamp-2">
//                     {p.productName}
//                   </h4>
//                   <p className="text-xs text-slate-400 mt-1">Category: <strong className="text-slate-500 dark:text-slate-300">{p.category}</strong></p>
//                 </div>

//                 <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-3 flex items-center justify-between">
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase tracking-wider">Wholesale Rate</p>
//                     <p className="font-black text-emerald-500 text-lg">₹{p.price}</p>
//                   </div>
//                   <div>
//                     <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
//                       p.stock > 10
//                         ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
//                         : p.stock > 0
//                         ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
//                         : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
//                     }`}>
//                       {p.stock === 0 ? "Out of Stock" : `${p.stock} Units`}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Mobile Quick Action Buttons Row */}
//                 <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 mt-4 pt-3">
//                   {!p.deleted ? (
//                     <>
//                       <button
//                         onClick={() => onEdit(p)}
//                         className={`flex-1 p-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold ${
//                           isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
//                         }`}
//                       >
//                         <Pencil size={14} />
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleProductDelete(p.id)}
//                         className="p-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-xl transition"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => handleProductRestore(p.id)}
//                       className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold ${
//                         isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
//                       }`}
//                     >
//                       <RotateCcw size={14} />
//                       Restore Product
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Desktop high density table */}
//           <div className={`hidden lg:block rounded-3xl border overflow-hidden ${
//             isDark ? "bg-[#111b30] border-slate-800/80" : "bg-white border-slate-200/80"
//           }`}>
//             <table className="w-full text-left border-collapse">
//               <thead className={`text-xs font-bold uppercase tracking-wider ${
//                 isDark ? "bg-slate-800/40 text-slate-400" : "bg-slate-50 text-slate-500"
//               }`}>
//                 <tr>
//                   <th className="px-6 py-4.5">Product Title</th>
//                   <th className="px-6 py-4.5">Category</th>
//                   <th className="px-6 py-4.5">Brand</th>
//                   <th className="px-6 py-4.5">Wholesale Price</th>
//                   <th className="px-6 py-4.5">Inventory Status</th>
//                   <th className="px-6 py-4.5 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
//                 {filteredProducts.map((p) => (
//                   <tr
//                     key={p.id}
//                     className={`transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
//                       p.deleted ? "opacity-55" : ""
//                     }`}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sky-500 border ${
//                           isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
//                         }`}>
//                           {p.productName.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-bold text-slate-800 dark:text-slate-100">{p.productName}</p>
//                           <p className="text-[10px] font-mono text-slate-400 mt-0.5">ID: #{p.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
//                       {p.category}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs px-2.5 py-1 rounded-lg font-bold border border-sky-500/10">
//                         {p.brand}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 font-black text-emerald-500 text-base">
//                       ₹{p.price}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
//                         p.stock > 10
//                           ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
//                           : p.stock > 0
//                           ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
//                           : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
//                       }`}>
//                         {p.stock === 0 ? "Out of Stock" : `${p.stock} Units Available`}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex justify-end gap-2.5">
//                         {!p.deleted ? (
//                           <>
//                             <button
//                               onClick={() => onEdit(p)}
//                               className={`p-2.5 rounded-xl transition-all active:scale-95 ${
//                                 isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
//                               }`}
//                               title="Edit Product Specs"
//                             >
//                               <Pencil size={15} />
//                             </button>
//                             <button
//                               onClick={() => handleProductDelete(p.id)}
//                               className={`p-2.5 rounded-xl transition-all active:scale-95 ${
//                                 isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
//                               }`}
//                               title="Move to Trash"
//                             >
//                               <Trash2 size={15} />
//                             </button>
//                           </>
//                         ) : (
//                           <button
//                             onClick={() => handleProductRestore(p.id)}
//                             className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 text-xs font-bold flex items-center gap-1 ${
//                               isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
//                             }`}
//                           >
//                             <RotateCcw size={14} />
//                             Restore
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredProducts.length === 0 && (
//             <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
//               <FolderOpen size={48} className="mx-auto text-slate-400 mb-2.5" />
//               <p className="text-slate-400 font-bold">No products found in database.</p>
//               <p className="text-slate-500 text-xs mt-1">Try changing filter queries or add a fresh commodity listing.</p>
//             </div>
//           )}

//         </div>
//       )}

//       {/* ━━━━━━━━━━━━━━━━━ TAB 2: CATEGORY DIRECTORY MASTER ━━━━━━━━━━━━━━━━━ */}
//       {!loading && activeTab === "categories" && (
//         <div className="space-y-4">
          
//           {/* Card Based view for categories (Mobile view responsive) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
//             {filteredCategories.map((c) => (
//               <div
//                 key={c.id}
//                 className={`border p-4 rounded-2xl flex flex-col justify-between transition ${
//                   isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/80"
//                 } ${c.deleted ? "opacity-60" : ""}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sky-500 border ${
//                     isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
//                   }`}>
//                     {c.name.substring(0, 2).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{c.name}</p>
//                     <p className="text-[10px] font-mono text-slate-400">ID: #{c.id}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4 pt-3.5">
//                   <button
//                     onClick={() => handleToggleCategoryStatus(c.id, c.action)}
//                     className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 transition-all ${
//                       c.action
//                         ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
//                         : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
//                     }`}
//                   >
//                     <span className={`w-1.5 h-1.5 rounded-full ${c.action ? "bg-emerald-500" : "bg-amber-500"}`} />
//                     {c.action ? "Active" : "Inactive"}
//                   </button>

//                   <div className="flex gap-1.5">
//                     {!c.deleted ? (
//                       <>
//                         <button
//                           onClick={() => setCategoryModal({ open: true, isEdit: true, id: c.id, name: c.name, image: null })}
//                           className={`p-2 rounded-xl transition ${
//                             isDark ? "bg-sky-500/10 text-sky-400" : "bg-sky-50 text-sky-600"
//                           }`}
//                         >
//                           <Pencil size={13} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCategory(c.id)}
//                           className="p-2 bg-rose-500/10 text-rose-500 rounded-xl"
//                         >
//                           <Trash2 size={13} />
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => handleRestoreCategory(c.id)}
//                         className={`p-2 rounded-xl transition text-xs font-bold flex items-center gap-1 ${
//                           isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
//                         }`}
//                       >
//                         <RotateCcw size={13} />
//                         Restore
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Desktop high density category table */}
//           <div className={`hidden lg:block rounded-3xl border overflow-hidden ${
//             isDark ? "bg-[#111b30] border-slate-800/80" : "bg-white border-slate-200/80"
//           }`}>
//             <table className="w-full text-left border-collapse">
//               <thead className={`text-xs font-bold uppercase tracking-wider ${
//                 isDark ? "bg-slate-800/40 text-slate-400" : "bg-slate-50 text-slate-500"
//               }`}>
//                 <tr>
//                   <th className="px-6 py-4.5">ID</th>
//                   <th className="px-6 py-4.5">Category Title</th>
//                   <th className="px-6 py-4.5">Status</th>
//                   <th className="px-6 py-4.5 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
//                 {filteredCategories.map((c) => (
//                   <tr
//                     key={c.id}
//                     className={`transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
//                       c.deleted ? "opacity-55" : ""
//                     }`}
//                   >
//                     <td className="px-6 py-4 font-mono text-slate-400">#{c.id}</td>
//                     <td className="px-6 py-4 font-bold flex items-center gap-3">
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sky-500 text-xs border ${
//                         isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
//                       }`}>
//                         {c.name.substring(0, 2).toUpperCase()}
//                       </div>
//                       <span className="text-slate-800 dark:text-slate-100 font-extrabold">{c.name}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleToggleCategoryStatus(c.id, c.action)}
//                         className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
//                           c.action
//                             ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
//                             : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
//                         }`}
//                         title="Click to toggle availability"
//                       >
//                         <span className={`w-1.5 h-1.5 rounded-full ${c.action ? "bg-emerald-500" : "bg-amber-500"}`} />
//                         {c.action ? "Active" : "Inactive"}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex justify-end gap-2.5">
//                         {!c.deleted ? (
//                           <>
//                             <button
//                               onClick={() => setCategoryModal({ open: true, isEdit: true, id: c.id, name: c.name, image: null })}
//                               className={`p-2.5 rounded-xl transition ${
//                                 isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
//                               }`}
//                               title="Edit Category"
//                             >
//                               <Pencil size={15} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteCategory(c.id)}
//                               className={`p-2.5 rounded-xl transition ${
//                                 isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
//                               }`}
//                               title="Soft-delete Category"
//                             >
//                               <Trash2 size={15} />
//                             </button>
//                           </>
//                         ) : (
//                           <button
//                             onClick={() => handleRestoreCategory(c.id)}
//                             className={`px-3 py-1.5 rounded-xl transition text-xs font-black flex items-center gap-1 ${
//                               isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
//                             }`}
//                           >
//                             <RotateCcw size={14} />
//                             Restore Category
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredCategories.length === 0 && (
//             <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
//               <Layers size={48} className="mx-auto text-slate-400 mb-2.5" />
//               <p className="text-slate-400 font-bold">No categories exist.</p>
//               <p className="text-slate-500 text-xs mt-1">Add a master index segment to list commodity subgroups.</p>
//             </div>
//           )}

//         </div>
//       )}

//       {/* ━━━━━━━━━━━━━━━━━ TAB 3: BRANDS DIRECTORY HUB ━━━━━━━━━━━━━━━━━ */}
//       {!loading && activeTab === "brands" && (
//         <div className="space-y-4">
          
//           {/* Mobile responsive view for brands */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
//             {filteredBrands.map((b) => (
//               <div
//                 key={b.id}
//                 className={`border p-4 rounded-2xl flex flex-col justify-between transition ${
//                   isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/80"
//                 } ${b.isDeleted ? "opacity-60" : ""}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-indigo-500 border ${
//                     isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
//                   }`}>
//                     {b.name.substring(0, 2).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{b.name}</p>
//                     <p className="text-xs text-slate-400">Parent: <strong className="text-slate-500 dark:text-slate-300">{b.categoryName}</strong></p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4 pt-3.5">
//                   <button
//                     onClick={() => handleToggleBrandStatus(b.id, b.action)}
//                     className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 transition-all ${
//                       b.action
//                         ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
//                         : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
//                     }`}
//                   >
//                     <span className={`w-1.5 h-1.5 rounded-full ${b.action ? "bg-emerald-500" : "bg-amber-500"}`} />
//                     {b.action ? "Live" : "Hold"}
//                   </button>

//                   <div className="flex gap-1.5">
//                     {!b.isDeleted ? (
//                       <>
//                         <button
//                           onClick={() => setBrandModal({ open: true, isEdit: true, id: b.id, name: b.name, categoryId: b.categoryId || "1", image: null })}
//                           className={`p-2 rounded-xl transition ${
//                             isDark ? "bg-sky-500/10 text-sky-400" : "bg-sky-50 text-sky-600"
//                           }`}
//                         >
//                           <Pencil size={13} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteBrand(b.id)}
//                           className="p-2 bg-rose-500/10 text-rose-500 rounded-xl"
//                         >
//                           <Trash2 size={13} />
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         onClick={() => handleRestoreBrand(b.id)}
//                         className={`p-2 rounded-xl transition text-xs font-bold flex items-center gap-1 ${
//                           isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
//                         }`}
//                       >
//                         <RotateCcw size={13} />
//                         Restore
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Desktop view table for brands */}
//           <div className={`hidden lg:block rounded-3xl border overflow-hidden ${
//             isDark ? "bg-[#111b30] border-slate-800/80" : "bg-white border-slate-200/80"
//           }`}>
//             <table className="w-full text-left border-collapse">
//               <thead className={`text-xs font-bold uppercase tracking-wider ${
//                 isDark ? "bg-slate-800/40 text-slate-400" : "bg-slate-50 text-slate-500"
//               }`}>
//                 <tr>
//                   <th className="px-6 py-4.5">Brand Identity ID</th>
//                   <th className="px-6 py-4.5">Brand Label</th>
//                   <th className="px-6 py-4.5">Associated Category Map</th>
//                   <th className="px-6 py-4.5">Hub Status</th>
//                   <th className="px-6 py-4.5 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
//                 {filteredBrands.map((b) => (
//                   <tr
//                     key={b.id}
//                     className={`transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
//                       b.isDeleted ? "opacity-55" : ""
//                     }`}
//                   >
//                     <td className="px-6 py-4 font-mono text-slate-400">#{b.id}</td>
//                     <td className="px-6 py-4 font-bold flex items-center gap-3">
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-indigo-500 text-xs border ${
//                         isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
//                       }`}>
//                         {b.name.substring(0, 2).toUpperCase()}
//                       </div>
//                       <span className="text-slate-800 dark:text-slate-100 font-extrabold">{b.name}</span>
//                     </td>
//                     <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-bold">
//                       {b.categoryName || "Edible Oils"}
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleToggleBrandStatus(b.id, b.action)}
//                         className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
//                           b.action
//                             ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
//                             : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
//                         }`}
//                         title="Switch availability block"
//                       >
//                         <span className={`w-1.5 h-1.5 rounded-full ${b.action ? "bg-emerald-500" : "bg-amber-500"}`} />
//                         {b.action ? "Live on Villgo" : "Hold Active State"}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex justify-end gap-2.5">
//                         {!b.isDeleted ? (
//                           <>
//                             <button
//                               onClick={() => setBrandModal({ open: true, isEdit: true, id: b.id, name: b.name, categoryId: b.categoryId || "1", image: null })}
//                               className={`p-2.5 rounded-xl transition ${
//                                 isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
//                               }`}
//                               title="Edit Brand Map"
//                             >
//                               <Pencil size={15} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteBrand(b.id)}
//                               className={`p-2.5 rounded-xl transition ${
//                                 isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
//                               }`}
//                               title="Soft-delete Brand"
//                             >
//                               <Trash2 size={15} />
//                             </button>
//                           </>
//                         ) : (
//                           <button
//                             onClick={() => handleRestoreBrand(b.id)}
//                             className={`px-3 py-1.5 rounded-xl transition text-xs font-black flex items-center gap-1 ${
//                               isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600"
//                             }`}
//                           >
//                             <RotateCcw size={14} />
//                             Restore Brand
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredBrands.length === 0 && (
//             <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
//               <Tag size={48} className="mx-auto text-slate-400 mb-2.5" />
//               <p className="text-slate-400 font-bold">No active B2B brands linked.</p>
//               <p className="text-slate-500 text-xs mt-1">Click top right button to link wholesaler manufacturers.</p>
//             </div>
//           )}

//         </div>
//       )}

//       {/* ━━━━━━━━━━━━━━━━━ CATEGORY ACTION FORM POP-UP MODAL ━━━━━━━━━━━━━━━━━ */}
//       {categoryModal.open && (
//         <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className={`border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative transition-all duration-300 transform scale-100 animate-in fade-in-50 duration-200 ${
//             isDark ? "bg-[#111b30] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
//           }`}>
            
//             <button
//               onClick={() => { setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null }); setImagePreview(null); }}
//               className={`absolute top-4 right-4 p-2 rounded-xl transition ${
//                 isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
//               }`}
//             >
//               <X size={18} />
//             </button>

//             <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-sky-500 dark:text-sky-400">
//               <Layers size={22} className="stroke-[2.5]" />
//               {categoryModal.isEdit ? "Modify Commodity Segment" : "Map New Category"}
//             </h3>

//             <form onSubmit={handleCategorySubmit} className="space-y-4">
//               <div>
//                 <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
//                   Category Identifier Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={categoryModal.name}
//                   onChange={(e) => setCategoryModal({ ...categoryModal, name: e.target.value })}
//                   placeholder="e.g. Rice & Grains, Essential Oils"
//                   className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
//                     isDark
//                       ? "bg-slate-900 border-slate-800 text-white focus:ring-sky-500/20"
//                       : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
//                   }`}
//                 />
//               </div>

//               <div>
//                 <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
//                   Graphic Emblem/Banner (Optional)
//                 </label>
//                 {!imagePreview ? (
//                   <label className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
//                     isDark ? "border-slate-800 bg-slate-900 hover:bg-slate-900/55" : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
//                   }`}>
//                     <UploadCloud size={32} className="text-sky-500 mb-1.5" />
//                     <span className="text-xs font-black">Browse image from explorer</span>
//                     <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, SVG up to 2MB</span>
//                     <input
//                       hidden
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e, setCategoryModal)}
//                     />
//                   </label>
//                 ) : (
//                   <div className={`flex items-center justify-between border p-3 rounded-2xl ${
//                     isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-50"
//                   }`}>
//                     <div className="flex items-center gap-3">
//                       <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-xl shadow border border-slate-300 dark:border-slate-800" />
//                       <div>
//                         <p className="text-xs font-black">Emblem loaded</p>
//                         <p className="text-[10px] text-slate-400">Ready for dispatch upload</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={(e) => { e.preventDefault(); setImagePreview(null); setCategoryModal(prev => ({ ...prev, image: null })); }}
//                       className="p-2 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:scale-95 transition"
//                     >
//                       <X size={14} />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="pt-2 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => { setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null }); setImagePreview(null); }}
//                   className={`px-4 py-2.5 text-xs font-black rounded-xl transition ${
//                     isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                   }`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-750 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md disabled:opacity-50"
//                 >
//                   {loading && <RefreshCw size={12} className="animate-spin" />}
//                   {categoryModal.isEdit ? "Update Segment" : "Validate Segment"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ━━━━━━━━━━━━━━━━━ BRAND ACTION FORM POP-UP MODAL ━━━━━━━━━━━━━━━━━ */}
//       {brandModal.open && (
//         <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className={`border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative transition-all duration-300 transform scale-100 animate-in fade-in-50 duration-200 ${
//             isDark ? "bg-[#111b30] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
//           }`}>
            
//             <button
//               onClick={() => { setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null }); setImagePreview(null); }}
//               className={`absolute top-4 right-4 p-2 rounded-xl transition ${
//                 isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
//               }`}
//             >
//               <X size={18} />
//             </button>

//             <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-sky-500 dark:text-sky-400">
//               <Tag size={22} className="stroke-[2.5]" />
//               {brandModal.isEdit ? "Update Wholesaler Brand Mapping" : "Register Brand Entity"}
//             </h3>

//             <form onSubmit={handleBrandSubmit} className="space-y-4">
//               <div>
//                 <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
//                   Brand Commercial Label Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={brandModal.name}
//                   onChange={(e) => setBrandModal({ ...brandModal, name: e.target.value })}
//                   placeholder="e.g. Fortune, Aashirvaad, TATA"
//                   className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
//                     isDark
//                       ? "bg-slate-900 border-slate-800 text-white focus:ring-sky-500/20"
//                       : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
//                   }`}
//                 />
//               </div>

//               <div>
//                 <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
//                   Select Parent Hub Category
//                 </label>
//                 <select
//                   required
//                   value={brandModal.categoryId}
//                   onChange={(e) => setBrandModal({ ...brandModal, categoryId: e.target.value })}
//                   className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 cursor-pointer transition-all ${
//                     isDark
//                       ? "bg-slate-900 border-slate-800 text-white focus:ring-sky-500/20"
//                       : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
//                   }`}
//                 >
//                   <option value="">Choose category block...</option>
//                   {categoriesList.map(c => (
//                     <option key={c.id} value={c.id}>{c.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
//                   Official Brand Trademark Emblem
//                 </label>
//                 {!imagePreview ? (
//                   <label className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
//                     isDark ? "border-slate-800 bg-slate-900 hover:bg-slate-900/55" : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
//                   }`}>
//                     <UploadCloud size={32} className="text-sky-500 mb-1.5" />
//                     <span className="text-xs font-black">Browse files</span>
//                     <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, SVG up to 2MB</span>
//                     <input
//                       hidden
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e, setBrandModal)}
//                     />
//                   </label>
//                 ) : (
//                   <div className={`flex items-center justify-between border p-3 rounded-2xl ${
//                     isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-50"
//                   }`}>
//                     <div className="flex items-center gap-3">
//                       <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-xl shadow border border-slate-300 dark:border-slate-800" />
//                       <div>
//                         <p className="text-xs font-black">Emblem loaded</p>
//                         <p className="text-[10px] text-slate-400">Ready to save</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={(e) => { e.preventDefault(); setImagePreview(null); setBrandModal(prev => ({ ...prev, image: null })); }}
//                       className="p-2 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:scale-95 transition"
//                     >
//                       <X size={14} />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="pt-2 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => { setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null }); setImagePreview(null); }}
//                   className={`px-4 py-2.5 text-xs font-black rounded-xl transition ${
//                     isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                   }`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-750 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md disabled:opacity-50"
//                 >
//                   {loading && <RefreshCw size={12} className="animate-spin" />}
//                   {brandModal.isEdit ? "Update Trademark" : "Register Trademark"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  CheckCircle,
  AlertTriangle,
  FolderOpen
} from "lucide-react";
import { useNavigate, useInRouterContext } from "react-router-dom";

// ━━━━━━━━━━━━━━━━━ INLINED SECURE API WRAPPERS ━━━━━━━━━━━━━━━━━
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
};

const getMultipartHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "multipart/form-data"
    }
  };
};

// --- Inlined Category APIs ---
const getActiveCategories = (host) => axios.get(`${host}/api/categories/active`, getAuthHeaders());
const getDeletedCategories = (host) => axios.get(`${host}/api/categories/deleted`, getAuthHeaders());
const createCategory = (host, formData) => axios.post(`${host}/api/categories/add`, formData, getMultipartHeaders());
const updateCategory = (host, id, formData) => axios.put(`${host}/api/categories/update/${id}`, formData, getMultipartHeaders());
const deleteCategory = (host, id) => axios.delete(`${host}/api/categories/softdelete/${id}`, getAuthHeaders());
const restoreCategory = (host, id) => axios.put(`${host}/api/categories/restore/${id}`, {}, getAuthHeaders());
const changeCategoryAction = (host, id, action) => axios.put(`${host}/api/categories/action/${id}`, { action }, getAuthHeaders());

// --- Inlined Product APIs ---
const getActiveProducts = (host) => axios.get(`${host}/api/products/active`);
const getDeletedProducts = (host) => axios.get(`${host}/api/products/deleted`, getAuthHeaders());
const deleteProduct = (host, id) => axios.delete(`${host}/api/products/delete/${id}`, getAuthHeaders());
const restoreProduct = (host, id) => axios.put(`${host}/api/products/restore/${id}`, {}, getAuthHeaders());

// --- Inlined Brand APIs ---
const getActiveBrands = (host) => axios.get(`${host}/api/brands/active`, getAuthHeaders());
const getDeletedBrands = (host) => axios.get(`${host}/api/brands/deleted`, getAuthHeaders());
const createBrand = (host, formData) => axios.post(`${host}/api/brands`, formData, getMultipartHeaders());
const updateBrand = (host, id, formData) => axios.put(`${host}/api/brands/update/${id}`, formData, getMultipartHeaders());
const deleteBrand = (host, id) => axios.delete(`${host}/api/brands/soft-delete/${id}`, getAuthHeaders());
const restoreBrand = (host, id) => axios.put(`${host}/api/brands/restore/${id}`, {}, getAuthHeaders());
const changeBrandAction = (host, id, action) => axios.put(`${host}/api/brands/action/${id}`, { action }, getAuthHeaders());

// ━━━━━━━━━━━━━━━━━ INLINED PREMIUM TOAST ━━━━━━━━━━━━━━━━━
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-black animate-bounce backdrop-blur-md transition-all duration-300 bg-white dark:bg-[#111b30] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
      <span className="flex h-2.5 w-2.5 relative">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSuccess ? "bg-emerald-400" : "bg-rose-400"}`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSuccess ? "bg-emerald-500" : "bg-rose-500"}`}></span>
      </span>
      <span>{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition ml-2">
        <X size={14} />
      </button>
    </div>
  );
}

export default function ProductTable({
  products: initialProducts = [],
  onDelete = () => { },
  onRestore = () => { },
  onEdit = () => { },
  apiHost = "https://villgo-backend-1.onrender.com",
  theme = "light"
}) {

  // ━━━━━━━━━━━━━━━━━ SAFE NAVIGATION CHECKER ━━━━━━━━━━━━━━━━━
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

  // ━━━━━━━━━━━━━━━━━ DYNAMIC & OBSERVED THEME HANDLER ━━━━━━━━━━━━━━━━━
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    const syncThemeState = () => {
      const isDarkClass = document.documentElement.classList.contains("dark");
      const localTheme = localStorage.getItem("theme");
      if (localTheme) {
        setIsDark(localTheme === "dark");
      } else {
        setIsDark(theme === "dark" || isDarkClass);
      }
    };

    syncThemeState();

    // Listen to explicit localStorage toggle actions across tabs
    window.addEventListener("storage", syncThemeState);

    // Watch parent DOM class modification
    const observer = new MutationObserver(syncThemeState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("storage", syncThemeState);
      observer.disconnect();
    };
  }, [theme]);

  // ━━━━━━━━━━━━━━━━━ CONTROL STATES ━━━━━━━━━━━━━━━━━
  const [activeTab, setActiveTab] = useState("products"); // products | categories | brands
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("active"); // active | deleted
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // ━━━━━━━━━━━━━━━━━ LIVE RECORDS STATE SHELF ━━━━━━━━━━━━━━━━━
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  // Modal UI States
  const [categoryModal, setCategoryModal] = useState({ open: false, isEdit: false, id: null, name: "", image: null });
  const [brandModal, setBrandModal] = useState({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);

  // ━━━━━━━━━━━━━━━━━ COMMODITIES DATABASE FETCHERS ━━━━━━━━━━━━━━━━━
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = statusFilter === "deleted"
        ? await getDeletedProducts(apiHost)
        : await getActiveProducts(apiHost);

      const rawData = response?.data?.data || response?.data || [];
      const mapped = rawData.map((p) => ({
        id: p.id,
        productName: p.productName || p.name || "Unnamed Product",
        category: p.category?.categoryName || p.category?.name || p.categoryName || "General",
        brand: p.brand?.brandName || p.brand?.name || p.brandName || "Local Brand",
        price: p.price ?? 0,
        stock: p.stock ?? p.quantity ?? 0,
        deleted: statusFilter === "deleted"
      }));

      setProductsList(mapped);
    } catch (err) {
      console.error("Failed to connect to backend product service:", err);
      showToast("Cannot connect to server. Check backend host or token.", "error");
      setProductsList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveMetadata = async () => {
    setLoading(true);
    try {
      const [catRes, brandRes] = await Promise.all([
        statusFilter === "deleted"
          ? getDeletedCategories(apiHost)
          : getActiveCategories(apiHost),
        statusFilter === "deleted"
          ? getDeletedBrands(apiHost)
          : getActiveBrands(apiHost),
      ]);

      // Handle Categories State Load
      const categoriesData = catRes?.data || [];
      setCategoriesList(
        categoriesData.map((c, index) => ({
          id: c.id ?? index,
          name: c.name || "Unnamed Category",
          image: c.image,
          action: c.action ?? true,
          deleted: statusFilter === "deleted",
        }))
      );

      // Handle Brands State Load
      const brandsData = brandRes?.data || [];
      setBrandsList(
        brandsData.map((b, index) => ({
          id: b.id ?? index,
          name: b.name || "Unnamed Brand",
          categoryId: b.categoryId,
          categoryName: b.categoryName || "General Oils",
          image: b.image,
          action: b.action ?? true,
          isDeleted: statusFilter === "deleted",
        }))
      );
    } catch (err) {
      console.error("Platform metadata pipeline failed to hydrate:", err);
      showToast("Backend Server connection offline.", "error");
      setCategoriesList([]);
      setBrandsList([]);
    } finally {
      setLoading(false);
    }
  };

  // Sync effect hooks
  useEffect(() => {
    fetchProducts();
    fetchActiveMetadata();
  }, [statusFilter]);

  const handleRefreshAll = () => {
    fetchProducts();
    fetchActiveMetadata();
    showToast("Server databases re-synced successfully", "success");
  };

  // ━━━━━━━━━━━━━━━━━ LIVE CATEGORY ACTIONS ━━━━━━━━━━━━━━━━━
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", categoryModal.name);
      formData.append("action", true);
      if (categoryModal.image) {
        formData.append("image", categoryModal.image);
      }

      if (categoryModal.isEdit) {
        await updateCategory(apiHost, categoryModal.id, formData);
        showToast("Category updated successfully", "success");
      } else {
        await createCategory(apiHost, formData);
        showToast("Category registered successfully", "success");
      }
      fetchActiveMetadata();
      setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null });
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to sync category action.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCategoryStatus = async (id, currentStatus) => {
    try {
      await changeCategoryAction(apiHost, id, !currentStatus);
      showToast("Category state modified", "success");
      fetchActiveMetadata();
    } catch (err) {
      console.error(err);
      showToast("Failed to alter category status on server.", "error");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(apiHost, id);
      showToast("Category removed from live marketplace", "success");
      fetchActiveMetadata();
    } catch (err) {
      console.error(err);
      showToast("Database soft-delete action failed.", "error");
    }
  };

  const handleRestoreCategory = async (id) => {
    try {
      await restoreCategory(apiHost, id);
      showToast("Category reinstated to hub", "success");
      fetchActiveMetadata();
    } catch (err) {
      console.error(err);
      showToast("Database restoration pipeline error.", "error");
    }
  };

  // ━━━━━━━━━━━━━━━━━ LIVE BRAND ACTIONS ━━━━━━━━━━━━━━━━━
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
        await updateBrand(apiHost, brandModal.id, formData);
        showToast("Brand metadata saved", "success");
      } else {
        await createBrand(apiHost, formData);
        showToast("Brand identity registered", "success");
      }
      fetchActiveMetadata();
      setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null });
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to commit brand update.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBrandStatus = async (id, currentStatus) => {
    try {
      await changeBrandAction(apiHost, id, !currentStatus);
      showToast("Brand commercial state synced", "success");
      fetchActiveMetadata();
    } catch (err) {
      console.error(err);
      showToast("Failed to alter brand state on database.", "error");
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      await deleteBrand(apiHost, id);
      showToast("Brand moved to trash segment", "success");
      fetchActiveMetadata();
    } catch (err) {
      console.error(err);
      showToast("Could not mark brand as deleted.", "error");
    }
  };

  const handleRestoreBrand = async (id) => {
    try {
      await restoreBrand(apiHost, id);
      showToast("Brand mapping successfully restored", "success");
      fetchActiveMetadata();
    } catch (err) {
      console.error(err);
      showToast("Could not reinstate deleted brand.", "error");
    }
  };

  // ━━━━━━━━━━━━━━━━━ LIVE PRODUCT ACTIONS ━━━━━━━━━━━━━━━━━
  const handleProductDelete = async (id) => {
    try {
      await deleteProduct(apiHost, id);
      showToast("Commodity soft-deleted successfully", "success");
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Could not complete product deletion.", "error");
    }
  };

  const handleProductRestore = async (id) => {
    try {
      await restoreProduct(apiHost, id);
      showToast("Commodity restored to active listings", "success");
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Restoration protocol hit database error.", "error");
    }
  };

  // ━━━━━━━━━━━━━━━━━ SEARCH FILTER ENGINE ━━━━━━━━━━━━━━━━━
  const filteredProducts = productsList.filter((p) => {
    const productName = (p.productName || "").toLowerCase();
    const category = (p.category || "").toLowerCase();
    const brand = (p.brand || "").toLowerCase();
    const search = searchQuery.toLowerCase();

    return productName.includes(search) || category.includes(search) || brand.includes(search);
  });

  const filteredCategories = categoriesList.filter((c) => {
    return (c.name || "").toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredBrands = brandsList.filter((b) => {
    const search = searchQuery.toLowerCase();
    return (b.name || "").toLowerCase().includes(search) || (b.categoryName && b.categoryName.toLowerCase().includes(search));
  });

  return (
    <div className={`flex-1 p-4 md:p-8 min-h-screen transition-colors duration-300 ${
      isDark ? "dark bg-[#0b1120] text-slate-100" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* Premium Multi-state Native Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "success" })}
        />
      )}

      {/* Corporate Hero Segment */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-8 -translate-y-8 pointer-events-none">
          <Package size={260} />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs bg-white/20 px-3 py-1 rounded-full w-fit font-black tracking-wider uppercase mb-3 text-sky-100">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
              </span>
              Villgo Enterprise Console
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">
              Product & Category Hub
            </h1>
            <p className="text-sky-100 text-xs md:text-sm mt-1 max-w-xl">
              Organize bulk commodities, link retail categories, and track B2B brand relationships in premium realtime dashboard.
            </p>

            {/* Live Synchronized Count Metrics */}
            <div className="flex flex-wrap gap-2.5 mt-5">
              <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-all px-4 py-2 rounded-2xl text-xs font-bold border border-white/5">
                <Package size={14} className="text-sky-200" />
                <span>Products: <strong className="text-white">{productsList.length}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-all px-4 py-2 rounded-2xl text-xs font-bold border border-white/5">
                <Layers size={14} className="text-sky-200" />
                <span>Categories: <strong className="text-white">{categoriesList.length}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-all px-4 py-2 rounded-2xl text-xs font-bold border border-white/5">
                <Tag size={14} className="text-sky-200" />
                <span>Brands: <strong className="text-white">{brandsList.length}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex self-stretch lg:self-auto justify-end gap-3 shrink-0">
            <button
              onClick={() => {
                if (activeTab === "products") navigate("/admin/products/add");
                else if (activeTab === "categories") setCategoryModal({ open: true, isEdit: false, id: null, name: "", image: null });
                else if (activeTab === "brands") setBrandModal({ open: true, isEdit: false, id: null, name: "", categoryId: categoriesList[0]?.id || "", image: null });
              }}
              className="w-full sm:w-auto px-6 py-4 bg-white text-slate-900 hover:bg-sky-50 active:scale-95 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-2.5 transition duration-150"
            >
              <Plus size={18} className="text-sky-600 stroke-[3]" />
              Add {activeTab === "products" ? "Product" : activeTab === "categories" ? "Category" : "Brand"}
            </button>
          </div>
        </div>
      </div>

      {/* Master Tabbed Layout Configuration */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-5 py-3.5 text-sm font-black border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "products"
              ? "border-sky-500 text-sky-500 dark:text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          }`}
        >
          <Package size={16} />
          Products Catalog
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`px-5 py-3.5 text-sm font-black border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "categories"
              ? "border-sky-500 text-sky-500 dark:text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          }`}
        >
          <Layers size={16} />
          Category Master
        </button>

        <button
          onClick={() => setActiveTab("brands")}
          className={`px-5 py-3.5 text-sm font-black border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "brands"
              ? "border-sky-500 text-sky-500 dark:text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          }`}
        >
          <Tag size={16} />
          Brands Directory
        </button>
      </div>

      {/* Search & Dynamic Status Selector Grid */}
      <div className={`border p-4 mb-6 rounded-2xl shadow-sm transition-all duration-300 ${
        isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/60"
      }`}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Real-time server filter */}
          <div className="relative w-full md:flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder={`Search in live ${activeTab} registry...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:ring-sky-500/20"
                  : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-sky-500/20"
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto self-stretch">
            {/* Soft Deleted Toggle State Selector */}
            <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 w-full sm:w-auto">
              <button
                onClick={() => setStatusFilter("active")}
                className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                  statusFilter === "active"
                    ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <CheckCircle size={12} />
                Active Listings
              </button>
              <button
                onClick={() => setStatusFilter("deleted")}
                className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                  statusFilter === "deleted"
                    ? "bg-white dark:bg-slate-800 text-rose-500 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <AlertTriangle size={12} />
                Trash Bin
              </button>
            </div>

            {/* Manual Database Sync trigger */}
            <button
              onClick={handleRefreshAll}
              disabled={loading}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
              title="Refresh Databases"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : "hover:rotate-180 transition-transform duration-300"} />
            </button>
          </div>

        </div>
      </div>

      {/* High Fidelity Loading Skeletons */}
      {loading && (
        <div className="space-y-3">
          <div className="h-12 bg-slate-300/20 dark:bg-slate-800/50 animate-pulse rounded-xl w-full" />
          <div className="h-20 bg-slate-300/20 dark:bg-slate-800/50 animate-pulse rounded-xl w-full" />
          <div className="h-20 bg-slate-300/20 dark:bg-slate-800/50 animate-pulse rounded-xl w-full" />
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━ TAB 1: COMMODITIES BAZAAR CATALOG ━━━━━━━━━━━━━━━━━ */}
      {!loading && activeTab === "products" && (
        <div className="space-y-4">
          
          {/* Card Engine for Mobile Displays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className={`border p-5 rounded-2xl shadow-sm flex flex-col justify-between transition-all ${
                  isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/80"
                } ${p.deleted ? "opacity-60" : ""}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg">
                      #{p.id}
                    </span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      {p.brand}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm line-clamp-2">
                    {p.productName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Category: <strong className="text-slate-500 dark:text-slate-300">{p.category}</strong></p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Wholesale Rate</p>
                    <p className="font-black text-emerald-500 text-lg">₹{p.price}</p>
                  </div>
                  <div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      p.stock > 10
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : p.stock > 0
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}>
                      {p.stock === 0 ? "Out of Stock" : `${p.stock} Units`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 mt-4 pt-3">
                  {!p.deleted ? (
                    <>
                      <button
                        onClick={() => onEdit(p)}
                        className={`flex-1 p-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold ${
                          isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                        }`}
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleProductDelete(p.id)}
                        className="p-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-xl transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleProductRestore(p.id)}
                      className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-bold ${
                        isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      <RotateCcw size={14} />
                      Restore Product
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Matrix Layout */}
          <div className={`hidden lg:block rounded-3xl border overflow-hidden ${
            isDark ? "bg-[#111b30] border-slate-800/80" : "bg-white border-slate-200/80"
          }`}>
            <table className="w-full text-left border-collapse">
              <thead className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? "bg-slate-800/40 text-slate-400" : "bg-slate-50 text-slate-500"
              }`}>
                <tr>
                  <th className="px-6 py-4.5">Product Title</th>
                  <th className="px-6 py-4.5">Category</th>
                  <th className="px-6 py-4.5">Brand</th>
                  <th className="px-6 py-4.5">Wholesale Price</th>
                  <th className="px-6 py-4.5">Inventory Status</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
                {filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className={`transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
                      p.deleted ? "opacity-55" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sky-500 border ${
                          isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
                        }`}>
                          {p.productName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100">{p.productName}</p>
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">ID: #{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
                      {p.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs px-2.5 py-1 rounded-lg font-bold border border-sky-500/10">
                        {p.brand}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-500 text-base">
                      ₹{p.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        p.stock > 10
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : p.stock > 0
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                      }`}>
                        {p.stock === 0 ? "Out of Stock" : `${p.stock} Units Available`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2.5">
                        {!p.deleted ? (
                          <>
                            <button
                              onClick={() => onEdit(p)}
                              className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                                isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                              }`}
                              title="Edit specs"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleProductDelete(p.id)}
                              className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                                isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                              }`}
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleProductRestore(p.id)}
                            className={`px-3 py-1.5 rounded-xl transition-all active:scale-95 text-xs font-bold flex items-center gap-1 ${
                              isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            }`}
                          >
                            <RotateCcw size={14} />
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <FolderOpen size={48} className="mx-auto text-slate-400 mb-2.5" />
              <p className="text-slate-400 font-bold">No product matches in active directory.</p>
            </div>
          )}

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━ TAB 2: CATEGORY MASTER DIRECTORY ━━━━━━━━━━━━━━━━━ */}
      {!loading && activeTab === "categories" && (
        <div className="space-y-4">
          
          {/* Card Based view for categories (Mobile view responsive) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
            {filteredCategories.map((c) => (
              <div
                key={c.id}
                className={`border p-4 rounded-2xl flex flex-col justify-between transition ${
                  isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/80"
                } ${c.deleted ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sky-500 border ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
                  }`}>
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{c.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">ID: #{c.id}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4 pt-3.5">
                  <button
                    onClick={() => handleToggleCategoryStatus(c.id, c.action)}
                    className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 transition-all ${
                      c.action
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${c.action ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {c.action ? "Active" : "Inactive"}
                  </button>

                  <div className="flex gap-1.5">
                    {!c.deleted ? (
                      <>
                        <button
                          onClick={() => setCategoryModal({ open: true, isEdit: true, id: c.id, name: c.name, image: null })}
                          className={`p-2 rounded-xl transition ${
                            isDark ? "bg-sky-500/10 text-sky-400" : "bg-sky-50 text-sky-600"
                          }`}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(c.id)}
                          className="p-2 bg-rose-500/10 text-rose-500 rounded-xl"
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleRestoreCategory(c.id)}
                        className={`p-2 rounded-xl transition text-xs font-bold flex items-center gap-1 ${
                          isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <RotateCcw size={13} />
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Category Matrix */}
          <div className={`hidden lg:block rounded-3xl border overflow-hidden ${
            isDark ? "bg-[#111b30] border-slate-800/80" : "bg-white border-slate-200/80"
          }`}>
            <table className="w-full text-left border-collapse">
              <thead className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? "bg-slate-800/40 text-slate-400" : "bg-slate-50 text-slate-500"
              }`}>
                <tr>
                  <th className="px-6 py-4.5">ID</th>
                  <th className="px-6 py-4.5">Category Title</th>
                  <th className="px-6 py-4.5">Status</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
                {filteredCategories.map((c) => (
                  <tr
                    key={c.id}
                    className={`transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
                      c.deleted ? "opacity-55" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-mono text-slate-400">#{c.id}</td>
                    <td className="px-6 py-4 font-bold flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sky-500 text-xs border ${
                        isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
                      }`}>
                        {c.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-slate-800 dark:text-slate-100 font-extrabold">{c.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleCategoryStatus(c.id, c.action)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                          c.action
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        }`}
                        title="Toggle availability status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${c.action ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {c.action ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2.5">
                        {!c.deleted ? (
                          <>
                            <button
                              onClick={() => setCategoryModal({ open: true, isEdit: true, id: c.id, name: c.name, image: null })}
                              className={`p-2.5 rounded-xl transition ${
                                isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                              }`}
                              title="Edit Segment"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(c.id)}
                              className={`p-2.5 rounded-xl transition ${
                                isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                              }`}
                              title="Soft Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRestoreCategory(c.id)}
                            className={`px-3 py-1.5 rounded-xl transition text-xs font-black flex items-center gap-1 ${
                              isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            }`}
                          >
                            <RotateCcw size={14} />
                            Restore Category
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <Layers size={48} className="mx-auto text-slate-400 mb-2.5" />
              <p className="text-slate-400 font-bold">No registered category mapping data found.</p>
            </div>
          )}

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━ TAB 3: BRANDS DIRECTORY HUB ━━━━━━━━━━━━━━━━━ */}
      {!loading && activeTab === "brands" && (
        <div className="space-y-4">
          
          {/* Card View for Brands in Mobile View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
            {filteredBrands.map((b) => (
              <div
                key={b.id}
                className={`border p-4 rounded-2xl flex flex-col justify-between transition ${
                  isDark ? "bg-[#111b30] border-slate-800" : "bg-white border-slate-200/80"
                } ${b.isDeleted ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-indigo-500 border ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
                  }`}>
                    {b.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{b.name}</p>
                    <p className="text-xs text-slate-400">Parent Category: <strong className="text-slate-500 dark:text-slate-300">{b.categoryName}</strong></p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4 pt-3.5">
                  <button
                    onClick={() => handleToggleBrandStatus(b.id, b.action)}
                    className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 transition-all ${
                      b.action
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${b.action ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {b.action ? "Live" : "Hold"}
                  </button>

                  <div className="flex gap-1.5">
                    {!b.isDeleted ? (
                      <>
                        <button
                          onClick={() => setBrandModal({ open: true, isEdit: true, id: b.id, name: b.name, categoryId: b.categoryId || "", image: null })}
                          className={`p-2 rounded-xl transition ${
                            isDark ? "bg-sky-500/10 text-sky-400" : "bg-sky-50 text-sky-600"
                          }`}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(b.id)}
                          className="p-2 bg-rose-500/10 text-rose-500 rounded-xl"
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleRestoreBrand(b.id)}
                        className={`p-2 rounded-xl transition text-xs font-bold flex items-center gap-1 ${
                          isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <RotateCcw size={13} />
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Brand Table Matrix */}
          <div className={`hidden lg:block rounded-3xl border overflow-hidden ${
            isDark ? "bg-[#111b30] border-slate-800/80" : "bg-white border-slate-200/80"
          }`}>
            <table className="w-full text-left border-collapse">
              <thead className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? "bg-slate-800/40 text-slate-400" : "bg-slate-50 text-slate-500"
              }`}>
                <tr>
                  <th className="px-6 py-4.5">Brand Identity ID</th>
                  <th className="px-6 py-4.5">Brand Label</th>
                  <th className="px-6 py-4.5">Associated Category Map</th>
                  <th className="px-6 py-4.5">Hub Status</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y text-sm ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
                {filteredBrands.map((b) => (
                  <tr
                    key={b.id}
                    className={`transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
                      b.isDeleted ? "opacity-55" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-mono text-slate-400">#{b.id}</td>
                    <td className="px-6 py-4 font-bold flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-indigo-500 text-xs border ${
                        isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
                      }`}>
                        {b.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-slate-800 dark:text-slate-100 font-extrabold">{b.name}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-bold">
                      {b.categoryName || "Unassigned"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleBrandStatus(b.id, b.action)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                          b.action
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        }`}
                        title="Switch active state"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${b.action ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {b.action ? "Live on Villgo" : "Hold"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2.5">
                        {!b.isDeleted ? (
                          <>
                            <button
                              onClick={() => setBrandModal({ open: true, isEdit: true, id: b.id, name: b.name, categoryId: b.categoryId || "", image: null })}
                              className={`p-2.5 rounded-xl transition ${
                                isDark ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/25" : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                              }`}
                              title="Edit Brand Map"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteBrand(b.id)}
                              className={`p-2.5 rounded-xl transition ${
                                isDark ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/25" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                              }`}
                              title="Soft delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRestoreBrand(b.id)}
                            className={`px-3 py-1.5 rounded-xl transition text-xs font-black flex items-center gap-1 ${
                              isDark ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25" : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            <RotateCcw size={14} />
                            Restore Brand
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBrands.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <Tag size={48} className="mx-auto text-slate-400 mb-2.5" />
              <p className="text-slate-400 font-bold">No brand database metrics mapped.</p>
            </div>
          )}

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━ CATEGORY MODAL DIALOG ━━━━━━━━━━━━━━━━━ */}
      {categoryModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative transition-all duration-300 transform scale-100 animate-in fade-in-50 duration-200 ${
            isDark ? "bg-[#111b30] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            
            <button
              onClick={() => { setCategoryModal({ open: false, isEdit: false, id: null, name: "", image: null }); setImagePreview(null); }}
              className={`absolute top-4 right-4 p-2 rounded-xl transition ${
                isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-sky-500 dark:text-sky-400">
              <Layers size={22} className="stroke-[2.5]" />
              {categoryModal.isEdit ? "Modify Commodity Segment" : "Map New Category"}
            </h3>

            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
                  Category Identifier Name
                </label>
                <input
                  type="text"
                  required
                  value={categoryModal.name}
                  onChange={(e) => setCategoryModal({ ...categoryModal, name: e.target.value })}
                  placeholder="e.g. Rice & Grains, Essential Oils"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? "bg-slate-900 border-slate-800 text-white focus:ring-sky-500/20"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
                  Graphic Emblem/Banner (Optional)
                </label>
                {!imagePreview ? (
                  <label className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDark ? "border-slate-800 bg-slate-900 hover:bg-slate-900/55" : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
                  }`}>
                    <UploadCloud size={32} className="text-sky-500 mb-1.5" />
                    <span className="text-xs font-black">Browse image from explorer</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 2MB</span>
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setCategoryModal)}
                    />
                  </label>
                ) : (
                  <div className={`flex items-center justify-between border p-3 rounded-2xl ${
                    isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-xl shadow border border-slate-300 dark:border-slate-800" />
                      <div>
                        <p className="text-xs font-black">Emblem loaded</p>
                        <p className="text-[10px] text-slate-400">Ready for dispatch upload</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); setImagePreview(null); setCategoryModal(prev => ({ ...prev, image: null })); }}
                      className="p-2 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:scale-95 transition"
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
                  className={`px-4 py-2.5 text-xs font-black rounded-xl transition ${
                    isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-750 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  {loading && <RefreshCw size={12} className="animate-spin" />}
                  {categoryModal.isEdit ? "Update Segment" : "Validate Segment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━ BRAND MODAL DIALOG ━━━━━━━━━━━━━━━━━ */}
      {brandModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative transition-all duration-300 transform scale-100 animate-in fade-in-50 duration-200 ${
            isDark ? "bg-[#111b30] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            
            <button
              onClick={() => { setBrandModal({ open: false, isEdit: false, id: null, name: "", categoryId: "", image: null }); setImagePreview(null); }}
              className={`absolute top-4 right-4 p-2 rounded-xl transition ${
                isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-sky-500 dark:text-sky-400">
              <Tag size={22} className="stroke-[2.5]" />
              {brandModal.isEdit ? "Update Wholesaler Brand Mapping" : "Register Brand Entity"}
            </h3>

            <form onSubmit={handleBrandSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
                  Brand Commercial Label Name
                </label>
                <input
                  type="text"
                  required
                  value={brandModal.name}
                  onChange={(e) => setBrandModal({ ...brandModal, name: e.target.value })}
                  placeholder="e.g. Fortune, Aashirvaad, TATA"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? "bg-slate-900 border-slate-800 text-white focus:ring-sky-500/20"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
                  Select Parent Hub Category
                </label>
                <select
                  required
                  value={brandModal.categoryId}
                  onChange={(e) => setBrandModal({ ...brandModal, categoryId: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 cursor-pointer transition-all ${
                    isDark
                      ? "bg-slate-900 border-slate-800 text-white focus:ring-sky-500/20"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500/20"
                  }`}
                >
                  <option value="">Choose category block...</option>
                  {categoriesList.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-xs block mb-1.5 text-slate-400 uppercase tracking-wider">
                  Official Brand Trademark Emblem
                </label>
                {!imagePreview ? (
                  <label className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDark ? "border-slate-800 bg-slate-900 hover:bg-slate-900/55" : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
                  }`}>
                    <UploadCloud size={32} className="text-sky-500 mb-1.5" />
                    <span className="text-xs font-black">Browse files</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 2MB</span>
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setBrandModal)}
                    />
                  </label>
                ) : (
                  <div className={`flex items-center justify-between border p-3 rounded-2xl ${
                    isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-xl shadow border border-slate-300 dark:border-slate-800" />
                      <div>
                        <p className="text-xs font-black">Emblem loaded</p>
                        <p className="text-[10px] text-slate-400">Ready to save</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); setImagePreview(null); setBrandModal(prev => ({ ...prev, image: null })); }}
                      className="p-2 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:scale-95 transition"
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
                  className={`px-4 py-2.5 text-xs font-black rounded-xl transition ${
                    isDark ? "bg-slate-900 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-750 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  {loading && <RefreshCw size={12} className="animate-spin" />}
                  {brandModal.isEdit ? "Update Trademark" : "Register Trademark"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}