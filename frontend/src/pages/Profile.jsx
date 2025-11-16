import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import BubbleBackground from "../components/BubbleBackground";
import { Calendar, User, Phone, MapPin, Home, Info } from "lucide-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

// Countries with flag images
const countryOptions = [
  { value: "IN", label: "India", flag: "https://www.countryflags.io/IN/flat/32.png" },
  { value: "US", label: "United States", flag: "https://www.countryflags.io/US/flat/32.png" },
  { value: "GB", label: "United Kingdom", flag: "https://www.countryflags.io/GB/flat/32.png" },
  { value: "CA", label: "Canada", flag: "https://www.countryflags.io/CA/flat/32.png" },
  { value: "AU", label: "Australia", flag: "https://www.countryflags.io/AU/flat/32.png" },
];

// Example states
const stateOptions = [
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
];

// Custom country option renderer
const formatOptionLabel = ({ label, flag }) => (
  <div className="flex items-center gap-2">
    <img src={flag} alt={label} className="w-5 h-5 rounded-sm" />
    <span>{label}</span>
  </div>
);

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    mobile: "",
    country: null,
    state: null,
    location: "",
    dob: "",
    address: "",
    bio: "",
    profilePhoto: null,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      setForm({
        fullName: user.fullName || "",
        username: user.username || "",
        mobile: user.mobile || "",
        country: user.country
          ? countryOptions.find((c) => c.value === user.country)
          : null,
        state: user.state
          ? stateOptions.find((s) => s.value === user.state)
          : null,
        location: user.location || "",
        dob: user.dob || "",
        address: user.address || "",
        bio: user.bio || "",
        profilePhoto: user.profilePhoto || null,
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleCountryChange = (selected) => setForm({ ...form, country: selected });
  const handleStateChange = (selected) => setForm({ ...form, state: selected });

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      for (let key in form) {
        if (key === "country" || key === "state") {
          formData.append(key, form[key]?.value || "");
        } else {
          formData.append(key, form[key]);
        }
      }
      const res = await api.updateProfile(formData);
      alert("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0f1f] text-white overflow-hidden">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-3xl bg-[#111827]/80 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">User Profile</h1>

        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <label className="relative w-28 h-28 rounded-full border-2 border-cyan-500 overflow-hidden cursor-pointer">
            {form.profilePhoto ? (
              <img
                src={
                  typeof form.profilePhoto === "string"
                    ? form.profilePhoto
                    : URL.createObjectURL(form.profilePhoto)
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-cyan-400 text-black font-bold text-xl">
                {form.fullName ? form.fullName.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <input type="file" name="profilePhoto" accept="image/*" className="hidden" onChange={handleChange} />
          </label>
        </div>

        <div className="space-y-4">
          {/* Full Name & Username */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <User className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 pl-10 rounded bg-[#0a0f1f] border border-cyan-600 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex-1 relative">
              <User className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 pl-10 rounded bg-[#0a0f1f] border border-cyan-600 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Mobile & Country */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Phone className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-2 pl-10 rounded bg-[#0a0f1f] border border-cyan-600 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex-1">
              <Select
                options={countryOptions}
                value={form.country}
                onChange={handleCountryChange}
                placeholder="Select Country"
                formatOptionLabel={formatOptionLabel}
                styles={{
                  control: (provided) => ({ ...provided, backgroundColor: "#0a0f1f", borderColor: "#06b6d4", color: "white" }),
                  singleValue: (provided) => ({ ...provided, color: "white" }),
                  menu: (provided) => ({ ...provided, backgroundColor: "#111827" }),
                  option: (provided, state) => ({ ...provided, backgroundColor: state.isFocused ? "#0e1726" : "#111827", color: "white" }),
                }}
              />
            </div>
          </div>

          {/* State & Location */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <Select
                options={stateOptions}
                value={form.state}
                onChange={handleStateChange}
                placeholder="Select State"
                styles={{
                  control: (provided) => ({ ...provided, backgroundColor: "#0a0f1f", borderColor: "#06b6d4", color: "white" }),
                  singleValue: (provided) => ({ ...provided, color: "white" }),
                  menu: (provided) => ({ ...provided, backgroundColor: "#111827" }),
                  option: (provided, state) => ({ ...provided, backgroundColor: state.isFocused ? "#0e1726" : "#111827", color: "white" }),
                }}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="City / Location"
                className="w-full p-2 pl-10 rounded bg-[#0a0f1f] border border-cyan-600 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* DOB */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Calendar className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full p-2 pl-10 rounded bg-[#0a0f1f] border border-cyan-600 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Address */}
          <div className="relative">
            <Home className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 pl-10 rounded bg-[#0a0f1f] border border-cyan-600 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Short Bio */}
          <div className="relative">
            <Info className="absolute top-3 left-3 text-gray-400" size={18} />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Short Bio"
              rows={3}
              className="w-full p-2 pl-10 rounded bg-[#0a0f1f] border border-cyan-600 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white font-medium mt-4"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
