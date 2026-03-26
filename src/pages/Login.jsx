import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login success 🔥");
      window.location.reload();
      navigate("/");
    } catch (error) {
      toast.error("Login failed ❌");
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-[350px] border border-zinc-700 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-sky-400">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-zinc-800 border border-zinc-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-zinc-800 border border-zinc-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-3 bg-sky-500 rounded hover:bg-sky-400 font-bold">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          No account?{" "}
          <Link to="/register" className="text-sky-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;