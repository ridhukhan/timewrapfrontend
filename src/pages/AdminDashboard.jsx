import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // 📦 Fetch Orders
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      return navigate("/login");
    }

    axios
      .get("https://api.spaytimes.xyz/admin/orders", {
        withCredentials: true, // ✅ cookie send
      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  // 🔄 Update Order Status
  const handleStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `https://api.spaytimes.xyz/admin/orders/${id}`,
        { status },
        {
          withCredentials: true, // ✅ cookie send
        }
      );

      // UI update instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? res.data : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ paddingTop: "60px" }}
      className="min-h-screen bg-zinc-950 text-white p-6"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-sky-400 uppercase tracking-widest">
          📦 Order Dashboard
        </h1>
      </div>

      {/* NO DATA */}
      {orders.length === 0 ? (
        <p className="text-zinc-500 text-center mt-20 text-lg">
          No orders yet!
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-zinc-700">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-zinc-800 text-zinc-400 uppercase tracking-widest">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Watch</th>
                <th className="px-4 py-3 text-left">Qty</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={order._id}
                  className={`border-t border-zinc-800 ${
                    i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"
                  }`}
                >
                  <td className="px-4 py-3 text-zinc-500">{i + 1}</td>
                  <td className="px-4 py-3">{order.customername}</td>
                  <td className="px-4 py-3">{order.phone}</td>
                  <td className="px-4 py-3">{order.adress}</td>
                  <td className="px-4 py-3 text-sky-400 font-semibold">
                    {order.watchname}
                  </td>
                  <td className="px-4 py-3">{order.quantity}</td>
                  <td className="px-4 py-3 text-green-400 font-bold">
                    ${order.price}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* STATUS BUTTONS */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">

                      <button
                        onClick={() => handleStatus(order._id, "pending")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          order.status === "pending"
                            ? "bg-yellow-400 text-black"
                            : "bg-zinc-700 hover:bg-yellow-400 hover:text-black"
                        }`}
                      >
                        Pending
                      </button>

                      <button
                        onClick={() => handleStatus(order._id, "delivered")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          order.status === "delivered"
                            ? "bg-green-500 text-black"
                            : "bg-zinc-700 hover:bg-green-500 hover:text-black"
                        }`}
                      >
                        Delivered
                      </button>

                      <button
                        onClick={() => handleStatus(order._id, "return")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          order.status === "return"
                            ? "bg-red-500 text-white"
                            : "bg-zinc-700 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        Return
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;