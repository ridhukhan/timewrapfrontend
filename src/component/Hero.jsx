import React from "react";
import rolex from "../assets/rolex-hero.png";

const Hero = () => {
  return (
    <div className="bg-black text-white min-h-120 flex items-center justify-between px-10">

      <div className="max-w-xl space-y-6">
        <h1 className="text-5xl font-bold tracking-widest">
          TIME WRAP
        </h1>

        <p className="text-gray-400 text-lg">
          We believe in <span className="text-sky-400">quality</span>, not quantity.
        </p>

        <button className="mt-4 px-6 py-3 border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black transition duration-300">
          Explore Collection
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-sky-500 blur-3xl opacity-20 rounded-full"></div>

        <img
          src={rolex}
          alt="rolex"
          className="relative w-[500px] drop-shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-105 transition duration-500"
        />
      </div>
    </div>
  );
};

export default Hero;