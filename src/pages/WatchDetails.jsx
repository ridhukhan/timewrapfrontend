import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import RolexData from "../assets/Rolex.json";
import CasioData from "../assets/Casio.json";
import OlevsData from "../assets/Olevs.json";

const WatchDetails = () => {
  const { id } = useParams();

  const allProducts = useMemo(() => {
    return [...RolexData, ...CasioData, ...OlevsData];
  }, []);

  const product = allProducts.find((item) => item.id == id);

  const [quantity, setQuantity] = useState(1);
  const [bigImg, setBigImg] = useState(product?.img || "");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-16">
        <p className="text-zinc-400 text-lg">Product not found</p>
      </div>
    );
  }

  const handleform = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://api.spaytimes.xyz/user/order",
        {
          customername: name,
          phone,
          adress,
          price: product.price,
          quantity,
          watchname: product.name,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Order confirm success");
      setName("");
      setPhone("");
      setAdress("");
      setQuantity(1);
    } catch (error) {
      toast.error("Order failed");
      console.log(error);
    }
  };

  return (
    <div style={{ paddingTop: "60px" }} className="min-h-screen bg-zinc-950 text-white">
      <div className="bg-gradient-to-r from-sky-900 via-sky-700 to-zinc-900 py-4 px-8 shadow-lg shadow-sky-900/40">
        <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-white drop-shadow">
          {product.name}
        </h1>
        <p className="text-sky-300 text-sm tracking-wider mt-1">Premium Timepiece</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center gap-5 flex-1">
          <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-zinc-700 shadow-2xl shadow-sky-900/20 overflow-hidden flex items-center justify-center p-6">
            <img
              src={bigImg || product.img}
              alt={product.name}
              className="w-full max-w-[250px] h-[250px] object-contain transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {product.img && (
              <img
                onClick={() => setBigImg(product.img)}
                src={product.img}
                alt="watch"
                className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300"
              />
            )}
            {product.img1 && (
              <img
                onClick={() => setBigImg(product.img1)}
                src={product.img1}
                alt="watch1"
                className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300"
              />
            )}
            {product.img2 && (
              <img
                onClick={() => setBigImg(product.img2)}
                src={product.img2}
                alt="watch2"
                className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300"
              />
            )}
            {product.img3 && (
              <img
                onClick={() => setBigImg(product.img3)}
                src={product.img3}
                alt="watch3"
                className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 flex-1 justify-center">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-sky-500/30 rounded-2xl p-5 shadow-xl shadow-sky-900/20">
            <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">Total Price</p>
            <p className="text-4xl font-extrabold text-sky-400 tracking-tight">
              ${(product.price * quantity).toLocaleString()}
            </p>
            <p className="text-zinc-500 text-sm mt-1">
              ${product.price} × {quantity} unit{quantity > 1 ? "s" : ""}
            </p>
          </div>

          <div>
            <p className="text-zinc-400 text-sm uppercase tracking-widest mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-600 text-white text-xl font-bold hover:bg-red-500/80 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 active:scale-95"
              >
                −
              </button>

              <span className="w-12 text-center text-2xl font-bold text-white bg-zinc-800 border border-zinc-600 rounded-xl py-2">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity >= 5 ? 5 : quantity + 1)}
                className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-600 text-white text-xl font-bold hover:bg-green-500/80 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 active:scale-95"
              >
                +
              </button>

              <span className="text-zinc-500 text-sm">Max: 5</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-xl shadow-sky-900/20 w-full max-w-md mx-auto mt-6">
            <h2 className="text-xl font-bold text-sky-400 tracking-widest uppercase mb-6 text-center">
              📜 Order Information
            </h2>

            <form onSubmit={handleform} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Type your name"
                  className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-5 text-white placeholder-zinc-500 text-sm transition-all duration-200"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="Type your phone number"
                  className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm transition-all duration-200"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">
                  Delivery Address
                </label>
                <textarea
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                  placeholder="Write your full delivery address"
                  rows={3}
                  className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-lg tracking-wider uppercase shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 transition-all duration-300 active:scale-95 mt-2"
              >
                🛒 Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;