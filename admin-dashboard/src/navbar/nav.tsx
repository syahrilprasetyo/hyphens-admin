// Navbar.js
import React from "react";
import logoImage from "../assets/images/logo_hyphens.png"
import dokterImage from "../assets/images/image_dokter.png";


function Navbar() {
  return (
    <nav className="border bg-white shadow-md h-[96px] w-full  px-20 py-6 fixed">
      <div className=" flex flex-row justify-between">
        <div className="flex flex-row  items-center gap-2">
          <img src={logoImage} alt="" className="w-[144px] h-[48px]" />
          <div>Dashboard</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>John Wesley</div>
          <img src={dokterImage} alt="" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
