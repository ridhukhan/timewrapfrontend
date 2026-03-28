import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const items = [
    { name: "HOME", path: "/" },
    { name: "MENS WATCH", path: "/mens" },
    { name: "LADIES WATCH", path: "/ladies" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="bg-black h-12 flex items-center justify-between px-10 fixed w-full top-0 z-50 shadow-[4px_10px_15px_#555]">

      {/* LEFT MENU */}
      <nav>
        <ul className="text-white flex gap-7">
          {items.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50px] after:h-[4px] after:bg-sky-400 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : "after:scale-x-0"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT SIDE */}
      <div className="text-white flex items-center gap-4">

       {user ? (
  <>
    {user.role === "admin" ? (
      <NavLink to="/admin/dashboard" className="text-sky-400 font-semibold hover:text-sky-300 transition">
        📊 Dashboard
      </NavLink>
    ) : (
      <span className="text-sky-400 font-semibold">{user.name}</span>
    )}

    <button onClick={handleLogout} className="text-xl hover:text-red-400 transition">
      🚪
    </button>
  </>
) : (
  <NavLink to="/login" className="text-2xl hover:text-sky-400 transition">
    👤
  </NavLink>
)}

      </div>
    </div>
  );
};

export default Navbar;