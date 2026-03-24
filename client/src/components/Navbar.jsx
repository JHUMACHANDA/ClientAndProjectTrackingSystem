const Navbar = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button className="bg-red-500 text-white hover:bg-slate-500 px-4 py-1 rounded">
        Logout
      </button>
    </div>
  );
};

export default Navbar;