import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://timewrapbackend.onrender.com/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Register success 🎉");
      navigate("/login");
    } catch (error) {
      toast.error("Register failed ❌");
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-8 rounded-2xl w-[350px] border border-zinc-700 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-sky-400">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 rounded bg-zinc-800 border border-zinc-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-sky-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;