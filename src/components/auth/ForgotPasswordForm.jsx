import React, { useState } from 'react';
import InputField from '../common/InputField';
import RoleSelector from '../common/RoleSelector';

const ForgotPasswordForm = ({ onSendPin, onCancel }) => {
  const [mobileNum, setMobileNum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobileNum || mobileNum.length < 10) {
      return;
    }
    onSendPin(mobileNum);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden p-6 sm:p-8 space-y-5">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m0 9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h2m4-4h2a2 2 0 012 2v2m-6 0h6" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-800">Reset Credentials</h2>
        <p className="text-xs text-slate-400">Enter your registered number to request verification PIN.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Your Mobile Number"
          type="tel"
          maxLength={10}
          placeholder="e.g. 9898XXXXXX"
          value={mobileNum}
          onChange={(e) => setMobileNum(e.target.value.replace(/\D/g, ''))}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />

        <button
          type="submit"
          disabled={mobileNum.length < 10}
          className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-sky-100 transition-all text-sm"
        >
          Send Verification PIN
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-2xl border border-slate-200 transition-all text-xs"
        >
          Cancel and Go Back
        </button>
      </form>
    </div>
  );
};
export default ForgotPasswordForm;
