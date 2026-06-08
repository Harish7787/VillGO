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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wholesaler" element={<WholesalerDashboard />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;