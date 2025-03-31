import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/auth";
import { AuthContext } from "../context/AuthContext";
import pokemon from "../Image/pokemons/025.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (formData: { email: string; password: string }) => {
    console.log("Form Data Submitted:", formData);

    const [error, data] = await loginUser(formData);

    if (error) {
      setLoginError(error.message);
      toast.error("Login failed: " + error.message);
    } else {
      setLoginError(null);
      if (data && data.token) {
        localStorage.setItem("token", data.token);

        if (authContext) {
          authContext.changeAuth(data.token);
        }

        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pokemon-yellow to-pokemon-blue">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src={pokemon} alt="Pokemon Logo" className="w-20 h-20" />
          <h1 className="text-3xl font-bold text-pokemon-blue">Login</h1>
        </div>
        {loginError && <p className="text-red-500 text-center">{loginError}</p>}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-pokemon-blue focus:border-pokemon-blue"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-pokemon-blue focus:border-pokemon-blue"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pokemon-yellow text-pokemon-blue font-bold rounded-md hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300"
          >
            Login
          </button>
        </form>
        <Link
          to="/signup"
          className="text-center mt-4 text-sm text-pokemon-blue hover:underline cursor-pointer"
        >
          Don’t have an account? Click Here
        </Link>
      </div>
    </div>
  );
}

export default Login;
