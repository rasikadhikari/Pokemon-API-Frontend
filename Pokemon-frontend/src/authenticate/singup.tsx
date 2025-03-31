import React from "react";
import pokemon from "../Image/pokemons/025.png";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pokemon-yellow to-pokemon-blue">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src={pokemon} alt="Pokemon Logo" className="w-20 h-20" />
          <h1 className="text-3xl font-bold text-pokemon-blue">Sign up</h1>
        </div>

        {/* Form */}
        <h2 className="text-2xl font-semibold text-center text-pokemon-blue mb-4"></h2>

        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-pokemon-blue focus:border-pokemon-blue"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-pokemon-blue focus:border-pokemon-blue"
            />
          </div>

          {/* Username Field (Sign Up Only) */}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-pokemon-blue focus:border-pokemon-blue"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pokemon-yellow text-pokemon-blue font-bold rounded-md hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300"
          >
            Register
          </button>
        </form>

        {/* Toggle Link */}
        <Link
          to="/login"
          className="text-center mt-4 text-sm text-pokemon-blue hover:underline cursor-pointer"
        >
          Already have a account? Click here
        </Link>
      </div>
    </div>
  );
}

export default Signup;
