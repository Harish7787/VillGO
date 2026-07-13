import React, { useState } from "react";
import VillgoLogo from "../components/common/VillgoLogo";
import Toast from "../components/common/Toast";
import LoginForm from "../components/auth/login";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("retailer");
  const [termsAccepted, setTermsAccepted] = useState(false);
const [loading, setLoading] = useState(false);
const [registerLoading, setRegisterLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const showToastMsg = (message, type = "success") => {
    setToast({ message, type });
  };

  const navigate = useNavigate();

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post(
  //       "https://villgo-backend-1.onrender.com/api/auth/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );

  //     localStorage.setItem("token", res.data.data);
  //     localStorage.setItem("role", res.data.role);

  //     if (res.data.role === "ADMIN") {
  //       navigate("/admin");
  //     } else if (res.data.role === "WOLESELLER") {
  //       navigate("/wholesaler");
  //     } else if (res.data.role === "RETAILER") {
  //       navigate("/retailer");
  //     } else if (res.data.role === "TRANSPORTER") {
  //       navigate("/transporter");
  //     }

  //   } catch (err) {
  //     console.log(err);
  //     setToast({
  //       message: "Invalid Email or Password",
  //       type: "error",
  //     });
  //   }
  // };

  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await axios.post(
    //  "https://villgo-backend-1.onrender.com/api/auth/login",
      //  "http://localhost:8080/api/auth/login",
      "https://villgo-backend-1.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.data);
    localStorage.setItem("role", res.data.role);

    if (res.data.role === "ADMIN") {
      navigate("/admin");
    } else if (res.data.role === "WOLESELLER") {
      navigate("/wholesaler");
    } else if (res.data.role === "RETAILER") {
      navigate("/retailer");
    } else if (res.data.role === "TRANSPORTER") {
      navigate("/transporter");
    }
  } catch (err) {
    setToast({
      message: "Invalid Email or Password",
      type: "error",
    });
  } finally {
    setLoading(false);
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
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSubmit={handleLoginSubmit}
            onNavigate={navigate}
             loading={loading}
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