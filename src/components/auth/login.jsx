import React, { useState } from 'react';
import InputField from '../common/InputField';


const LoginForm = ({
  mobile,
  setMobile,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSubmit,
  onNavigate
}) => (
  <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden transition-all duration-300 transform hover:shadow-2xl">
    {/* Banner Section */}
    <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6 text-white text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4">
        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold tracking-wide">Welcome Back!</h2>
      <p className="text-sky-100 text-xs mt-1">Access India's digital supply and transport network</p>
    </div>

    {/* Form Section */}
    <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-5">
      <InputField
        label="Registered Mobile Number"
        type="tel"
        maxLength={10}
        placeholder="Enter 10-digit number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        }
      />

      <InputField
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isPassword={true}
        showPassword={showPassword}
        togglePassword={() => setShowPassword(!showPassword)}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      />

      <div className="text-right">
        <button
          type="button"
          onClick={() => onNavigate('forgot_password')}
          className="text-xs font-bold text-sky-600 hover:text-indigo-600 hover:underline transition-all"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-100 hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] text-sm tracking-wide"
      >
        Sign In Securely
      </button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-100"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-slate-400 font-bold tracking-wider">New to Villgo?</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('register')}
        className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-all text-sm block text-center"
      >
        Create Partner Account
      </button>

      {/* Demo helper info */}
      {/* <div className="mt-4 p-4 rounded-2xl bg-amber-50/75 border border-amber-100 text-xs text-amber-900/80 space-y-2">
        <div className="font-bold flex items-center gap-1.5 text-amber-900 text-[11px] uppercase tracking-wider">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Demo Logins for Testing:
        </div>
        <p>💡 <b>Retailer:</b> Mobile <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">9999999999</span> | Pass: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">123456</span></p>
        <p>💡 <b>Wholesaler:</b> Mobile <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">8888888888</span> | Pass: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">123456</span></p>
      </div> */}
    </form>
  </div>
);
export default LoginForm;


// export default login

// import React, { useState } from 'react';

// // --- CUSTOM TOAST NOTIFICATION SYSTEM ---
// // Aa component custom alerts/notifications બતાવવા માટે છે.
// const Toast = ({ message, type, onClose }) => {
//   React.useEffect(() => {
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800';
//   const iconColor = type === 'success' ? 'text-emerald-500' : 'text-rose-500';

//   return (
//     <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-xl border shadow-lg max-w-sm animate-bounce ${bgColor}`}>
//       <span className="mr-3">
//         {type === 'success' ? (
//           <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         ) : (
//           <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         )}
//       </span>
//       <p className="text-sm font-medium">{message}</p>
//       <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-600">
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//       </button>
//     </div>
//   );
// };

// // --- LOGO SVG COMPONENT ---
// // Villgo નું સુંદર ટ્રાન્સપોર્ટ આઇકોન વાળું લોગો
// const VillgoLogo = () => (
//   <div className="flex items-center gap-2">
//     <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md shadow-sky-100">
//       {/* Truck / Delivery Path SVG */}
//       <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4h3m4 3.05V13a1 1 0 00-.3-.7l-2.7-2.7a1 1 0 00-.7-.3H16v4.05m0 3.95h.01" />
//       </svg>
//       <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-400 border-2 border-white animate-ping"></span>
//     </div>
//     <div>
//       <span className="text-2xl font-black tracking-tight text-slate-800">Vill<span className="text-sky-500">go</span></span>
//       <p className="text-[10px] tracking-widest font-bold text-slate-400 uppercase">Logistics & Supply</p>
//     </div>
//   </div>
// );

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('login'); // 'login' | 'register' | 'forgot_password' | 'dashboard'
//   const [showPassword, setShowPassword] = useState(false);
//   const [toast, setToast] = useState(null);

//   // Form Fields State
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('retailer'); // 'retailer' | 'wholesaler' | 'transfer'
//   const [termsAccepted, setTermsAccepted] = useState(false);

//   // Demo user data to show successful flow
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   const showToastMsg = (message, type = 'success') => {
//     setToast({ message, type });
//   };

//   // --- LOGIN HANDLE PROCESS ---
//   const handleLoginSubmit = (e) => {
//     e.preventDefault();

//     if (!mobile || !password) {
//       showToastMsg('Please fill in all fields', 'error');
//       return;
//     }

//     if (mobile.length < 10) {
//       showToastMsg('Please enter a valid 10-digit mobile number', 'error');
//       return;
//     }

//     // Demo Accounts details for testing
//     // Wholesaler needs approval logic mock
//     if (mobile === '9999999999' && password === '123456') {
//       showToastMsg('Login successful! Welcome Back.', 'success');
//       setLoggedInUser({
//         name: 'Demo Retailer',
//         mobile: mobile,
//         role: 'retailer',
//         businessName: 'Harish Provision Store'
//       });
//       setCurrentPage('dashboard');
//     } else if (mobile === '8888888888' && password === '123456') {
//       showToastMsg('Login successful as Wholesaler', 'success');
//       setLoggedInUser({
//         name: 'Demo Wholesaler',
//         mobile: mobile,
//         role: 'wholesaler',
//         businessName: 'Vaistra Goods Wholesale',
//         isApproved: true
//       });
//       setCurrentPage('dashboard');
//     } else {
//       // Normal flow for newly registered accounts
//       showToastMsg('Success! Logged in with input details.', 'success');
//       setLoggedInUser({
//         name: name || 'Valued User',
//         mobile: mobile,
//         role: role,
//         businessName: role === 'retailer' ? 'Retail Shop' : role === 'wholesaler' ? 'Wholesale Depot' : 'Transport Hub'
//       });
//       setCurrentPage('dashboard');
//     }
//   };

//   // --- REGISTER HANDLE PROCESS ---
//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !mobile || !password) {
//       showToastMsg('Please fill in all fields', 'error');
//       return;
//     }

//     if (mobile.length < 10) {
//       showToastMsg('Mobile number must be 10 digits', 'error');
//       return;
//     }

//     if (!termsAccepted) {
//       showToastMsg('Please accept Terms & Conditions', 'error');
//       return;
//     }

//     // Checking if wholesaler - needs admin approval warning
//     if (role === 'wholesaler') {
//       showToastMsg('Registered! Pending Admin Approval as Wholesaler.', 'success');
//     } else {
//       showToastMsg('Registration successful!', 'success');
//     }

//     // Redirect to login with pre-filled values
//     setCurrentPage('login');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-sky-50/50 via-slate-50 to-indigo-50/30 flex flex-col justify-between font-sans text-slate-800">
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       {/* --- HEADER --- */}
//       <header className="px-6 py-4 max-w-7xl w-full mx-auto flex items-center justify-between border-b border-slate-100 bg-white/60 backdrop-blur-md sticky top-0 z-40">
//         <VillgoLogo />
//         <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-sky-100/60 text-sky-700">
//           SHWebCreatives Project
//         </span>
//       </header>

//       {/* --- MAIN BODY --- */}
//       <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        
//         {currentPage === 'login' && (
//           <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden transition-all duration-300 transform hover:shadow-2xl">
//             {/* Top Brand Banner */}
//             <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6 text-white text-center relative overflow-hidden">
//               <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4">
//                 <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M19 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <h2 className="text-xl font-bold tracking-wide">Welcome Back!</h2>
//               <p className="text-sky-100 text-xs mt-1">Access India's digital supply and transport network</p>
//             </div>

//             {/* Form Section */}
//             <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-5">
              
//               {/* Mobile Input */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Registered Mobile Number</label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                   </span>
//                   <input
//                     type="tel"
//                     maxLength={10}
//                     placeholder="Enter 10-digit number"
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
//                     className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm font-medium"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Input */}
//               <div className="space-y-1.5">
//                 <div className="flex justify-between items-center">
//                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Password</label>
//                   <button
//                     type="button"
//                     onClick={() => setCurrentPage('forgot_password')}
//                     className="text-xs font-bold text-sky-600 hover:text-indigo-600 hover:underline transition-all"
//                   >
//                     Forgot?
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
//                   </span>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm font-medium"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-all"
//                   >
//                     {showPassword ? (
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
//                     ) : (
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-100 hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] text-sm tracking-wide"
//               >
//                 Sign In Securely
//               </button>

//               {/* Separator */}
//               <div className="relative my-4">
//                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
//                 <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-slate-400 font-bold tracking-wider">New to Villgo?</span></div>
//               </div>

//               {/* Toggle to Register */}
//               <button
//                 type="button"
//                 onClick={() => {
//                   setCurrentPage('register');
//                   setMobile('');
//                   setPassword('');
//                 }}
//                 className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-all text-sm block text-center"
//               >
//                 Create Partner Account
//               </button>

//               {/* Testing / Quick Access Panel */}
//               <div className="mt-4 p-4 rounded-2xl bg-amber-50/75 border border-amber-100 text-xs text-amber-900/80 space-y-2">
//                 <div className="font-bold flex items-center gap-1.5 text-amber-900 text-[11px] uppercase tracking-wider">
//                   <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                   Demo Logins (for Harish & Friend):
//                 </div>
//                 <p>💡 <b>Retailer:</b> Mobile <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">9999999999</span> | Pass: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">123456</span></p>
//                 <p>💡 <b>Wholesaler:</b> Mobile <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">8888888888</span> | Pass: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">123456</span></p>
//               </div>
//             </form>
//           </div>
//         )}

//         {currentPage === 'register' && (
//           <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden transition-all duration-300 transform hover:shadow-2xl">
//             {/* Top Brand Banner */}
//             <div className="bg-gradient-to-r from-indigo-500 to-sky-500 p-6 text-white text-center relative overflow-hidden">
//               <h2 className="text-xl font-bold tracking-wide">Join Villgo Partner Network</h2>
//               <p className="text-sky-100 text-xs mt-1">Directly trade, supply, and deliver across rural & urban hubs</p>
//             </div>

//             {/* Registration Form */}
//             <form onSubmit={handleRegisterSubmit} className="p-6 sm:p-8 space-y-4">
              
//               {/* Full Name */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Full Name / Owner Name</label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
//                   </span>
//                   <input
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm font-medium"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Mobile Input */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Mobile Number (Primary ID)</label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                   </span>
//                   <input
//                     type="tel"
//                     maxLength={10}
//                     placeholder="Enter 10-digit mobile number"
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
//                     className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm font-medium"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Input */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Create Strong Password</label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
//                   </span>
//                   <input
//                     type="password"
//                     placeholder="Create your pass key"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm font-medium"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* --- DROP-DOWN ROLE SELECTION SYSTEM --- */}
//               <div className="space-y-1.5">
//                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Your Role in System</label>
//                 <div className="grid grid-cols-3 gap-2">
                  
//                   {/* Retailer Option Card */}
//                   <label className={`cursor-pointer border-2 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 text-center transition-all ${role === 'retailer' ? 'border-sky-500 bg-sky-50/40 text-sky-700' : 'border-slate-200 bg-slate-50/30 text-slate-500 hover:bg-slate-50'}`}>
//                     <input type="radio" name="regRole" value="retailer" checked={role === 'retailer'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                     </svg>
//                     <span className="text-xs font-bold block">Retailer</span>
//                     <span className="text-[9px] text-slate-400 font-medium leading-tight">Shop owner</span>
//                   </label>

//                   {/* Wholesaler Option Card */}
//                   <label className={`cursor-pointer border-2 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 text-center transition-all ${role === 'wholesaler' ? 'border-sky-500 bg-sky-50/40 text-sky-700' : 'border-slate-200 bg-slate-50/30 text-slate-500 hover:bg-slate-50'}`}>
//                     <input type="radio" name="regRole" value="wholesaler" checked={role === 'wholesaler'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <span className="text-xs font-bold block">Wholesaler</span>
//                     <span className="text-[9px] text-slate-400 font-medium leading-tight">Merchant</span>
//                   </label>

//                   {/* Transfer / Transporter Option Card */}
//                   <label className={`cursor-pointer border-2 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 text-center transition-all ${role === 'transfer' ? 'border-sky-500 bg-sky-50/40 text-sky-700' : 'border-slate-200 bg-slate-50/30 text-slate-500 hover:bg-slate-50'}`}>
//                     <input type="radio" name="regRole" value="transfer" checked={role === 'transfer'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                     </svg>
//                     <span className="text-xs font-bold block">Transfer</span>
//                     <span className="text-[9px] text-slate-400 font-medium leading-tight">Transport</span>
//                   </label>

//                 </div>
//                 {role === 'wholesaler' && (
//                   <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 p-2 rounded-lg mt-1 font-medium">
//                     ⚠️ Note: Wholesaler accounts require physical review and confirmation from Administrator before they can post inventory.
//                   </p>
//                 )}
//               </div>

//               {/* Terms and Conditions */}
//               <div className="flex items-start gap-2.5 pt-1">
//                 <input
//                   id="terms"
//                   type="checkbox"
//                   checked={termsAccepted}
//                   onChange={(e) => setTermsAccepted(e.target.checked)}
//                   className="mt-1 w-4.5 h-4.5 text-sky-600 bg-slate-50 border-slate-300 rounded focus:ring-sky-500 focus:ring-2"
//                 />
//                 <label htmlFor="terms" className="text-xs font-medium text-slate-500 leading-normal">
//                   I agree to Villgo's <span className="text-sky-600 hover:underline cursor-pointer">Partner Agreement</span> and <span className="text-sky-600 hover:underline cursor-pointer">Freight Terms</span>.
//                 </label>
//               </div>

//               {/* Submit Registration Button */}
//               <button
//                 type="submit"
//                 className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-100 hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] text-sm"
//               >
//                 Create Account
//               </button>

//               <div className="text-center pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setCurrentPage('login')}
//                   className="text-xs font-bold text-slate-500 hover:text-sky-600 transition-all"
//                 >
//                   Already have an account? <span className="text-sky-600">Sign In</span>
//                 </button>
//               </div>

//             </form>
//           </div>
//         )}

//         {currentPage === 'forgot_password' && (
//           <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden p-6 sm:p-8 space-y-5">
//             <div className="text-center space-y-2">
//               <div className="mx-auto w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m0 9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h2m4-4h2a2 2 0 012 2v2m-6 0h6" /></svg>
//               </div>
//               <h2 className="text-lg font-bold text-slate-800">Reset Credentials</h2>
//               <p className="text-xs text-slate-400">Enter your registered number to request verification PIN.</p>
//             </div>

//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Your Mobile Number</label>
//                 <input
//                   type="tel"
//                   maxLength={10}
//                   placeholder="e.g. 9898XXXXXX"
//                   className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-sm font-medium"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() => {
//                   showToastMsg('Mock verification PIN sent to mobile!', 'success');
//                   setCurrentPage('login');
//                 }}
//                 className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-100 transition-all text-sm"
//               >
//                 Send Verification PIN
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setCurrentPage('login')}
//                 className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-2xl border border-slate-200 transition-all text-xs"
//               >
//                 Cancel and Go Back
//               </button>
//             </div>
//           </div>
//         )}

//         {/* --- DEMO DASHBOARD AFTER SUCCESSFUL LOGIN --- */}
//         {currentPage === 'dashboard' && loggedInUser && (
//           <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden">
//             {/* Top Bar with User Info */}
//             <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div className="space-y-1">
//                 <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-widest uppercase block w-max">
//                   {loggedInUser.role} Dashboard
//                 </span>
//                 <h2 className="text-2xl font-bold">{loggedInUser.businessName}</h2>
//                 <p className="text-sky-100 text-sm">Welcome back, {loggedInUser.name} | Mobile: {loggedInUser.mobile}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   setLoggedInUser(null);
//                   setCurrentPage('login');
//                   showToastMsg('Logged out successfully.', 'success');
//                 }}
//                 className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/20 self-start sm:self-center"
//               >
//                 Sign Out
//               </button>
//             </div>

//             {/* Simulated Content Dashboard */}
//             <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50">
              
//               {/* Left Column: Quick Actions */}
//               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
//                 <h3 className="font-bold text-sm tracking-wide text-slate-800 uppercase border-b pb-2 border-slate-100">Quick Actions</h3>
                
//                 {loggedInUser.role === 'retailer' && (
//                   <div className="space-y-2">
//                     <button className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       Find New Wholesalers
//                     </button>
//                     <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs transition-all">
//                       View My Orders
//                     </button>
//                   </div>
//                 )}

//                 {loggedInUser.role === 'wholesaler' && (
//                   <div className="space-y-2">
//                     <button className="w-full py-2.5 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       Add New Product
//                     </button>
//                     <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs transition-all">
//                       Process Pending Orders (3)
//                     </button>
//                   </div>
//                 )}

//                 {loggedInUser.role === 'transfer' && (
//                   <div className="space-y-2">
//                     <button className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
//                       Active Transports
//                     </button>
//                     <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs transition-all">
//                       Find New Leads
//                     </button>
//                   </div>
//                 )}

//                 <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-800 leading-relaxed">
//                   📢 <b>Harish:</b> This is a responsive simulator demonstrating role routing. In actual DB, the user type determines the home landing page.
//                 </div>
//               </div>

//               {/* Right Columns: Main content */}
//               <div className="md:col-span-2 space-y-6">
                
//                 {/* Statistics Mock */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
//                     <p className="text-[10px] uppercase font-bold text-slate-400">Total Active Orders</p>
//                     <p className="text-2xl font-black text-slate-800 mt-1">14</p>
//                   </div>
//                   <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
//                     <p className="text-[10px] uppercase font-bold text-slate-400">Completed Routes</p>
//                     <p className="text-2xl font-black text-slate-800 mt-1">112</p>
//                   </div>
//                   <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm col-span-2 sm:col-span-1">
//                     <p className="text-[10px] uppercase font-bold text-slate-400">Approval Status</p>
//                     <p className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1 mt-1.5 w-max">
//                       Active / Verified
//                     </p>
//                   </div>
//                 </div>

//                 {/* Notifications Panel */}
//                 <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
//                   <h3 className="font-bold text-xs tracking-wide text-slate-400 uppercase">Updates from Admin</h3>
                  
//                   <div className="space-y-3">
//                     <div className="flex gap-3 items-start border-b pb-3 border-slate-50">
//                       <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
//                       <div>
//                         <h4 className="text-xs font-bold text-slate-700">Festival Sales Alert - High Freight Demand Expected!</h4>
//                         <p className="text-[11px] text-slate-400 mt-0.5">Prepare warehouse inventory. Freight rates might rise by 10% during Diwali week.</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 items-start">
//                       <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
//                       <div>
//                         <h4 className="text-xs font-bold text-slate-700">Important System Upgrade on Sunday night</h4>
//                         <p className="text-[11px] text-slate-400 mt-0.5">The Villgo payment settlement and tracking APIs will be under maintenance.</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         )}

//       </main>

//       {/* --- FOOTER --- */}
//       <footer className="px-6 py-4 border-t border-slate-100 bg-white/60 text-center text-xs text-slate-400 space-y-1">
//         <p>&copy; 2026 Villgo Logistics Inc. Built with care by <b>SHWebCreatives</b>.</p>
//         <p className="text-[10px] text-slate-400/80">Premium light transport UI mockup for demonstration purposes only.</p>
//       </footer>
//     </div>
//   );
// }