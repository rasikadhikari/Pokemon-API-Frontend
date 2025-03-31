import React, { useContext } from "react";
import image from "../Image/LOGO.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    context?.changeAuth("");
    navigate("/login");
  };

  return (
    <header>
      <nav className="bg-white border-grey-200 px-4 lg:px-6 py-2 dark:bg-gray-800 shadow flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={image} alt="LOGO" className="w-9 h-auto animate-bounce" />
        </Link>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          {context?.auth?.token ? (
            <button
              onClick={handleLogout}
              className="h-9 w-24 bg-red-600 text-white font-semibold rounded-lg drop-shadow-2xl m-2 flex items-center justify-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="h-9 w-16 bg-green-600 text-white font-semibold rounded-lg drop-shadow-2xl m-2 flex items-center justify-center"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="h-9 w-16 bg-green-600 text-white font-semibold rounded-lg drop-shadow-2xl m-2 flex items-center justify-center"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
