import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-gray-400 to-indigo-400 flex items-center justify-center">
      
      <div className="bg-purple-50/70 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center max-w-md w-full border border-purple-200">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
  Welcome To
</h1>

<h2 className="text-2xl font-semibold text-black mb-4">
  Client & Project Tracking System
</h2>

<p className="text-gray-800 mb-6">
  Easily manage your clients and track project progress in one place.
</p>
        <div className="flex flex-col gap-4">
          
          <Link to="/login">
           <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-500 transition duration-300 shadow-sm">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-500 transition duration-300 shadow-sm">
              Register
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Home;