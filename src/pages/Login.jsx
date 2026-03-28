import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.spaytimes.xyz/auth/login",
        form,
        {
          withCredentials: true, // ✅ cookie receive
        }
      );

      // ✅ only user save
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome back 🔥");

      navigate("/");
      window.location.reload(); // navbar update

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-[380px] border border-zinc-700 shadow-2xl shadow-sky-900/20"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-sky-400 tracking-wider">
          LOGIN
        </h2>

        {/* EMAIL */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none transition"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none transition"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-400 transition font-bold text-black tracking-wide"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center mt-5 text-zinc-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-sky-400 hover:underline">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;