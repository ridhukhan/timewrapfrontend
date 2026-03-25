import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("HOME");

  const items = ["HOME", "MENS WATCH", "LEDIS WATCH", "CONTACT"];

  return (
    <div className="main  bg-black h-10 shadow-4px-10px-15px-#555">
      <nav>
        <ul className="text-white flex gap-7 justify-center cursor-pointer">
          {items.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`navber ${active === item ? "active" : ""}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;