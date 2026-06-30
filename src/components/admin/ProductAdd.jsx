// import React, { useState } from "react";
// import { ArrowLeft, Save, UploadCloud } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";

// export default function ProductAdd({ onSubmit }) {
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     quantity: "",
//     categoryId: "",
//     brandId: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setProduct({
//       ...product,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     Object.keys(product).forEach((key) => {
//       formData.append(key, product[key]);
//     });

//     onSubmit(formData);
//   };

//   return (

    

//     <div className="p-6">

//       {/* Hero */}
//       <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-6">

//         <div className="flex justify-between items-center">

//           <div>
//             <h1 className="text-3xl font-black">
//               Add New Product
//             </h1>

//             <p className="text-sky-100 mt-2">
//               Publish products to VillGo marketplace
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/admin")}
//             className="bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl flex items-center gap-2"
//           >
//             <ArrowLeft size={18} />
//             Go Back
//           </button>

//         </div>

//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-3xl shadow-lg p-8 space-y-5"
//       >

//         <div>
//           <label className="font-bold text-sm">
//             Product Name
//           </label>

//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="w-full mt-2 border rounded-xl px-4 py-3"
//             placeholder="Premium Basmati Rice"
//           />
//         </div>

//         <div>
//           <label className="font-bold text-sm">
//             Description
//           </label>

//           <textarea
//             rows="4"
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="w-full mt-2 border rounded-xl px-4 py-3"
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-5">

//           <div>
//             <label className="font-bold text-sm">
//               Price
//             </label>

//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               className="w-full mt-2 border rounded-xl px-4 py-3"
//             />
//           </div>

//           <div>
//             <label className="font-bold text-sm">
//               Quantity
//             </label>

//             <input
//               type="number"
//               name="quantity"
//               value={product.quantity}
//               onChange={handleChange}
//               className="w-full mt-2 border rounded-xl px-4 py-3"
//             />
//           </div>

//         </div>

//         {/* Category */}
//         <div>
//           <label className="font-bold text-sm">
//             Category
//           </label>

//           <select
//             name="categoryId"
//             value={product.categoryId}
//             onChange={handleChange}
//             className="w-full mt-2 border rounded-xl px-4 py-3"
//           >
//             <option value="">Select Category</option>
//             <option value="1">Rice</option>
//             <option value="2">Oil</option>
//             <option value="3">Spices</option>
//           </select>
//         </div>

//         {/* Brand */}
//         <div>
//           <label className="font-bold text-sm">
//             Brand
//           </label>

//           <select
//             name="brandId"
//             value={product.brandId}
//             onChange={handleChange}
//             className="w-full mt-2 border rounded-xl px-4 py-3"
//           >
//             <option value="">Select Brand</option>
//             <option value="1">Fortune</option>
//             <option value="2">Aashirvaad</option>
//             <option value="3">Ambika</option>
//           </select>
//         </div>

//         {/* Image Upload */}
//         <div>

//           <label className="font-bold text-sm">
//             Product Image
//           </label>

//           <label className="mt-2 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:bg-slate-50">

//             <UploadCloud size={40} />

//             <span className="mt-2 text-sm">
//               Click to Upload Product Image
//             </span>

//             <input
//               hidden
//               type="file"
//               name="image"
//               onChange={handleChange}
//             />

//           </label>

//         </div>

//         <button
//           type="submit"
//           className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
//         >
//           <Save size={18} />
//           Save Product
//         </button>

//       </form>

//     </div>
//   );
// }
import React, { useState } from "react";
import { ArrowLeft, Save, UploadCloud, X, Package, Layers, Tag, DollarSign, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

import { addProduct } from "../../api/productApi";

export default function ProductAdd({ onSubmit }) {
  const navigate = useNavigate();
const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success",
});
  // ૧. સાઇડબાર અને થીમ કંટ્રોલ સ્ટેટ્સ
  const [activeTab, setActiveTab] = useState("products");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // ૨. API કોલ અને લોડિંગ સ્ટેટ 
  const [loading, setLoading] = useState(false);

  // ૩. પ્રોડક્ટ ફોર્મ ડેટા સ્ટેટ
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    brandId: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const themeClasses = {
    sidebar: "bg-slate-900 text-slate-100 dark:bg-[#0f172a]",
    border: "border-slate-800 dark:border-slate-800/60",
    sidebarActive: "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20",
    sidebarHover: "hover:bg-slate-800 hover:text-white",
    textMuted: "text-slate-400"
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setProduct({ ...product, image: null });
    setImagePreview(null);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await addProduct(formData);

    setToast({
      show: true,
      message: "Product added successfully.",
      type: "success",
    });

  navigate("/admin/products", {
    replace: true
}); 

    setTimeout(() => {
      navigate("/admin/products");
    }, 1200);

  }catch (error) {
  console.log(error.response);
  console.log(error.response?.data);

  setToast({
    show: true,
    message: error.response?.data?.message || "Failed to add product",
    type: "error",
  });
} finally {
    setLoading(false);
  }
};

  // // ⚡ લોડિંગ અને API કોલ હેન્ડલર
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // લોડિંગ સ્પિનર ચાલુ કરો
  //   setLoading(true);

  //   const formData = new FormData();
  //   Object.keys(product).forEach((key) => {
  //     formData.append(key, product[key]);
  //   });

  //   try {
  //     // જો પેરન્ટ તરફથી onSubmit પ્રોપ પાસ થઈ હોય તો તેના રિસ્પોન્સની રાહ જુઓ (Async await)
  //     if (onSubmit) {
  //       await onSubmit(formData);
  //     } else {
  //       // જો તમે લોકલ ટેસ્ટિંગ કરતા હોવ તો ૨ સેકન્ડનો ફેક નેટવર્ક ડીલે જોવા માટે:
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //       console.log("Product Form Data Sent Successfully!");
  //     }
      
  //     // સક્સેસ થયા પછી પાછા એડમિન ડેશબોર્ડ પેજ પર લઈ જાઓ
  //     navigate("/admin/produts");
  //   } catch (error) {
  //     console.error("API Call failed:", error);
  //     alert("પ્રોડક્ટ સેવ કરવામાં એરર આવી છે!");
  //   } finally {
  //     // પ્રોસેસ પુરી થાય એટલે લોડિંગ બંધ કરી દો
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b1120]">
      {/* એડમિન સાઇડબાર કમ્પોનન્ટ */}
      {/* <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        setTheme={setTheme}
        themeClasses={themeClasses}
        pendingWholesalers={2}
        pendingOrders={5}
        unresolvedComplaints={1}
        onLogout={() => navigate("/login")}
      /> */}

      {/* મેઈન કન્ટેન્ટ બોડી */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* હેડર બેનર */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-6 pointer-events-none">
            <Package size={200} />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Marketplace Control
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-2 tracking-tight">
                Add New Product
              </h1>
              <p className="text-sky-100 text-sm mt-1">
                Publish products directly to VillGo B2B retail marketplace
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/products")}
              disabled={loading} // લોડિંગ વખતે પાછળ જવાનું બટન ડિસેબલ રાખો
              className="bg-white text-slate-900 hover:bg-sky-50 disabled:opacity-50 px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all active:scale-95 shrink-0"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </div>

        {/* ફોર્મ કન્ટેનર */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Info size={18} className="text-sky-500" />
                Product Information
              </h2>
            </div>

            {/* ઇનપુટ ૧: પ્રોડક્ટ નામ */}
            <div>
              <label className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Package size={14} className="text-slate-400" /> Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                disabled={loading}
                value={product.name}
                onChange={handleChange}
                className="w-full mt-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                placeholder="Premium Basmati Rice"
              />
            </div>

            {/* ઇનપુટ ૨: ડિસ્ક્રિપ્શન */}
            <div>
              <label className="font-bold text-sm text-slate-700 dark:text-slate-300 block">
                Description
              </label>
              <textarea
                rows="3"
                name="description"
                disabled={loading}
                value={product.description}
                onChange={handleChange}
                className="w-full mt-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                placeholder="Enter packaging size, grade and context details..."
              />
            </div>

            {/* પ્રાઇસ અને સ્ટોક ક્વોન્ટિટી રો */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-slate-400" /> Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  disabled={loading}
                  value={product.price}
                  onChange={handleChange}
                  className="w-full mt-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="font-bold text-sm text-slate-700 dark:text-slate-300 block">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="0"
                  disabled={loading}
                  value={product.quantity}
                  onChange={handleChange}
                  className="w-full mt-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                  placeholder="100"
                />
              </div>
            </div>

            {/* કેટેગરી અને બ્રાન્ડ */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers size={14} className="text-slate-400" /> Category
                </label>
                <select
                  name="categoryId"
                  required
                  disabled={loading}
                  value={product.categoryId}
                  onChange={handleChange}
                  className="w-full mt-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="1">Rice & Grains</option>
                  <option value="2">Edible Oils</option>
                  <option value="3">Pure Spices</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Tag size={14} className="text-slate-400" /> Brand
                </label>
                <select
                  name="brandId"
                  required
                  disabled={loading}
                  value={product.brandId}
                  onChange={handleChange}
                  className="w-full mt-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:bg-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm cursor-pointer"
                >
                  <option value="">Select Brand</option>
                  <option value="1">Fortune</option>
                  <option value="2">Aashirvaad</option>
                  <option value="3">Ambika</option>
                </select>
              </div>
            </div>

            {/* ઇમેજ અપલોડ કંટ્રોલ */}
            <div>
              <label className="font-bold text-sm text-slate-700 dark:text-slate-300 block mb-2">
                Product Image
              </label>

              {!imagePreview ? (
                <label className={`border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"} transition-all`}>
                  <div className="p-3 bg-sky-50 dark:bg-sky-500/10 rounded-xl text-sky-500 mb-2">
                    <UploadCloud size={28} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Click to Upload Product Image
                  </span>
                  <input
                    hidden
                    type="file"
                    name="image"
                    accept="image/*"
                    disabled={loading}
                    onChange={handleChange}
                  />
                </label>
              ) : (
                <div className="relative border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800 flex items-center justify-between max-w-md">
                  <div className="flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl shadow-md border"
                    />
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate max-w-[180px]">
                        {product.image?.name || "Product Image"}
                      </p>
                      <p className="text-xs text-emerald-500 font-semibold mt-0.5">
                        Ready to upload
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={removeImage}
                    disabled={loading}
                    className="p-2 bg-rose-50 hover:bg-rose-100 disabled:opacity-50 text-rose-500 rounded-xl transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* 🏁 લાઈવ સ્પિનર વાળું સબમિટ બટન */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading} // સબમિશન ચાલુ હોય ત્યારે બટન લોક થઈ જશે
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white py-3.5 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    {/* સુંદર ગોળ ફરતું Tailwind Spinner આઇકોન */}
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving Product to Villgo...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Publish Product to Marketplace</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}