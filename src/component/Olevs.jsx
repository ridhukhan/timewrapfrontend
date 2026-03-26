import React from "react";
import Data from "../assets/Olevs.json";

const Olevs = () => {
  return (
    <div className="border mt-28 border-gray-700 rounded-xl p-5 bg-black ">

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">

        {Data.map((item) => (
          <div
            key={item.id}
            className="min-w-[220px] bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-sky-500/30 hover:scale-105 transition duration-300 "  >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-[180px] object-contain mb-4"
            />

            <div className="space-y-2">
              <h2 className="text-white text-lg font-semibold">
                {item.name}
              </h2>

              <h3 className="text-sky-400 text-md font-bold">
                ${item.price}
              </h3>

              <button className="w-full mt-3 py-2 border border-sky-400 text-sky-400 rounded-lg hover:bg-sky-400 hover:text-black transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Olevs;