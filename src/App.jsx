// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import React, { useState } from 'react';
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <></
//     >
//   )
// }

// export default App

import React, { useState } from 'react';
import VillgoLogo from './components/common/VillgoLogo';
import Toast from './components/common/Toast';
import LoginForm from './components/auth/login';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import Dashboard from './pages/Dashboard';  
import Login from './pages/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import WholesalerDashboard from './pages/WholesalerDashboard';
import RetailerDashboard from './pages/RetailerDashboard';
import RegisterPage from './pages/RegisterPage';


const HomeMock = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-800 dark:text-white animate-fade-in">
      <div className="bg-white dark:bg-slate-900 shadow-xl border p-8 rounded-3xl max-w-md w-full space-y-6">
        <div className="text-sky-500 text-5xl">🚚</div>
        <h1 className="text-3xl font-black text-sky-600">Villgo B2B</h1>
        <p className="text-xs font-bold text-slate-400">Gujarat supply chain portal and bulk commodity logistics network hub.</p>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button onClick={() => navigate('/login')} className="p-3 bg-sky-500 text-white font-black text-xs rounded-xl shadow-md hover:bg-sky-600 transition-all">Sign In</button>
          <button onClick={() => navigate('/retailer')} className="p-3 bg-yellow-400 text-sky-950 font-black text-xs rounded-xl shadow-md hover:bg-yellow-500 transition-all">Retailer Bazar</button>
        </div>
      </div>
    </div>
  );
};

const LoginMock = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-sm w-full space-y-6 text-center text-white">
        <h2 className="text-xl font-black">Villgo Authentication Gateway</h2>
        <button onClick={() => navigate('/retailer')} className="w-full py-3 bg-sky-500 text-white font-black rounded-xl text-xs hover:bg-sky-600 transition-all">
          Harishbhai Provision Store login
        </button>
        <button onClick={() => navigate('/')} className="w-full py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
          Back to Home
        </button>
      </div>
    </div>
  );
};

const AdminMock = () => {
  return (
    <div className="p-8 text-center text-slate-400">
      <h2 className="text-2xl font-black text-slate-800">Admin Control Panel</h2>
    </div>
  );
};

const WholesalerMock = () => {
  return (
    <div className="p-8 text-center text-slate-400">
      <h2 className="text-2xl font-black text-slate-800">Wholesaler Control Panel</h2>
    </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/admin" element={<adminRouter />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wholesaler" element={<WholesalerDashboard />} />
        <Route path="/retailer" element={<RetailerDashboard />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;