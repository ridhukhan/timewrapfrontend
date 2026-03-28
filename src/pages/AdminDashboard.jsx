import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") return navigate("/login");

    axios
      .get("https://timewrapbackend.onrender.com/admin/orders", {
        withCredentials: true, // ✅ VERY IMPORTANT
      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  const handleStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `https://timewrapbackend.onrender.com/admin/orders/${id}`,
        { status },
        {
          withCredentials: true, // ✅ IMPORTANT
        }
      );

      setOrders(orders.map(order =>
        order._id === id ? res.data : order
      ));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // UI same thakbe (no change)
    <div style={{ paddingTop: "60px" }} className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-2xl text-sky-400 mb-6">📦 Orders</h1>

      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        orders.map(order => (
          <div key={order._id}>{order.customername}</div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;