import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import axios from "axios";
import { Users, FolderKanban } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({ clients: 0, active: 0, completed: 0, pending: 0 });
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [searchProject, setSearchProject] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://clientandprojecttrackingsystem.onrender.com/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log("Dashboard Data:", res.data); 
    const data = res.data;
    setStats(res.data.stats);
    setClients(res.data.clients || []); 
    setProjects(res.data.projects || []);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

  const filteredClients = clients.filter((c) =>
    c.name?.toLowerCase().includes(searchClient.toLowerCase())
  );

  const filteredProjects = projects.filter((p) =>
    p.name?.toLowerCase().includes(searchProject.toLowerCase())
  );

 return (
    <div
      className="flex min-h-screen font-sans"
      style={{
        background: "linear-gradient(150deg, #1e2a4a 0%, #2d3a6b 28%, #1a2550 60%, #141e3d 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimBtn { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(99,102,241,0.4)} 70%{box-shadow:0 0 0 8px rgba(99,102,241,0)} 100%{box-shadow:0 0 0 0 rgba(99,102,241,0)} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }

        .dash-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .dash-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
          z-index: 0;
          pointer-events: none;
        }

        .dash-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 18px;
          padding: 24px;
          backdrop-filter: blur(10px);
          transition: all 0.25s ease;
          animation: fadeUp 0.5s ease both;
        }
        .dash-card:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .dash-search {
          padding: 10px 18px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-size: 13px;
          width: 220px;
          outline: none;
          font-family: inherit;
          transition: all 0.22s;
          backdrop-filter: blur(6px);
        }
        .dash-search::placeholder { color: rgba(255,255,255,0.4); }
        .dash-search:focus {
          border-color: #818cf8;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
        }

        .dash-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: background 0.18s;
          border-radius: 8px;
          padding-left: 8px;
          padding-right: 8px;
        }
        .dash-row:last-child { border-bottom: none; }
        .dash-row:hover { background: rgba(255,255,255,0.05); }

        .dash-detail-btn {
          font-size: 12px;
          font-weight: 600;
          color: #a5b4fc;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.35);
          padding: 5px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .dash-detail-btn:hover {
          background: rgba(99,102,241,0.28);
          border-color: #818cf8;
          color: #c7d2fe;
        }

        .dash-badge-active {
          background: rgba(99,102,241,0.2);
          color: #a5b4fc;
          border: 1px solid rgba(99,102,241,0.4);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.3px;
        }
        .dash-badge-inactive {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .stat-card {
          border-radius: 18px;
          padding: 22px 24px;
          border: 1px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(10px);
          transition: all 0.25s ease;
          animation: fadeUp 0.5s ease both;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 100px; height: 100px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }
        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.22);
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.2px;
        }

        .empty-state {
          text-align: center;
          padding: 28px 0;
          color: rgba(255,255,255,0.3);
          font-size: 13px;
        }
      `}</style>

      {/* Background orbs */}
      <div className="dash-grid" />
      <div className="dash-orb" style={{ width: 420, height: 420, top: -130, right: -100, background: "radial-gradient(circle,rgba(99,102,241,0.38) 0%,transparent 70%)", animation: "float 9s ease-in-out infinite" }} />
      <div className="dash-orb" style={{ width: 320, height: 320, bottom: -90, left: -70, background: "radial-gradient(circle,rgba(59,130,246,0.32) 0%,transparent 70%)", animation: "float 12s ease-in-out infinite reverse" }} />
      <div className="dash-orb" style={{ width: 220, height: 220, top: "40%", left: "30%", background: "radial-gradient(circle,rgba(147,197,253,0.18) 0%,transparent 70%)", animation: "float 15s ease-in-out infinite" }} />

      {/* Sidebar */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Sidebar activePage="dashboard" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8" style={{ position: "relative", zIndex: 10 }}>
        <Navbar />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Total Clients */}
          <div className="stat-card" style={{ background: "rgba(59,130,246,0.18)", animationDelay: "0s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>Total Clients</p>
                <p style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: "-1px" }}>{stats.clients}</p>
              </div>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(59,130,246,0.3)", border: "1px solid rgba(59,130,246,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={22} color="#93c5fd" />
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "12px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700 }}>↑ Active</span> this month
            </p>
          </div>

          {/* Active Projects */}
          <div className="stat-card" style={{ background: "rgba(99,102,241,0.18)", animationDelay: "0.1s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>Active Projects</p>
                <p style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: "-1px" }}>{stats.active}</p>
              </div>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(99,102,241,0.3)", border: "1px solid rgba(99,102,241,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FolderKanban size={22} color="#a5b4fc" />
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "12px 0 0" }}>
              <span style={{ color: "#a5b4fc", fontSize: 11, fontWeight: 700 }}>In progress</span> right now
            </p>
          </div>
 {/* Pending Projects */}
<div className="stat-card" style={{ background: "rgba(234,179,8,0.15)", animationDelay: "0.3s" }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
    <div>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>Pending Projects</p>
      <p style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: "-1px" }}>{stats.pending}</p>
    </div>
    <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(234,179,8,0.25)", border: "1px solid rgba(234,179,8,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FolderKanban size={22} color="#fde047" />
    </div>
  </div>
  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "12px 0 0" }}>
    <span style={{ color: "#fde047", fontSize: 11, fontWeight: 700 }}>Waiting</span> to start
  </p>
</div>
          {/* Completed Projects */}
          <div className="stat-card" style={{ background: "rgba(147,197,253,0.12)", animationDelay: "0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 8px" }}>Completed Projects</p>
                <p style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: "-1px" }}>{stats.completed}</p>
              </div>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(147,197,253,0.2)", border: "1px solid rgba(147,197,253,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FolderKanban size={22} color="#bae6fd" />
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "12px 0 0" }}>
              <span style={{ color: "#bae6fd", fontSize: 11, fontWeight: 700 }}>Delivered</span> successfully
            </p>
          </div>
        </div>

        {/* Clients Section */}
        <div className="dash-card mt-10" style={{ animationDelay: "0.3s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 className="section-title">Recent Clients</h2>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "4px 0 0" }}>{filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} found</p>
            </div>
            <input
              type="text"
              placeholder="Search client..."
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
              className="dash-search"
            />
          </div>

          <div>
            {filteredClients.length > 0 ? (
              filteredClients.map((c) => (
                <div key={c._id} className="dash-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,rgba(99,102,241,0.4),rgba(59,130,246,0.35))", border: "1px solid rgba(255,255,255,0.13)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#c7d2fe" }}>
                      {c.name?.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>{c.name}</span>
                  </div>
                  <button className="dash-detail-btn">Details</button>
                </div>
              ))
            ) : (
              <div className="empty-state">No clients found</div>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="dash-card mt-6" style={{ animationDelay: "0.4s", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 className="section-title">Recent Projects</h2>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "4px 0 0" }}>{filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found</p>
            </div>
            <input
              type="text"
              placeholder="Search project..."
              value={searchProject}
              onChange={(e) => setSearchProject(e.target.value)}
              className="dash-search"
            />
          </div>

          <div>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => (
                <div key={p._id} className="dash-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: p.status === "Ongoing" ? "rgba(99,102,241,0.28)" : "rgba(255,255,255,0.06)", border: `1px solid ${p.status === "Ongoing" ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
  {p.status === "Ongoing" ? "🚀" : "✅"}
</div>
                    <div>
                      <p style={{ fontWeight: 600, color: "#fff", fontSize: 14, margin: 0 }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", margin: "2px 0 0", textTransform: "capitalize" }}>{p.clientName} • {p.status}</p>
                    </div>
                  </div>
                  <span className={p.status === "Ongoing" ? "dash-badge-active" : "dash-badge-inactive"}>
                    {p.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-state">No projects found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;