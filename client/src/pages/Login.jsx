import React, { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import loginImg from "../assets/login.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 flex items-center justify-center p-6">

      
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        
        <div className="flex justify-between items-center px-10 py-5">
          <h1 className="text-gray-700 font-semibold text-lg">LOGO</h1>

          <div className="flex items-center gap-8 text-gray-600 text-sm">
            <span className="hover:text-black cursor-pointer">Home</span>

            <Link to="/register">
              <button className="bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-pink-600 transition">
                Register
              </button>
            </Link>
          </div>
        </div>

        
        <div className="flex items-center px-12 pb-12">

          {/* LEFT SIDE */}
          <div className="w-1/2">

            <div className="flex flex-col items-center mb-6">
              <div className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow">
                👤
              </div>

              <h2 className="text-xl font-semibold mt-3 text-gray-700">
                User Log in
              </h2>
            </div>

            {loading && <Loader />}

            
            <form
              onSubmit={handleLogin}
              className="space-y-4 w-full max-w-xs mx-auto"
            >

              <input
                type="text"
                placeholder="User Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPassword(e.target.value)}
              />

              
              <button className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition">
                LOGIN
              </button>

            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Forgot{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Password?
              </span>
            </p>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="w-1/2 flex justify-center items-center">
            <img
              src={loginImg}
              alt="login"
              className="w-[300px] object-contain"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;