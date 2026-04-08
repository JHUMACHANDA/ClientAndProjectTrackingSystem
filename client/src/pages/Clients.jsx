import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clientImg from "../assets/client.png"; // adjust path relative to this file
const Clients = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await axios.get("http://localhost:5000/api/clients");
    setClients(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/clients/${editId}`, { name, email });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/clients", { name, email });
      }
      setName("");
      setEmail("");
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/clients/${id}`);
    fetchClients();
  };

  const handleEdit = (client) => {
    setName(client.name);
    setEmail(client.email);
    setEditId(client._id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-400">
{/* NAVBAR */}
<nav className="bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-100 flex justify-center items-center relative py-6 min-h-[60px]">
  
  {/* TITLE - Perfect center using absolute positioning */}
  <div className="text-2xl font-extrabold text-slate-800 absolute left-1/2 -translate-x-1/2">
    Clients
  </div>

  {/* NAVBAR MENU (Right side) */}
  <ul className="flex space-x-8 text-red-600 font-semibold absolute right-8">
    <li
      onClick={() => navigate("/dashboard")}
      className="cursor-pointer hover:text-red-800 transition-colors duration-200 text-sm uppercase tracking-wide"
    >
      Dashboard
    </li>
    <li
      onClick={() => navigate("/projects")}
      className="cursor-pointer hover:text-red-800 transition-colors duration-200 text-sm uppercase tracking-wide"
    >
      Projects
    </li>
  </ul>
</nav>

      <div className="flex flex-1 p-6 gap-6 items-start md:items-center">
  {/* LEFT IMAGE */}
  <div className="hidden md:block md:w-1/3 flex justify-center">
    <img
      src={clientImg}
      alt="Clients Illustration"
      className="w-full max-h-[500px] rounded shadow object-cover"
    />
  </div>


        {/* RIGHT CONTENT */}
        <div className="flex-1 flex flex-col gap-8">

          {/* FORM */}
          <div className="bg-white p-5 rounded-xl shadow w-full md:w-3/4 mx-auto">
            <h2 className="text-lg font-bold mb-4">
              {editId ? "Edit Client" : "Add Client"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Client Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />

              <input
                type="email"
                placeholder="Client Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />

              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {editId ? "Update" : "Add"}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div className="bg-white p-5 rounded-xl shadow w-full md:w-3/4 mx-auto overflow-x-auto">
            <h2 className="text-lg font-bold mb-4">All Clients</h2>

            <table className="w-full border min-w-[500px]">
              <thead>
                <tr className="bg-gray-300">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((c) => (
                  <tr key={c._id} className="border-t">
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.email}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(c._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Clients;