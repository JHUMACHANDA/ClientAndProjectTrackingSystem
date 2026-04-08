import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import axios from "axios";
import { Users, FolderKanban, Search, Inbox } from "lucide-react"; // Icons

const Dashboard = () => {
  const [stats, setStats] = useState({ clients: 0, active: 0, completed: 0 });
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [searchProject, setSearchProject] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setStats(res.data.stats);
      setClients(res.data.clients);
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchClient.toLowerCase())
  );

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchProject.toLowerCase())
  );

  return (
    <div className="flex bg-[#edf3fa] min-h-screen font-sans">
      <Sidebar activePage="dashboard" /> {/* Active page highlight support */}

      <div className="flex-1 p-8">
        <Navbar />

        

        {/* ✅ Updated Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <StatsCard 
            title="Total Clients" 
            value={stats.clients} 
            icon={<Users size={24} />} 
            bgColor="bg-blue-200" 
            iconColor="text-blue-600" 
          />
          <StatsCard 
            title="Active Projects" 
            value={stats.active} 
            icon={<FolderKanban size={24} />} 
            bgColor="bg-emerald-200" 
            iconColor="text-emerald-600" 
          />
          <StatsCard 
            title="Completed Projects" 
            value={stats.completed} 
            icon={<FolderKanban size={24} />} 
            bgColor="bg-purple-200" 
            iconColor="text-purple-600" 
          />
        </div>

        {/* 🔍 Recent Clients Section */}
        <div className="bg-slate-200 mt-10 p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-slate-800">Recent Clients</h2>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search client..."
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all"
              />
            </div>
          </div>

          <div className="overflow-hidden">
            {filteredClients.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredClients.map((c) => (
                  <div key={c._id} className="py-4 px-2 hover:bg-slate-50 transition rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-700">{c.name}</span>
                    <button className="text-blue-600 text-sm font-semibold">Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-10 text-slate-400">
                <Inbox size={48} strokeWidth={1} />
                <p className="mt-2 text-sm font-medium">No client found</p>
              </div>
            )}
          </div>
        </div>

        {/* 🔍 Recent Projects Section */}
        <div className="bg-slate-200 mt-8 p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-slate-800">Recent Projects</h2>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search project..."
                value={searchProject}
                onChange={(e) => setSearchProject(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all"
              />
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <div key={p._id} className="py-4 px-2 hover:bg-slate-50 transition rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-700">{p.title}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{p.status}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-10 text-slate-400">
              <Inbox size={48} strokeWidth={1} />
              <p className="mt-2 text-sm font-medium">No project found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;