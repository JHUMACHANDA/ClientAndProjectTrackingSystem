import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../assets/services/projectService";

const STATUS_STYLES = {
  Pending: {
    badge: "text-[#fcd34d]",
    badgeBg: "rgba(245,158,11,0.15)",
    badgeBorder: "rgba(245,158,11,0.3)",
    dot: "#fcd34d",
    icon: "⏳",
  },
  Ongoing: {
    badge: "text-[#93c5fd]",
    badgeBg: "rgba(59,130,246,0.15)",
    badgeBorder: "rgba(59,130,246,0.3)",
    dot: "#93c5fd",
    icon: "🚀",
  },
  Completed: {
    badge: "text-[#6ee7b7]",
    badgeBg: "rgba(16,185,129,0.15)",
    badgeBorder: "rgba(16,185,129,0.3)",
    dot: "#6ee7b7",
    icon: "✅",
  },
};

const FILTERS = ["All", "Pending", "Ongoing", "Completed"];

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  // Form State
  const [newProject, setNewProject] = useState({
    name: "",
    clientName: "",
    status: "Pending",
    deadline: "",
  });

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching projects", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
    fetchProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.clientName) {
      return alert("Please fill Project and Client name");
    }
    try {
      await projectService.createProject(newProject);
      setNewProject({ name: "", clientName: "", status: "Pending", deadline: "" });
      fetchProjects();
    } catch (error) {
      console.error("Error adding project", error);
    }
  };

  const counts = {
    All: projects.length,
    Pending: projects.filter((p) => p.status === "Pending").length,
    Ongoing: projects.filter((p) => p.status === "Ongoing").length,
    Completed: projects.filter((p) => p.status === "Completed").length,
  };

  const filtered = (filter === "All" ? projects : projects.filter((p) => p.status === filter))
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()) || p.clientName?.toLowerCase().includes(search.toLowerCase()));

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background: "linear-gradient(150deg, #064e3b 0%, #065f46 25%, #0c4a6e 55%, #1e1b4b 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        .prj-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 44px 44px; }
        .prj-navbar { position: sticky; top: 0; z-index: 20; background: rgba(6,78,59,0.7); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.1); animation: slideDown 0.5s ease both; }
        .prj-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 18px; backdrop-filter: blur(10px); transition: all 0.25s ease; }
        .prj-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; color: white; font-size: 13px; outline: none; transition: 0.2s; width: 100%; }
        .prj-input:focus { border-color: #10b981; background: rgba(255,255,255,0.1); }
        .prj-btn-primary { background: linear-gradient(135deg,#10b981,#059669); color: white; font-weight: 700; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; transition: 0.2s; font-size: 13px; white-space: nowrap; }
        .prj-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .prj-stat-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 16px; text-align: center; min-width: 85px; animation: fadeUp 0.5s ease both; }
        .prj-filter-wrap { display: flex; gap: 4px; border-radius: 12px; padding: 4px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); width: fit-content; }
        .prj-filter-btn { padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
        .prj-filter-active { background: linear-gradient(135deg,#059669,#0ea5e9); color: #fff; }
        .prj-filter-inactive { background: transparent; color: rgba(255,255,255,0.45); }
        .prj-search { padding: 10px 18px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.08); color: #fff; font-size: 13px; width: 220px; outline: none; }
        .prj-table { width: 100%; border-collapse: collapse; }
        .prj-th { text-align: left; padding: 14px 16px; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.5px; background: rgba(0,0,0,0.2); }
        .prj-td { padding: 15px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); font-size: 13px; }
        .prj-row:hover { background: rgba(255,255,255,0.04); }
      `}</style>

      <div className="prj-grid" />

      {/* NAVBAR */}
      <nav className="prj-navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#059669,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>TrackProject</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '13px' }} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '13px' }} onClick={() => navigate("/clients")}>Clients</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 48px", position: "relative", zIndex: 10 }}>
        
        {/* STATS SECTION */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, animation: "fadeUp 0.5s ease both" }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              Project <span style={{ color: "#6ee7b7" }}>Management</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>Create and manage project workflows efficiently.</p>
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            {FILTERS.map((f) => (
              <div key={f} className="prj-stat-card">
                <div style={{ color: f === 'Pending' ? '#fcd34d' : f === 'Ongoing' ? '#93c5fd' : f === 'Completed' ? '#6ee7b7' : '#fff', fontSize: 22, fontWeight: 800 }}>
                  {counts[f]}
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, marginTop: 4 }}>{f === 'Completed' ? 'Done' : f}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD PROJECT FORM SECTION */}
        <div className="prj-card" style={{ padding: "24px", marginBottom: "32px", animation: "fadeUp 0.5s ease both" }}>
          <h3 style={{ color: "white", fontSize: "14px", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#10b981" }}>+</span> Add New Project
          </h3>
          <form onSubmit={handleAddProject} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr auto", gap: "12px", alignItems: "end" }}>
            <div>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 700, display: "block", marginBottom: "6px" }}>PROJECT NAME</label>
              <input className="prj-input" placeholder="E.g. Website UI" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} />
            </div>
            <div>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 700, display: "block", marginBottom: "6px" }}>CLIENT NAME</label>
              <input className="prj-input" placeholder="Client name" value={newProject.clientName} onChange={(e) => setNewProject({...newProject, clientName: e.target.value})} />
            </div>
            <div>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 700, display: "block", marginBottom: "6px" }}>DEADLINE</label>
              <input type="date" className="prj-input" value={newProject.deadline} onChange={(e) => setNewProject({...newProject, deadline: e.target.value})} />
            </div>
            <div>
              <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 700, display: "block", marginBottom: "6px" }}>STATUS</label>
              <select className="prj-input" style={{ background: "#064e3b", cursor: "pointer" }} value={newProject.status} onChange={(e) => setNewProject({...newProject, status: e.target.value})}>
                {Object.keys(STATUS_STYLES).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button type="submit" className="prj-btn-primary">Add Project</button>
          </form>
        </div>

        {/* TABLE HEADER: FILTERS + SEARCH */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="prj-filter-wrap">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`prj-filter-btn ${filter === f ? "prj-filter-active" : "prj-filter-inactive"}`}>
                {f}
              </button>
            ))}
          </div>
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="prj-search" />
        </div>

        {/* PROJECT TABLE */}
        <div className="prj-card" style={{ overflow: "hidden" }}>
          <table className="prj-table">
            <thead>
              <tr>
                <th className="prj-th">Project Name</th>
                <th className="prj-th">Client</th>
                <th className="prj-th">Deadline</th>
                <th className="prj-th">Status</th>
               
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((project, idx) => {
                  const s = STATUS_STYLES[project.status] || STATUS_STYLES.Pending;
                  return (
                    <tr key={project._id || idx} className="prj-row">
                      <td className="prj-td">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, boxShadow: `0 0 8px ${s.dot}` }} />
                          <span style={{ color: "#fff", fontWeight: 600 }}>{project.name}</span>
                        </div>
                      </td>
                      <td className="prj-td" style={{ color: "rgba(255,255,255,0.5)" }}>{project.clientName}</td>
                      <td className="prj-td" style={{ color: "rgba(255,255,255,0.45)" }}>{formatDate(project.deadline)}</td>
                      <td className="prj-td">
                        <span style={{ background: s.badgeBg, border: `1px solid ${s.badgeBorder}`, color: s.dot, padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          {s.icon} {project.status}
                        </span>
                      </td>
                      
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: "60px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: '14px' }}>
                    No projects found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;