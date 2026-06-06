import React from 'react';
import InputField from '../common/InputField';
import RoleSelector from '../common/RoleSelector';


const RegisterForm = ({
  name,
  setName,
  mobile,
  setMobile,
  password,
  setPassword,
  role,
  setRole,
  termsAccepted,
  setTermsAccepted,
  onSubmit,
  onNavigate
}) => (
  <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden transition-all duration-300 transform hover:shadow-2xl">
    <div className="bg-gradient-to-r from-indigo-500 to-sky-500 p-6 text-white text-center relative overflow-hidden">
      <h2 className="text-xl font-bold tracking-wide">Join Villgo Partner Network</h2>
      <p className="text-sky-100 text-xs mt-1">Directly trade, supply, and deliver across rural & urban hubs</p>
    </div>

    <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-4">
      <InputField
        label="Full Name / Owner Name"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <InputField
        label="Mobile Number (Primary ID)"
        type="tel"
        maxLength={10}
        placeholder="Enter 10-digit mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        }
      />

      <InputField
        label="Create Strong Password"
        placeholder="Create your pass key"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isPassword={false}
        type="password"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      />

      {/* Integrated Modular Role Selection system */}
      <RoleSelector selectedRole={role} onChange={setRole} />

      {role === 'wholesaler' && (
        <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 p-2 rounded-lg mt-1 font-medium leading-relaxed">
          ⚠️ Note: Wholesaler accounts require physical review and confirmation from Administrator before they can post inventory.
        </p>
      )}

      {/* Terms and Conditions */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="terms"
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-1 w-4.5 h-4.5 text-sky-600 bg-slate-50 border-slate-300 rounded focus:ring-sky-500 focus:ring-2"
        />
        <label htmlFor="terms" className="text-xs font-medium text-slate-500 leading-normal">
          I agree to Villgo's <span className="text-sky-600 hover:underline cursor-pointer">Partner Agreement</span> and <span className="text-sky-600 hover:underline cursor-pointer">Freight Terms</span>.
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-100 hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] text-sm"
      >
        Create Account
      </button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="text-xs font-bold text-slate-500 hover:text-sky-600 transition-all"
        >
          Already have an account? <span className="text-sky-600 font-bold">Sign In</span>
        </button>
      </div>
    </form>
  </div>
);

export default RegisterForm;    
