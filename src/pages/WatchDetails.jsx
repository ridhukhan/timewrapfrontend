import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const WatchDetails = () => {
  const location = useLocation()
  const { item } = location.state
  const [quantity, setQuantity] = useState(1)
  const [bigImg, setBigImg] = useState(item.img)

  return (
    <div style={{ paddingTop: '60px' }} className="min-h-screen bg-zinc-950 text-white">

      {/* top name banner */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-700 to-zinc-900 py-4 px-8 shadow-lg shadow-sky-900/40">
        <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-white drop-shadow">
          {item.name}
        </h1>
        <p className="text-sky-300 text-sm tracking-wider mt-1">Premium Timepiece</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">

        {/* left - images */}
        <div className="flex flex-col items-center gap-5 flex-1">

          {/* big image */}
          <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-zinc-700 shadow-2xl shadow-sky-900/20 overflow-hidden flex items-center justify-center p-6">
            <img
              src={bigImg}
              alt={item.name}
              className="w-full max-w-[250px] h-[250px] object-contain transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* thumbnails */}
          <div className="flex gap-3">
            <img onClick={() => setBigImg(item.img)} src={item.img} alt="watch" className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300" />
            <img onClick={() => setBigImg(item.img1)} src={item.img1} alt="watch1" className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300" />
            <img onClick={() => setBigImg(item.img2)} src={item.img2} alt="watch2" className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300" />
            <img onClick={() => setBigImg(item.img3)} src={item.img3} alt="watch3" className="w-16 h-16 rounded-xl border-2 border-zinc-700 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/50 hover:scale-110 cursor-pointer p-1 bg-zinc-900 object-contain transition-all duration-300" />
          </div>
        </div>

        {/* right - details */}
        <div className="flex flex-col gap-6 flex-1 justify-center">

          {/* price box */}
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-sky-500/30 rounded-2xl p-5 shadow-xl shadow-sky-900/20">
            <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">Total Price</p>
            <p className="text-4xl font-extrabold text-sky-400 tracking-tight">
              ${(item.price * quantity).toLocaleString()}
            </p>
            <p className="text-zinc-500 text-sm mt-1">${item.price} × {quantity} unit{quantity > 1 ? 's' : ''}</p>
          </div>

          {/* quantity */}
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

          {/* buy button */}
          <button className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-lg tracking-wider uppercase shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 transition-all duration-300 active:scale-95">
            🛒 Add to Cart
          </button>

        </div>
      </div>
    </div>
  )
}

export default WatchDetails