import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCartShopping,
  faMessage,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // Remove other localStorage items if necessary
    navigate("/Login");
  };

  return (
    <div className="bg-white w-[308px] flex flex-col fixed z-0 h-full">
      <div className="mt-32 px-10">
        <ul>
          {role === "admin" && (
            <>
              <li
                className={`h-[62px] w-[228px] p-4 rounded-lg ${
                  location.pathname === "/Product" ? "bg-[#F1F7FF]" : ""
                }`}>
                <Link
                  to="/Product"
                  className={`text-xl font-bold flex items-center ${
                    location.pathname === "/Product"
                      ? "text-[#1271FF]"
                      : "text-black"
                  }`}>
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Products
                </Link>
              </li>
              <li
                className={`h-[62px] w-[228px] p-4 rounded-lg ${
                  location.pathname === "/Order" ? "bg-[#F1F7FF]" : ""
                }`}>
                <Link
                  to="/Order"
                  className={`text-xl font-bold flex items-center ${
                    location.pathname === "/Order"
                      ? "text-[#1271FF]"
                      : "text-black"
                  }`}>
                  <FontAwesomeIcon icon={faArchive} className="mr-2" />
                  Order
                </Link>
              </li>

              <li
                className={`h-[62px] w-[228px] p-4 rounded-lg ${
                  location.pathname === "/Dokter" ? "bg-[#F1F7FF]" : ""
                }`}>
                <Link
                  to="/Dokter"
                  className={`text-xl font-bold flex items-center ${
                    location.pathname === "/Dokter"
                      ? "text-[#1271FF]"
                      : "text-black"
                  }`}>
                  <FontAwesomeIcon icon={faArchive} className="mr-2" />
                  Dokter
                </Link>
              </li>
            </>
          )}

          {role === "dokter" && (
            <li
              className={`h-[62px] w-[228px] p-4 rounded-lg ${
                location.pathname === "/Messages" ? "bg-[#F1F7FF]" : ""
              }`}>
              <Link
                to="/Messages"
                className={`text-xl font-bold flex items-center ${
                  location.pathname === "/Messages"
                    ? "text-[#1271FF]"
                    : "text-black"
                }`}>
                <FontAwesomeIcon icon={faMessage} className="mr-2" />
                Messages
              </Link>
            </li>
          )}

          {/* Add more sidebar links as needed */}
        </ul>
      </div>
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="text-xl font-bold text-red-600 flex items-center w-full">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
