import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import { Star, Plus, Link as LinkIcon, Upload, Trash2 } from "lucide-react";

// ✅ Import the Supabase client you already set up
import { supabase } from "../lib/supabaseClient";

export default function Vouches() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    review: "",
    rating: 0,
    password: "",
    link: "",
    image: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminAnim, setShowAdminAnim] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // Posting password
  const [postPassword, setPostPassword] = useState("AceSnapsVouches1");
  const [newPostPassword, setNewPostPassword] = useState("");

  // ✅ Load reviews from Supabase
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("vouches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching reviews:", error);
    else setReviews(data);
  };

  // ✅ Save new review to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== postPassword) {
      setError("Invalid password");
      return;
    }

    if (!form.name || !form.review || form.rating === 0) {
      setError("Please fill all fields and select a rating.");
      return;
    }

    const { error } = await supabase.from("vouches").insert([
      {
        name: form.name,
        review: form.review,
        rating: form.rating,
        link: form.link,
        image: form.image,
      },
    ]);

    if (error) {
      console.error("Error adding review:", error);
      setError("Failed to save review.");
    } else {
      await fetchReviews(); // refresh list
      setForm({ name: "", review: "", rating: 0, password: "", link: "", image: "" });
      setError("");
      setIsModalOpen(false);
    }
  };

  // ✅ Delete review from Supabase
  const handleDelete = async (id) => {
    const { error } = await supabase.from("vouches").delete().eq("id", id);
    if (error) console.error("Error deleting review:", error);
    else fetchReviews();
  };

  // Admin login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "daniel") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      setAdminError("");
    } else {
      setAdminError("Invalid admin password.");
    }
  };

  // Handle Avatar Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Detect Shift+A for admin
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === "a") {
        setShowAdminAnim(true);
        setTimeout(() => {
          setShowAdminAnim(false);
          setShowAdminLogin(true);
        }, 1500);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full px-6 py-12 relative">
        {/* --- Admin Welcome Animation --- */}
        <AnimatePresence>
          {showAdminAnim && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow-lg"
              >
                Welcome Admin
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Admin Login --- */}
        {showAdminLogin && !isAdmin && (
          <form onSubmit={handleAdminLogin} className="mb-8 bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-4">Admin Login</h2>
            <input
              type="password"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="px-4 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white focus:border-red-500 outline-none mr-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold mt-2"
            >
              Login
            </button>
            {adminError && <p className="text-red-500 text-sm mt-1">{adminError}</p>}
          </form>
        )}

        {/* --- Admin Panel --- */}
        {isAdmin && (
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 p-6 rounded-xl mb-10 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Admin Panel</h2>
            <p className="text-gray-400 mb-2">
              Current post password: <span className="text-red-500">{postPassword}</span>
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New Post Password"
                value={newPostPassword}
                onChange={(e) => setNewPostPassword(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white focus:border-red-500 outline-none"
              />
              <button
                onClick={() => {
                  if (newPostPassword.trim().length < 4) {
                    alert("Password must be at least 4 characters long.");
                    return;
                  }
                  setPostPassword(newPostPassword);
                  setNewPostPassword("");
                  alert("Posting password updated successfully!");
                }}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold shadow-lg"
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* --- Vouches Header --- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-red-500 mb-2 uppercase"
        >
          Vouches
        </motion.h1>
        <p className="text-gray-400 mb-10 text-center max-w-2xl">
          Here you can find reviews from my customers.
        </p>

        {/* --- Reviews --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-20">
          {reviews.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl shadow-lg relative"
            >
              <div className="flex items-center gap-3 mb-3">
                {r.image ? (
                  <img
                    src={r.image}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border border-red-600"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{r.name}</h3>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < r.rating ? "text-red-500 fill-red-500" : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-2">{r.review}</p>

              {r.link && (
                <a
                  href={r.link.startsWith("http") ? r.link : `https://${r.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-medium mt-2"
                >
                  <LinkIcon className="w-4 h-4" /> {r.link}
                </a>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleDelete(r.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- Floating Add Button --- */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center
                     bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_15px_rgba(239,68,68,0.7)]
                     text-white hover:scale-110 transition-transform"
          whileHover={{ rotate: 90 }}
        >
          <Plus className="w-7 h-7" />
        </motion.button>

        {/* --- Modal --- */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Leave a Vouch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white focus:border-red-500 outline-none"
                  />
                  <textarea
                    placeholder="Your Review"
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white focus:border-red-500 outline-none"
                    rows="4"
                  />
                  <input
                    type="text"
                    placeholder="Your Website / Creator Link (optional)"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white focus:border-red-500 outline-none"
                  />

                  {/* Avatar Upload */}
                  <div className="flex flex-col items-start gap-2">
                    <label className="text-sm text-gray-400">Upload Avatar (optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold shadow-lg transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Avatar
                    </button>
                    {form.image && (
                      <img
                        src={form.image}
                        alt="preview"
                        className="mt-2 w-16 h-16 rounded-full object-cover border border-red-600"
                      />
                    )}
                  </div>

                  {/* Star Rating */}
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Leave me a rating with stars :D
                    </p>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Star
                          key={num}
                          onClick={() => setForm({ ...form, rating: num })}
                          className={`w-7 h-7 cursor-pointer transition-colors ${
                            num <= form.rating
                              ? "text-red-500 fill-red-500"
                              : "text-zinc-700 hover:text-red-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                        setError("");
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-zinc-700 text-white focus:border-red-500 outline-none"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all"
                  >
                    Post Vouch
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setError("");
                    }}
                    className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
