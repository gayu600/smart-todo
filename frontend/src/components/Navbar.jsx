import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.register({ name, email, password });
      alert("Registration successful! Redirecting to login...");
      navigate("/login"); // <-- Redirect to login page
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0f1f] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 neon">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#1a2235] text-white border border-neon/30"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#1a2235] text-white border border-neon/30"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-[#1a2235] text-white border border-neon/30"
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-neon text-black font-semibold hover:opacity-90 transition"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
