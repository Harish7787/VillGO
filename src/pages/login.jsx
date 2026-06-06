import React, { useState } from "react";
import VillgoLogo from "../components/common/VillgoLogo";
import Toast from "../components/common/Toast";
import LoginForm from "../components/auth/login";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import Dashboard from "./Dashboard";
const Login = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("retailer");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const showToastMsg = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!mobile || !password) {
      showToastMsg("Please fill in all fields", "error");
      return;
    }

    if (mobile === "9999999999" && password === "123456") {
      setLoggedInUser({
        name: "Demo Retailer",
        mobile,
        role: "retailer",
      });

      showToastMsg("Login Successful");
      setCurrentPage("dashboard");
    } else {
      showToastMsg("Invalid Credentials", "error");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!name || !mobile || !password) {
      showToastMsg("Please fill all fields", "error");
      return;
    }

    setCurrentPage("login");
    showToastMsg("Registration Successful");
  };

  const handleSendPin = (phone) => {
    showToastMsg(`PIN sent to ${phone}`);
    setCurrentPage("login");
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
      <header className="border-b bg-white px-6 py-4">
        <VillgoLogo />
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        {currentPage === "login" && (
          <LoginForm
            mobile={mobile}
            setMobile={setMobile}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSubmit={handleLoginSubmit}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === "register" && (
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
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === "forgot_password" && (
          <ForgotPasswordForm
            onSendPin={handleSendPin}
            onCancel={() => setCurrentPage("login")}
          />
        )}

        {currentPage === "dashboard" && loggedInUser && (
          <Dashboard
            user={loggedInUser}
            onLogout={() => {
              setLoggedInUser(null);
              setCurrentPage("login");
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white text-center text-xs text-slate-500 py-4">
        © 2026 Villgo Logistics Inc.
      </footer>
    </div>
  );
};

export default Login;