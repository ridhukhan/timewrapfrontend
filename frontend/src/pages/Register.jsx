import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     // register success এর পর
const res = await axiosInstance.post("/auth/register", { name, username, email, password });
toast.success("OTP sent to your email!");
navigate("/verify-otp", { state: { userId: res.data.userId } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
              className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="johndoe"
              className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm"
            />
          </div>

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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-zinc-500 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;