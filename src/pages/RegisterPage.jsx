// import RegisterForm from "../components/auth/RegisterForm";

// export default function RegisterPage() {
//   return <RegisterForm />;
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import Toast from "../components/common/Toast";
import VillgoLogo from "../components/common/VillgoLogo";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [role, setRole] = useState("retailer");
  const [termsAccepted, setTermsAccepted] = useState(false);
const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  setRegisterLoading(true);
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
  try {
    const roleMap = {
  retailer: "RETAILER",
  wholesaler: "WOLESELLER",
  transporter: "TRANSPORTER",
};

const res = await axios.post(
  "https://villgo-backend-1.onrender.com/api/auth/register",
  {
    fullName: name,
    email,
    mobile,
    role: roleMap[role],
    password,
  }
);

setToast({
  message: "Registration Successful",
  type: "success",
});
setTimeout(() => {
  navigate("/login");
}, 1500);
    alert("Registration Successful");

    navigate("/login");
  } catch (err) {
    console.log(err);
    alert("Registration Failed");
  }
    // setTimeout(() => {
    //   navigate("/login");
    // }, 1000);
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
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          onSubmit={handleRegisterSubmit}
          registerLoading={registerLoading}
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