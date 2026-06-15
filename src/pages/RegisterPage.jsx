// import RegisterForm from "../components/auth/RegisterForm";

// export default function RegisterPage() {
//   return <RegisterForm />;
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import Toast from "../components/common/Toast";
import VillgoLogo from "../components/common/VillgoLogo";

const Register = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("retailer");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!name || !mobile || !password) {
      setToast({
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }

    if (!termsAccepted) {
      setToast({
        message: "Please accept Terms & Conditions",
        type: "error",
      });
      return;
    }

    setToast({
      message: "Registration Successful",
      type: "success",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <VillgoLogo />
      </header>

      {/* Center */}
      <main className="flex-1 flex items-center justify-center p-6">
        <RegisterForm
          name={name}
          setName={setName}
          mobile={mobile}
          setMobile={setMobile}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          onSubmit={handleRegisterSubmit}
        />
      </main>

      {/* Footer */}
      <footer className="border-t bg-white text-center py-4 text-xs text-slate-500">
        © 2026 Villgo Logistics Inc.
      </footer>
    </div>
  );
};

export default Register;