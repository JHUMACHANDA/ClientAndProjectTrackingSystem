import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    // Logout logic
    console.log("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-6 py-2 rounded-2xl flex items-center transition-all shadow-sm">
      
      {/* 1. Left Section (Empty spacer to balance the middle title) */}
      <div className="flex-1 hidden md:block"></div>

      {/* 2. Middle Section (Dashboard Title) */}
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* 3. Right Section (Logout Button) */}
      <div className="flex-1 flex justify-end">
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md shadow-red-200 transition-all cursor-pointer"
        >
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;