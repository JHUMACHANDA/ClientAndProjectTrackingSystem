import React, { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend login API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Login success → redirect Dashboard
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
    <div className="bg-gray-600 min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleLogin}
        className="bg-white/70 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {loading && <Loader />}

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>

        {/* Register link */}
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 font-semibold">
            Register here
          </Link>
        </p>
      </form>

    </div>
  );
};

export default Login;