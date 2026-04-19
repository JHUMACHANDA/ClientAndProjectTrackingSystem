import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clientImg from "../assets/client.png";

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // ১. টোকেন সহ হেডার কনফিগ তৈরি করার ফাংশন
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ২. ক্লায়েন্ট লিস্ট নিয়ে আসা
  const fetchClients = async () => {
    const config = getAuthHeader();
    if (!config) return navigate("/login"); // টোকেন না থাকলে লগইনে পাঠাবে

    try {
      const res = await axios.get("http://localhost:5001/api/clients", config);
      setClients(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  // ৩. ক্লায়েন্ট তৈরি বা আপডেট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = getAuthHeader();
    if (!config) return alert("Please login first");

    const clientData = { name, email };

    try {
      if (editId) {
        // আপডেট (PUT)
        await axios.put(`http://localhost:5001/api/clients/${editId}`, clientData, config);
        setEditId(null);
      } else {
        // তৈরি (POST)
        await axios.post("http://localhost:5001/api/clients", clientData, config);
      }
      
      setName("");
      setEmail("");
      fetchClients(); // ডাটাবেস থেকে ফ্রেশ লিস্ট আনা
      alert(editId ? "Client updated!" : "Client added successfully!");
    } catch (err) {
      console.error("Save Error:", err.response?.data);
      alert(err.response?.data?.message || "Failed to save client.");
    }
  };

  // ৪. ক্লায়েন্ট ডিলিট করা
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/clients/${id}`, getAuthHeader());
      setDeleteConfirm(null);
      fetchClients();
    } catch (err) {
      console.error("Delete Error:", err.response?.data);
    }
  };

  const handleEdit = (client) => {
    setName(client.name);
    setEmail(client.email);
    setEditId(client._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (n) =>
    n ? n.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  const avatarColors = [
    ["rgba(167,139,250,0.3)", "#ddd6fe"],
    ["rgba(192,132,252,0.3)", "#e9d5ff"],
    ["rgba(216,180,254,0.25)", "#f3e8ff"],
    ["rgba(139,92,246,0.3)", "#c4b5fd"],
    ["rgba(217,70,239,0.25)", "#f0abfc"],
  ];

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background: "linear-gradient(150deg, #2b87b1 0%, #3b7cac 22%, #064152 55%, #4d73b9 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimBtn { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }

        .cli-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
        .cli-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .cli-navbar {
          position: sticky; top: 0; z-index: 20;
          background: rgba(59,31,107,0.72);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          animation: slideDown 0.5s ease both;
        }

        .cli-glass-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          animation: fadeUp 0.5s ease both;
        }

        .cli-input {
          width: 100%; padding: 12px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.07);
          color: #fff; font-size: 14px;
          outline: none; transition: all 0.22s;
          font-family: inherit; box-sizing: border-box;
        }
        .cli-input::placeholder { color: rgba(255,255,255,0.3); }
        .cli-input:focus {
          border-color: #a78bfa;
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.2);
        }

        .cli-submit-btn {
          padding: 12px 28px; border-radius: 12px; border: none;
          cursor: pointer; font-size: 14px; font-weight: 700; color: #fff;
          background: linear-gradient(90deg,#67e8f9,#93c5fd,#c4b5fd,#67e8f9);
          background-size: 300% auto; animation: shimBtn 4s linear infinite;
          transition: transform 0.15s, box-shadow 0.15s; font-family: inherit;
          box-shadow: 0 4px 20px rgba(77, 16, 143, 0.35); white-space: nowrap;
        }
        .cli-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(168,85,247,0.48); }
        .cli-submit-btn:active { transform: scale(0.97); }

        .cli-cancel-btn {
          padding: 12px 20px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.6);
          cursor: pointer; font-size: 14px; font-weight: 600;
          transition: all 0.2s; font-family: inherit;
        }
        .cli-cancel-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .cli-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.18s; border-radius: 8px;
          animation: fadeUp 0.4s ease both;
        }
        .cli-row:last-child { border-bottom: none; }
        .cli-row:hover { background: rgba(255,255,255,0.04); }

        .cli-edit-btn {
          font-size: 12px; font-weight: 700; padding: 6px 14px;
          border-radius: 20px; border: 1px solid rgba(251,191,36,0.35);
          background: rgba(251,191,36,0.12); color: #fcd34d;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .cli-edit-btn:hover { background: rgba(251,191,36,0.22); border-color: #fbbf24; }

        .cli-del-btn {
          font-size: 12px; font-weight: 700; padding: 6px 14px;
          border-radius: 20px; border: 1px solid rgba(239,68,68,0.3);
          background: rgba(239,68,68,0.1); color: #fca5a5;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .cli-del-btn:hover { background: rgba(239,68,68,0.22); border-color: #ef4444; }

        .cli-search {
          padding: 10px 18px; border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08); color: #fff;
          font-size: 13px; width: 220px; outline: none;
          transition: all 0.22s; font-family: inherit;
        }
        .cli-search::placeholder { color: rgba(255,255,255,0.35); }
        .cli-search:focus {
          border-color: #a78bfa; background: rgba(255,255,255,0.12);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.2);
        }

        .cli-nav-btn {
          padding: 8px 18px; border-radius: 10px; font-size: 13px; font-weight: 600;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7);
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .cli-nav-btn:hover { background: rgba(255,255,255,0.12); color: #fff; border-color: rgba(255,255,255,0.25); }

        .cli-confirm-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
        }
        .cli-confirm-box {
          background: rgba(59,31,107,0.96);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px; padding: 28px 32px; max-width: 340px; width: 90%;
          animation: scaleIn 0.2s ease both;
        }
      `}</style>

      {/* BG */}
      <div className="cli-grid" />
      <div className="cli-orb" style={{ width: 420, height: 420, top: -110, right: -90, background: "radial-gradient(circle,rgba(167,139,250,0.4) 0%,transparent 70%)", animation: "float 9s ease-in-out infinite" }} />
      <div className="cli-orb" style={{ width: 300, height: 300, bottom: -70, left: -60, background: "radial-gradient(circle,rgba(217,70,239,0.3) 0%,transparent 70%)", animation: "float 12s ease-in-out infinite reverse" }} />
      <div className="cli-orb" style={{ width: 200, height: 200, top: "50%", left: "40%", background: "radial-gradient(circle,rgba(192,132,252,0.22) 0%,transparent 70%)", animation: "float 16s ease-in-out infinite" }} />

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="cli-confirm-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="cli-confirm-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>Delete Client?</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "0 0 24px", lineHeight: 1.55 }}>
              This will permanently remove the client. This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="cli-cancel-btn" style={{ flex: 1 }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.25)", color: "#fca5a5", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="cli-navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>TrackProject</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="cli-nav-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="cli-nav-btn" onClick={() => navigate("/projects")}>Projects</button>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px 48px", position: "relative", zIndex: 10 }}>

        {/* HERO */}
        <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", borderRadius: 20, background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", fontSize: 11, fontWeight: 700, color: "#ddd6fe", marginBottom: 12, letterSpacing: "0.5px" }}>
            👥 CLIENTS
          </div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.4px" }}>
            Manage your <span style={{ color: "#ddd6fe" }}>clients</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, margin: 0 }}>Add, update, or remove client records easily.</p>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* LEFT — illustration + form */}
          <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Illustration */}
            <div className="cli-glass-card" style={{ padding: 0, overflow: "hidden", animationDelay: "0.05s" }}>
              <img src={clientImg} alt="Clients" style={{ width: "100%", maxHeight: 220, objectFit: "cover", display: "block", opacity: 0.85 }} />
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", gap: 16 }}>
                  {[
                    { val: clients.length, label: "Total Clients", color: "#ddd6fe" },
                    { val: Math.round(clients.length * 0.7), label: "Active", color: "#e9d5ff" },
                  ].map(({ val, label, color }) => (
                    <div key={label} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ color, fontSize: 22, fontWeight: 800 }}>{val}</div>
                      <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, fontWeight: 600 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="cli-glass-card" style={{ padding: "24px", animationDelay: "0.1s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: editId ? "rgba(251,191,36,0.2)" : "rgba(167,139,250,0.2)", border: `1px solid ${editId ? "rgba(251,191,36,0.35)" : "rgba(167,139,250,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
                  {editId ? "✏️" : "➕"}
                </div>
                <h2 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>
                  {editId ? "Edit Client" : "Add New Client"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Full Name</label>
                  <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="cli-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Email Address</label>
                  <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="cli-input" />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  {editId && (
                    <button type="button" className="cli-cancel-btn" onClick={() => { setEditId(null); setName(""); setEmail(""); }}>
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="cli-submit-btn" style={{ flex: 1 }}>
                    {editId ? "Update Client →" : "Add Client →"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT — table */}
          <div style={{ flex: "2 1 420px" }}>
            <div className="cli-glass-card" style={{ animationDelay: "0.15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 0" }}>
                <div>
                  <h2 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>All Clients</h2>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>{filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""}</p>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="cli-search"
                />
              </div>

              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr auto", padding: "14px 20px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginTop: 16 }}>
                {["Name", "Email", "Actions"].map((h, i) => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "rgba(255,255,255,0.28)", textAlign: i === 2 ? "right" : "left" }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              <div style={{ padding: "8px 4px" }}>
                {filteredClients.length > 0 ? (
                  filteredClients.map((c, idx) => {
                    const [bg, color] = avatarColors[idx % avatarColors.length];
                    return (
                      <div key={c._id} className="cli-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "2" }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color, flexShrink: 0 }}>
                            {getInitials(c.name)}
                          </div>
                          <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{c.name}</span>
                        </div>
                        <div style={{ flex: "2", color: "rgba(255,255,255,0.45)", fontSize: 13, paddingLeft: 8 }}>{c.email}</div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button className="cli-edit-btn" onClick={() => handleEdit(c)}>Edit</button>
                          <button className="cli-del-btn" onClick={() => setDeleteConfirm(c._id)}>Delete</button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
                    No clients found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;