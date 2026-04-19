import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const steps = ["Account", "Details", "Done"];

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  // ── সঠীক হ্যান্ডেল রেজিস্টার ফাংশন ──────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to terms");
      return;
    }
    setLoading(true);
    try {
     
      const response = await axios.post("http://localhost:5001/api/auth/register", {
        fullName,
        username,
        email,
        password,
      });

      if (response.data.success) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColor = ["#e5e7eb", "#ef4444", "#f59e0b", "#10b981"][strength];
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];

 return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes slideRight2 { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideLeft2 { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimBtn2 { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes fadeUp2 { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin2 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }

        .rp-right {
          flex: 1; position: relative; overflow: hidden;
          background: linear-gradient(150deg, #064e3b 0%, #065f46 25%, #0c4a6e 55%, #1e1b4b 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          animation: slideRight2 0.7s ease both;
        }
        .rp-left {
          width: 500px; background: #fff;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 44px 48px; position: relative;
          animation: slideLeft2 0.7s ease both;
          overflow-y: auto;
        }
        .orb2 { position: absolute; border-radius: 50%; pointer-events: none; }
        .grid-bg2 {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* Steps */
        .step-dot { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; transition:all 0.3s; }
        .step-line { flex:1; height:2px; background:rgba(255,255,255,0.15); }

        /* Info cards on right */
        .info-card {
          width: 260px; padding: 16px 20px; border-radius: 14px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 12px; transition: all 0.25s; cursor: default;
        }
        .info-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }

        /* Form */
        .ri { width:100%; padding:12px 16px 12px 44px; border-radius:11px; border:1.5px solid #e5e7eb; background:#f9fafb; color:#111; font-size:14px; outline:none; transition:all 0.22s; box-sizing:border-box; font-family:inherit; }
        .ri::placeholder { color:#d1d5db; }
        .ri:focus { border-color:#10b981; background:#fff; box-shadow:0 0 0 4px rgba(16,185,129,0.1); }
        .ri-wrap { position:relative; }
        .ri-ico { position:absolute; left:13px; top:50%; transform:translateY(-50%); font-size:16px; pointer-events:none; }
        .ri-eye { position:absolute; right:13px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#9ca3af; font-size:15px; padding:0; transition:color 0.2s; }
        .ri-eye:hover { color:#10b981; }

        .rl { display:block; font-size:11px; font-weight:700; color:#9ca3af; margin-bottom:6px; letter-spacing:0.5px; text-transform:uppercase; }

        .reg-btn { width:100%; padding:14px; border-radius:12px; border:none; cursor:pointer; font-size:15px; font-weight:700; color:#fff; background:linear-gradient(90deg,#059669,#10b981,#0ea5e9,#059669); background-size:300% auto; animation:shimBtn2 4s linear infinite; transition:transform 0.15s,box-shadow 0.15s; box-shadow:0 4px 20px rgba(16,185,129,0.35); font-family:inherit; letter-spacing:0.3px; }
        .reg-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(16,185,129,0.45); }
        .reg-btn:active { transform:scale(0.98); }

        .sec2 { display:block; width:100%; padding:13px; border-radius:12px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; font-size:14px; font-weight:600; text-align:center; text-decoration:none; transition:all 0.2s; box-sizing:border-box; }
        .sec2:hover { border-color:#10b981; color:#10b981; background:#ecfdf5; }

        .divline2 { display:flex; align-items:center; gap:10px; margin:16px 0; width:100%; }
        .divline2::before,.divline2::after { content:''; flex:1; height:1px; background:#e5e7eb; }

        .tnl2 { font-size:12px; color:rgba(255,255,255,0.55); text-decoration:none; padding:5px 14px; border-radius:16px; border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.055); transition:all 0.2s; }
        .tnl2:hover { color:#fff; background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.25); }
        .tnl2-login { color:#6ee7b7; border-color:rgba(16,185,129,0.4); background:rgba(16,185,129,0.1); }
        .tnl2-login:hover { color:#a7f3d0; background:rgba(16,185,129,0.18); }

        .rtnl2 { font-size:12px; color:#9ca3af; text-decoration:none; padding:5px 12px; border-radius:16px; border:1px solid #e5e7eb; transition:all 0.2s; }
        .rtnl2:hover { color:#10b981; border-color:#6ee7b7; background:#ecfdf5; }
        .rtnl2-login { color:#10b981; background:#ecfdf5; border-color:#6ee7b7; }
        .pill2 { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:20px; background:#ecfdf5; border:1px solid #6ee7b7; font-size:11px; color:#059669; font-weight:700; margin-bottom:14px; }
      `}</style>

      {/* ═══ LEFT — Form Panel ═══ */}
      <div className="rp-left">
        {/* Top nav */}

        <div style={{ width: "100%", maxWidth: 380 }}>
          {/* Heading */}
          <div style={{ marginBottom: 24 }}>
            <div className="pill2"><span></span><span>CREATE ACCOUNT</span></div>
            <h2 style={{ color: "#111827", fontSize: 22, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.3px" }}>Join TrackProject today</h2>
            <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>Free forever for small teams · No credit card needed</p>
          </div>

          {loading && <Loader />}

          {/* Two-column grid for name + username */}
          <form onSubmit={handleRegister}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label className="rl">Full Name</label>
                <div className="ri-wrap">
                  <span className="ri-ico">👤</span>
                  <input type="text" placeholder="John Doe" onChange={e => setFullName(e.target.value)} required className="ri" />
                </div>
              </div>
              <div>
                <label className="rl">Username</label>
                <div className="ri-wrap">
                  <span className="ri-ico">🏷️</span>
                  <input type="text" placeholder="johndoe" onChange={e => setUsername(e.target.value)} required className="ri" />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="rl">Email Address</label>
              <div className="ri-wrap">
                <span className="ri-ico">✉️</span>
                <input type="email" placeholder="john@example.com" onChange={e => setEmail(e.target.value)} required className="ri" />
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label className="rl">Password</label>
              <div className="ri-wrap">
                <span className="ri-ico">🔑</span>
                <input type={showPass ? "text" : "password"} placeholder="Min. 8 characters" onChange={e => setPassword(e.target.value)} required className="ri" style={{ paddingRight: 44 }} />
                <button type="button" className="ri-eye" onClick={() => setShowPass(!showPass)}>{showPass ? "🙈" : "👁️"}</button>
              </div>
            </div>

            {/* Password strength */}
            {password.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 4, background: i <= strength ? strengthColor : "#e5e7eb", transition: "background 0.3s" }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: strengthColor, fontWeight: 600 }}>{strengthLabel} password</span>
              </div>
            )}

            {/* Terms */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 20 }}>
              <input type="checkbox" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: "#10b981", width: 15, height: 15, cursor: "pointer", marginTop: 2, flexShrink: 0 }} />
              <label htmlFor="agree" style={{ fontSize: 12, color: "#6b7280", cursor: "pointer", lineHeight: 1.5 }}>
                I agree to the <span style={{ color: "#10b981", fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: "#10b981", fontWeight: 600 }}>Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className="reg-btn">{loading ? "Creating account..." : "Create a Account →"}</button>
          </form>

          <div className="divline2"><span style={{ fontSize: 12, color: "#9ca3af" }}>Already have an account?</span></div>
          <Link to="/login" className="sec2">Login in instead</Link>

          <p style={{ textAlign: "center", fontSize: 11, color: "#d1d5db", marginTop: 18 }}>🔒 Secured with 256-bit SSL encryption</p>
        </div>
      </div>

      {/* ═══ RIGHT — Branding Panel ═══ */}
      <div className="rp-right">
        <div className="grid-bg2" />
        <div className="orb2" style={{ width: 320, height: 320, top: -100, right: -80, background: "radial-gradient(circle,rgba(16,185,129,0.35) 0%,transparent 70%)", animation: "float2 9s ease-in-out infinite" }} />
        <div className="orb2" style={{ width: 250, height: 250, bottom: -60, left: -60, background: "radial-gradient(circle,rgba(14,165,233,0.28) 0%,transparent 70%)", animation: "float2 11s ease-in-out infinite reverse" }} />
        <div className="orb2" style={{ width: 160, height: 160, top: "40%", left: 30, background: "radial-gradient(circle,rgba(139,92,246,0.22) 0%,transparent 70%)", animation: "float2 14s ease-in-out infinite" }} />

        {/* Top nav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#059669,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>TrackProject</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link to="/" className="tnl2">← Home</Link>
            <Link to="/login" className="tnl2 tnl2-login">Login</Link>
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 32px" }}>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.4px", lineHeight: 1.2 }}>
            Everything you need to<br />
            <span style={{ color: "#6ee7b7" }}>manage your projects</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "0 0 28px", lineHeight: 1.65 }}>
            TrackProject gives your team one place to plan, assign tasks, track progress, and hit deadlines — all in one clean workspace.
          </p>

          {/* Real feature cards — what the app actually does */}
          {[
            {
              icon: "📋",
              title: "Create & Assign Tasks",
              desc: "Break any project into tasks, set due dates, and assign them to team members instantly."
            },
            {
              icon: "📁",
              title: "Organize by Projects",
              desc: "Group tasks under projects. See what's in progress, what's done, and what's overdue at a glance."
            },
            {
              icon: "👥",
              title: "Team Workspace",
              desc: "Invite teammates, set roles, and collaborate in a shared workspace — everyone stays on the same page."
            },
            {
              icon: "📅",
              title: "Deadline Tracking",
              desc: "Get notified before deadlines hit. Never miss a delivery again with smart due-date reminders."
            },
          ].map((c, i) => (
            <div key={i} className="info-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0, marginTop: 1 }}>{c.icon}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{c.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 11, lineHeight: 1.55 }}>{c.desc}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Simple bottom note */}
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, marginTop: 16, lineHeight: 1.5 }}>
            Free to use · No setup fee · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};


export default Register;