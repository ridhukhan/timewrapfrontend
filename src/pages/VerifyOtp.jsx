import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const VerifyOtp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { userId, otp });
      login(res.data);
      toast.success("Email verified!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">

        {/* Icon */}
        <div className="w-14 h-14 bg-sky-500/10 border border-sky-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2 text-center">Check your email</h1>
        <p className="text-zinc-400 text-sm text-center mb-6">
          We sent a 6-digit OTP to your email. Enter it below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-4 text-white placeholder-zinc-500 text-center text-2xl tracking-widest font-bold"
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;