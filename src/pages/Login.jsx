import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      login(res.data);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@email.com"
              className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 mt-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

<div className="flex justify-end">
  <Link to="/forgot-password" className="text-sky-400 text-xs hover:underline">
    Forgot password?
  </Link>
</div>
        <p className="text-zinc-500 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;