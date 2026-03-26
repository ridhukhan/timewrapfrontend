import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const items = [
    { name: "HOME", path: "/" },
    { name: "MENS WATCH", path: "/mens" },
    { name: "LADIES WATCH", path: "/ladies" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="bg-black h-12 flex items-center justify-center fixed w-full top-0 z-50 shadow-[4px_10px_15px_#555]">
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
    </div>
  );
};

export default Navbar;