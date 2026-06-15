// // import React, { useState, useEffect } from 'react';
// // import Navbar from '../common/Navbar';
// // import HomeHeader from '../common/HomeHeader';
// // import FareEstimator from '../common/FareEstimator';
// // import ShipmentTracker from '../common/ShipmentTracker';
// // import Toast from '../common/Toast';

// // const Home = () => {

// //   // states...
// //   const [toast, setToast] = useState(null);
// // const [lang, setLang] = useState("en");
// // const text = {
// //   brand: "Villgo",
// //   tagline: "Smart Logistics",

// //   navHome: "Home",
// //   navEstimator: "Estimator",
// //   navTracker: "Tracker",
// //   navRoles: "Roles",

// //   signIn: "Sign In",
// //   signUp: "Sign Up"
// // };


// // const onRedirect = (path) => {
// //   console.log(path);
// // };

// // const onScrollToSection = (id) => {
// //   const element = document.getElementById(id);
// //   if (element) {
// //     element.scrollIntoView({ behavior: "smooth" });
// //   }
// // };
// //   return (
// //     <>
// //       {toast && (
// //         <Toast
// //           message={toast.message}
// //           type={toast.type}
// //           onClose={() => setToast(null)}
// //         />
// //       )}

// //       {/* <Navbar /> */}

// //     <HomeHeader
// //   text={text}
// //   resolvedTheme="light"
// //   onRedirect={onRedirect}
// //   onScrollToSection={onScrollToSection}
// // />

// //       {/* <FareEstimator
// //         source={source}
// //         setSource={setSource}
// //         destination={destination}
// //         setDestination={setDestination}
// //         weight={weight}
// //         setWeight={setWeight}
// //         vehicle={vehicle}
// //         setVehicle={setVehicle}
// //         calculatedFare={calculatedFare}
// //         setCalculatedFare={setCalculatedFare}
// //       />

// //       <ShipmentTracker
// //         trackId={trackId}
// //         setTrackId={setTrackId}
// //         activeShipment={activeShipment}
// //         setActiveShipment={setActiveShipment}
// //         shipmentsDB={shipmentsDB}
// //         trackerError={trackerError}
// //         setTrackerError={setTrackerError}
// //       /> */}
// //     </>
// //   );
// // };

// //export default Home;

// import React, { useState } from "react";


// import HeroSection from "./HeroSection";
// import ControlPanel from "./ControlPanel";
// import StatsCards from "./StatsCards";
// import FareEstimator from "./FareEstimator";
// import ShipmentTracker from "./ShipmentTracker";
// import RoleSelector from "../common/RoleSelector";
// import text from "../data/localization";
// import { Header } from "./HomeHeader";
// import Footer from "../common/Footer";
// const Home = () => {
//   const [lang, setLang] = useState("en");
//   const [theme, setTheme] = useState("light");

//   const content = text[lang];
//   const [source, setSource] = useState("Ahmedabad GIDC");
//   const [destination, setDestination] = useState("Surat GIDC");
//   const [weight, setWeight] = useState(500);
//   const [vehicle, setVehicle] = useState("chota_hathi");
//   const [calculatedFare, setCalculatedFare] = useState(null);

//   const [trackId, setTrackId] = useState("");
//   const [trackerError, setTrackerError] = useState(false);
//   const [activeShipment, setActiveShipment] = useState(null);

//   const shipmentsDB = {
//     "VG-1001": {
//       origin: "Ahmedabad GIDC",
//       destination: "Rajkot GIDC",
//       cargo: "Grain & Flour Sacks (1200 KGs)",
//       carrier: "Tata Ace (GJ-01-XX-9901)",
//       status: 2
//     },
//     "VG-1002": {
//       origin: "Surat GIDC",
//       destination: "Vadodara GIDC",
//       cargo: "Premium Textile Rolls (3000 KGs)",
//       carrier: "Eicher Truck (GJ-05-ZZ-1289)",
//       status: 3
//     }
//   };

//   const handleCalculate = (e) => {
//     e.preventDefault();

//     const fare = Number(weight) * 2;
//     setCalculatedFare(fare);
//   };
//   const handleTrack = (e) => {
//     e.preventDefault();

//     const shipment = shipmentsDB[trackId];

//     if (shipment) {
//       setActiveShipment(shipment);
//       setTrackerError(false);
//     } else {
//       setActiveShipment(null);
//       setTrackerError(true);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-white">
//       <Header
//         text={content}
//         lang={lang}
//         setLang={setLang}
//       />

//       <HeroSection text={content} />

//       <ControlPanel
//         lang={lang}
//         setLang={setLang}
//         theme={theme}
//         setTheme={setTheme}
//       />

//       <StatsCards />

//       <FareEstimator
//         text={content}
//         resolvedTheme={theme}
//         source={source}
//         setSource={setSource}
//         destination={destination}
//         setDestination={setDestination}
//         weight={weight}
//         setWeight={setWeight}
//         vehicle={vehicle}
//         setVehicle={setVehicle}
//         calculatedFare={calculatedFare}
//         onCalculate={handleCalculate}
//       />

//       <ShipmentTracker
//         text={content}
//         resolvedTheme={theme}
//         trackId={trackId}
//         setTrackId={setTrackId}
//         trackerError={trackerError}
//         activeShipment={activeShipment}
//         onTrack={handleTrack}
//       />

//       <RoleSelector />

//       <footer className="px-6 py-12 border-t text-center bg-white border-slate-100">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="font-black text-lg">Villgo</h2>
//           <p className="text-sm text-gray-500">
//             Smart Logistics Platform
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';

import HeroSection from './HeroSection';
import StatsCards from './StatsCards';
import FareEstimator from './FareEstimator';
import ShipmentTracker from './ShipmentTracker';
import Footer from '../common/Footer';
import Toast from '../common/Toast';
import T from '../data/localization';
import Header from './HomeHeader';
import ControlPanel from './ControlPanel';
import { useNavigate } from "react-router-dom";

// ============================================================================
// CLEAN MAIN ORCHESTRATOR HOME COMPONENT
// Local File Path: src/components/home/Home.jsx
// ============================================================================

export default function Home() {

  const navigate = useNavigate();

  const handleRouteRedirect = (path) => {
    navigate(path);
  };

  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [toast, setToast] = useState(null);

  // Settings State Panel Configuration
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  // Estimator States
  const [source, setSource] = useState('Ahmedabad GIDC');
  const [destination, setDestination] = useState('Surat GIDC');
  const [weight, setWeight] = useState(250);
  const [vehicle, setVehicle] = useState('chota_hathi');
  const [calculatedFare, setCalculatedFare] = useState(null);

  // Tracker States
  const [trackId, setTrackId] = useState('');
  const [activeShipment, setActiveShipment] = useState(null);
  const [trackerError, setTrackerError] = useState(false);

  // Mock databases
  const shipmentsDB = {
    'VG-1001': { id: 'VG-1001', status: 2, origin: 'Ahmedabad GIDC', destination: 'Rajkot GIDC', cargo: 'Grain & Flour Sacks (1200 KGs)', carrier: 'Tata Ace (GJ-01-XX-9901)' },
    'VG-1002': { id: 'VG-1002', status: 3, origin: 'Surat GIDC', destination: 'Vadodara GIDC', cargo: 'Premium Textile Rolls (3000 KGs)', carrier: 'Eicher Truck (GJ-05-ZZ-1289)' }
  };

  const showToastMsg = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync operating system theme setups
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      const handler = (e) => setResolvedTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Handle Dynamic Fare Calculation
  const handleCalculate = (e) => {
    e.preventDefault();
    if (!weight || weight <= 0) {
      showToastMsg(T[lang].selectWeightErr, 'error');
      return;
    }
    let baseRate = 1200;
    if (source === destination) {
      baseRate = 500;
    } else {
      const routes = [source, destination];
      if (routes.includes('Ahmedabad GIDC') && routes.includes('Surat GIDC')) baseRate = 2800;
      if (routes.includes('Ahmedabad GIDC') && routes.includes('Rajkot GIDC')) baseRate = 2200;
      if (routes.includes('Surat GIDC') && routes.includes('Vadodara GIDC')) baseRate = 1500;
      if (routes.includes('Vadodara GIDC') && routes.includes('Rajkot GIDC')) baseRate = 3200;
    }
    const weightFactor = parseFloat(weight) * 1.5;
    let vehicleMultiplier = 1.0;
    if (vehicle === 'pickup') vehicleMultiplier = 1.4;
    if (vehicle === 'eicher_truck') vehicleMultiplier = 2.2;

    const total = Math.round((baseRate + weightFactor) * vehicleMultiplier);
    setCalculatedFare(total);
  };

  // Shipment tracker search actions
  const handleTrack = (e) => {
    e.preventDefault();
    const result = shipmentsDB[trackId.toUpperCase().trim()];
    if (result) {
      setActiveShipment(result);
      setTrackerError(false);
    } else {
      setActiveShipment(null);
      setTrackerError(true);
    }
  };

  // Redirect Simulators for clean local mapping
  // const handleRouteRedirect = (path, buttonName) => {
  //   showToastMsg(`React Router: Moving cleanly to your custom "${buttonName}" page at [${path}]...`, 'success');
  // };

  // Section scroller
  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const text = T[lang];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col justify-between ${resolvedTheme === 'dark' ? 'bg-[#0b1120] text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Navbar Header Component */}
      {/* <Header
        text={text}
        onRedirect={handleRouteRedirect}
        resolvedTheme={resolvedTheme}
        onScrollToSection={handleScrollToSection}
      /> */}

      <Header
        text={text}
        onRedirect={handleRouteRedirect}
        resolvedTheme={resolvedTheme}
        onScrollToSection={handleScrollToSection}
      />
      {/* Main Containers */}
      <main className="flex-grow">

        {/* HERO AREA (ID: hero-section) */}
        <section id="hero-section" className="px-6 py-12 md:py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <HeroSection text={text} resolvedTheme={resolvedTheme}>
            <StatsCards text={text} resolvedTheme={resolvedTheme} />
          </HeroSection>

          {/* Estimator module widget (ID: estimator-section) */}
          <div id="estimator-section" className="lg:col-span-5 space-y-6 scroll-mt-24">
            <FareEstimator
              text={text}
              resolvedTheme={resolvedTheme}
              source={source}
              setSource={setSource}
              destination={destination}
              setDestination={setDestination}
              weight={weight}
              setWeight={setWeight}
              vehicle={vehicle}
              setVehicle={setVehicle}
              calculatedFare={calculatedFare}
              onCalculate={handleCalculate}
            />
          </div>

        </section>

        {/* TRACKER & ROLE CARDS SECTION */}
        <section className={`py-16 ${resolvedTheme === 'dark' ? 'bg-slate-900/40' : 'bg-slate-100/40'}`}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Shipment Tracker Widget (ID: tracker-section) */}
            <div id="tracker-section" className="lg:col-span-5 space-y-6 scroll-mt-24">
              <ShipmentTracker
                text={text}
                resolvedTheme={resolvedTheme}
                trackId={trackId}
                setTrackId={setTrackId}
                trackerError={trackerError}
                activeShipment={activeShipment}
                onTrack={handleTrack}
              />
            </div>

            {/* Partners Segment list (ID: roles-section) */}
            <div id="roles-section" className="lg:col-span-7 space-y-6 scroll-mt-24">
              <h2 className="text-2xl font-black tracking-tight">{text.rolesTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Retailer Card */}
                <div className={`p-5 rounded-2xl border transition-all ${resolvedTheme === 'dark' ? 'bg-[#121c33]/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
                  }`}>
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-500 font-black mb-3">R</div>
                  <h3 className="text-sm font-bold mb-2">{text.roleRetailer}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{text.roleRetailerDesc}</p>
                  <button
                    onClick={() => handleRouteRedirect('/register?role=retailer', text.roleRetailer)}
                    className="mt-4 text-xs font-bold text-sky-500 hover:text-indigo-500 flex items-center gap-1 focus:outline-none"
                  >
                    Get Started →
                  </button>
                </div>

                {/* Wholesaler Card */}
                <div className={`p-5 rounded-2xl border transition-all ${resolvedTheme === 'dark' ? 'bg-[#121c33]/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
                  }`}>
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-500 font-black mb-3">W</div>
                  <h3 className="text-sm font-bold mb-2">{text.roleWholesaler}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{text.roleWholesalerDesc}</p>
                  <button
                    onClick={() => handleRouteRedirect('/register?role=wholesaler', text.roleWholesaler)}
                    className="mt-4 text-xs font-bold text-indigo-500 hover:text-sky-500 flex items-center gap-1 focus:outline-none"
                  >
                    Get Started →
                  </button>
                </div>

                {/* Transporter Card */}
                <div className={`p-5 rounded-2xl border transition-all ${resolvedTheme === 'dark' ? 'bg-[#121c33]/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
                  }`}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-500 font-black mb-3">T</div>
                  <h3 className="text-sm font-bold mb-2">{text.roleTransporter}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{text.roleTransporterDesc}</p>
                  <button
                    onClick={() => handleRouteRedirect('/register?role=transfer', text.roleTransporter)}
                    className="mt-4 text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-1 focus:outline-none"
                  >
                    Get Started →
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Floating Control Panel Preferences Center Component (Bottom Left) */}
      <ControlPanel
        text={text}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        resolvedTheme={resolvedTheme}
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
      />

      {/* Footer System Showcase */}
      <footer className={`px-6 py-12 border-t text-center ${resolvedTheme === 'dark' ? 'bg-[#090d18] border-slate-800' : 'bg-white border-slate-100'
        }`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg font-black">{text.brand}</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700"></span>
            <span className="text-xs text-sky-500 font-bold tracking-wide uppercase">{text.tagline}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            {text.footerText} <strong className="text-slate-800 dark:text-slate-200 bg-sky-100 dark:bg-slate-800 px-2 py-1 rounded">SHWebCreatives</strong>. {text.rightsReserved}
          </p>
          <div className="text-[10px] text-slate-400/70">
            © 2026 Villgo Logistics Inc. Built with care for Harish's portfolio.
          </div>
        </div>
      </footer>

    </div>
  );
}