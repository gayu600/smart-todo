import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../services/api";
import { CheckCircle, User, Mail, Lock } from "lucide-react";
import BubbleBackground from "../components/BubbleBackground";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await api.signup(form);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      alert("Failed to register. Try again!");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-[#0a0f1f] overflow-hidden">
      <BubbleBackground /> {/* 🌊 Animated bubble background */}

      {/* Success Popup */}
      {showSuccess && (
        <div className="absolute top-10 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md flex items-center gap-2 animate-bounce z-10">
          <CheckCircle size={20} />
          <span>Registration Successful!</span>
        </div>
      )}

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] p-8 rounded-xl shadow-lg shadow-cyan-500/30"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
            Create Account
          </h2>

          {/* Name Field */}
          <div className="relative mb-4">
            <User className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 pl-10 rounded bg-[#1a2235] text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative mb-4">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 pl-10 rounded bg-[#1a2235] text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
          >
            Register
          </button>

          {/* Login Redirect */}
          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
