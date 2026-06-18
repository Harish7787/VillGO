// import React, { useState, useEffect } from 'react';

// // ============================================================================
// // SELF-CONTAINED INLINE SVG ICONS (Removes relative import dependencies)
// // ============================================================================
// const Icons = {
//   Cart: () => (
//     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
//   ),
//   Plus: () => (
//     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//     </svg>
//   ),
//   Minus: () => (
//     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
//     </svg>
//   ),
//   Check: () => (
//     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//     </svg>
//   )
// };

// // ============================================================================
// // FLIPKART STYLE PRODUCT CARD SUB-COMPONENT (100% Standalone & Error-Free)
// // ============================================================================
// export const RetailerProductCard = ({
//   product,
//   cartItem,
//   themeClasses = {},
//   toggleWishlist,
//   isWishlisted,
//   setQuickViewProduct,
//   handleAddToCart,
//   setActivePage
// }) => {
//   // Safe state hook execution
//   const [qty, setQty] = useState(1);

//   // Unconditional sync for MOQ values
//   useEffect(() => {
//     if (product?.moq) {
//       setQty(product.moq);
//     }
//   }, [product]);

//   // Safe early exit guard clause if product object is completely missing
//   if (!product) {
//     return null;
//   }

//   return (
//     <div className={`rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between p-4 relative ${themeClasses?.card || ''}`}>
      
//       {/* Wishlist Heart Icon */}
//       <button 
//         onClick={() => toggleWishlist && toggleWishlist(product.id)}
//         className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-850/80 rounded-full text-red-500 hover:scale-110 transition-transform focus:outline-none z-10 shadow-xs"
//       >
//         <svg className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       </button>

//       {/* Top Emoji Illustration Container */}
//       <div 
//         className="bg-slate-100 dark:bg-slate-950 h-40 rounded-lg flex items-center justify-center text-4xl mb-4 relative cursor-pointer"
//         onClick={() => setQuickViewProduct && setQuickViewProduct(product)}
//       >
//         <span>{product?.img || '📦'}</span>
//         <span className="absolute bottom-2.5 left-2.5 text-[9px] bg-sky-500 text-white font-extrabold px-1.5 py-0.5 rounded-sm">Quick View</span>
//       </div>

//       {/* Specs Information */}
//       <div className="space-y-1">
//         <p className="text-[10px] font-black uppercase text-slate-400">{product?.category || 'General'}</p>
//         <h4 
//           className="text-sm font-black text-slate-800 dark:text-white hover:text-sky-500 cursor-pointer truncate"
//           onClick={() => setQuickViewProduct && setQuickViewProduct(product)}
//         >
//           {product?.name || 'Unnamed Product'}
//         </h4>
//         <p className="text-[11px] font-bold text-slate-400">Seller: {product?.wholesaler || 'Unknown Seller'}</p>
        
//         {/* Rating stars */}
//         <div className="flex items-center gap-1">
//           <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
//             {product?.rating || 0} ★
//           </span>
//           <span className="text-[10px] text-slate-400 font-bold">({product?.reviews || 0} reviews)</span>
//         </div>

//         {/* Price Blocks */}
//         <div className="flex items-baseline gap-2 pt-1.5">
//           <span className="text-lg font-black text-slate-800 dark:text-white">₹{product?.price || 0}</span>
//           <span className="text-xs text-slate-400 line-through">₹{product?.originalPrice || 0}</span>
//           {product?.originalPrice && product?.price ? (
//             <span className="text-xs text-emerald-500 font-black">
//               {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
//             </span>
//           ) : null}
//         </div>

//         <div className="text-[10.5px] font-extrabold text-red-500 pt-1">
//           MOQ: {product?.moq || 1} {product?.unit || 'unit'}s required
//         </div>
//       </div>

//       {/* Order Trigger Buttons */}
//       <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-850">
//         {cartItem ? (
//           <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-center text-xs font-black text-emerald-500 flex items-center justify-center gap-2">
//             <Icons.Check />
//             <span>Cart ma Add chhe ({cartItem?.qty || 0})</span>
//           </div>
//         ) : (
//           <div className="space-y-2.5">
//             {/* Direct selector prior to adding */}
//             <div className="flex items-center justify-between text-xs font-bold">
//               <span className="text-slate-400">Jatho:</span>
//               <div className="flex items-center bg-slate-100 dark:bg-slate-850 rounded-lg p-1 border dark:border-slate-700">
//                 <button
//                   onClick={() => setQty(Math.max(product?.moq || 1, qty - 1))}
//                   className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
//                 >
//                   <Icons.Minus />
//                 </button>
//                 <span className="px-2 font-black text-slate-800 dark:text-white min-w-[28px] text-center">{qty}</span>
//                 <button
//                   onClick={() => setQty(qty + 1)}
//                   className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
//                 >
//                   <Icons.Plus />
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-2">
//               <button 
//                 onClick={() => handleAddToCart && handleAddToCart(product, qty)}
//                 className="py-2.5 bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-black text-xs rounded-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none"
//               >
//                 <Icons.Cart />
//                 <span>Cart</span>
//               </button>
//               <button 
//                 onClick={() => { 
//                   handleAddToCart && handleAddToCart(product, qty); 
//                   setActivePage && setActivePage('cart'); 
//                 }}
//                 className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-sm transition-all focus:outline-none"
//               >
//                 ⚡ Buy Now
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from './RetailerIcons.jsx';

export const RetailerProductCard = ({
  product,
  cartItem,
  themeClasses = {},
  toggleWishlist,
  isWishlisted,
  setQuickViewProduct,
  handleAddToCart,
  setActivePage
}) => {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product?.moq) {
      setQty(product.moq);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between p-4 relative ${themeClasses?.card || ''}`}>
      
      {/* Wishlist Heart Icon */}
      <button 
        onClick={() => toggleWishlist && toggleWishlist(product.id)}
        className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-850/80 rounded-full text-red-500 hover:scale-110 transition-transform focus:outline-none z-10 shadow-xs"
      >
        <svg className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Top Emoji Illustration Container */}
      <div 
        className="bg-slate-100 dark:bg-slate-950 h-40 rounded-lg flex items-center justify-center text-4xl mb-4 relative cursor-pointer"
        onClick={() => setQuickViewProduct && setQuickViewProduct(product)}
      >
        <span>{product?.img || '📦'}</span>
        <span className="absolute bottom-2.5 left-2.5 text-[9px] bg-sky-500 text-white font-extrabold px-1.5 py-0.5 rounded-sm">Quick View</span>
      </div>

      {/* Specs Information */}
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase text-slate-400">{product?.category || 'General'}</p>
        <h4 
          className="text-sm font-black text-slate-800 dark:text-white hover:text-sky-500 cursor-pointer truncate"
          onClick={() => setQuickViewProduct && setQuickViewProduct(product)}
        >
          {product?.name || 'Unnamed Product'}
        </h4>
        <p className="text-[11px] font-bold text-slate-400">Seller: {product?.wholesaler || 'Unknown Seller'}</p>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1">
          <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
            {product?.rating || 0} ★
          </span>
          <span className="text-[10px] text-slate-400 font-bold">({product?.reviews || 0} reviews)</span>
        </div>

        {/* Price Blocks */}
        <div className="flex items-baseline gap-2 pt-1.5">
          <span className="text-lg font-black text-slate-800 dark:text-white">₹{product?.price || 0}</span>
          <span className="text-xs text-slate-400 line-through">₹{product?.originalPrice || 0}</span>
          {product?.originalPrice && product?.price ? (
            <span className="text-xs text-emerald-500 font-black">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
            </span>
          ) : null}
        </div>

        <div className="text-[10.5px] font-extrabold text-red-500 pt-1">
          MOQ: {product?.moq || 1} {product?.unit || 'unit'}s required
        </div>
      </div>

      {/* Order Trigger Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-850">
        {cartItem ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-center text-xs font-black text-emerald-500 flex items-center justify-center gap-2">
            <Icons.Check />
            <span>Cart ma Add chhe ({cartItem?.qty || 0})</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Direct selector prior to adding */}
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">Jatho:</span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-850 rounded-lg p-1 border dark:border-slate-700">
                <button
                  onClick={() => setQty(Math.max(product?.moq || 1, qty - 1))}
                  className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
                >
                  <Icons.Minus />
                </button>
                <span className="px-2 font-black text-slate-800 dark:text-white min-w-[28px] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
                >
                  <Icons.Plus />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleAddToCart && handleAddToCart(product, qty)}
                className="py-2.5 bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-black text-xs rounded-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <Icons.Cart />
                <span>Cart</span>
              </button>
              <button 
                onClick={() => { 
                  handleAddToCart && handleAddToCart(product, qty); 
                  setActivePage && setActivePage('cart'); 
                }}
                className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-sm transition-all focus:outline-none"
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};