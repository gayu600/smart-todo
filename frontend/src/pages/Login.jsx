import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../services/api";
import { CheckCircle, Mail, Lock } from "lucide-react";
import BubbleBackground from "../components/BubbleBackground";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await api.login(form);
    const response = res.data; // ✅ Access the actual response data

    // Save user and token
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);

    setShowSuccess(true);

    // ✅ Delay redirect slightly for success animation
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/dashboard"); // Redirects to dashboard route
    }, 1500);
  } catch (err) {
    alert("Invalid email or password. Try again!");
    console.error("Login error:", err);
  }
};


  return (
    <div className="relative min-h-screen flex justify-center items-center bg-[#0a0f1f] overflow-hidden">
      {/* 🌊 Animated bubble background */}
      <BubbleBackground />

      {/* Success Popup */}
      {showSuccess && (
        <div className="absolute top-10 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md flex items-center gap-2 animate-bounce z-10">
          <CheckCircle size={20} />
          <span>Login Successful!</span>
        </div>
      )}

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] p-8 rounded-xl shadow-lg shadow-cyan-500/30"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
            Welcome Back
          </h2>

          {/* Email Field */}
          <div className="relative mb-4">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-2 pl-10 rounded bg-[#1a2235] text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative mb-6">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full p-2 pl-10 rounded bg-[#1a2235] text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
          >
            Login
          </button>

          {/* Register Redirect */}
          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
