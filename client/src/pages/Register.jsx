import React, { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-blue-200 min-h-screen flex justify-center items-center">
      
      <form
        onSubmit={handleRegister}
        className="bg-white/50 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {loading && <Loader />}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded">
          Register
        </button>

        {/* Login link */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>

    </div>
  );
};

export default Register;