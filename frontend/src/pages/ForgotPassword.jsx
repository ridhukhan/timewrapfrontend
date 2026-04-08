import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setSent(true);
      toast.success("Reset link sent!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">

        <div className="w-14 h-14 bg-sky-500/10 border border-sky-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2 text-center">Forgot Password?</h1>
        <p className="text-zinc-400 text-sm text-center mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
            <p className="text-green-400 text-sm">
              Reset link sent! Check your inbox.
            </p>
          </div>
        ) : (
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-zinc-500 text-sm text-center mt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;