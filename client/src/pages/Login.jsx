import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

 const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://clientandprojecttrackingsystem.onrender.com/api/auth/login", { username, password });
      
      if (res.data.success) {
        
        localStorage.setItem("token", res.data.token); 
        
        
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) { 
      console.error("Login error:", err.response?.data);
      alert(err.response?.data?.message || "Login failed"); 
    }
    setLoading(false);
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes slideLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimBtn { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.4)} 70%{box-shadow:0 0 0 10px rgba(99,102,241,0)} }

        .lp-left {
          flex: 1; position: relative; overflow: hidden;
          background: linear-gradient(155deg, #0d0221 0%, #1b0845 30%, #0c1a4a 65%, #061530 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          animation: slideLeft 0.7s ease both;
        }
        .lp-right {
          width: 460px; background: #fff;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 52px 44px; position: relative;
          animation: slideRight 0.7s ease both;
        }
        .orb { position: absolute; border-radius: 50%; pointer-events: none; }
        .grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .feat-row {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.08);
          width: 270px; margin-bottom: 10px; color: rgba(255,255,255,0.78); font-size: 13px;
          transition: all 0.2s; cursor: default;
        }
        .feat-row:hover { background: rgba(255,255,255,0.1); transform: translateX(5px); border-color: rgba(255,255,255,0.16); }
        .feat-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }

        .fi { width: 100%; padding: 13px 16px 13px 44px; border-radius: 12px; border: 1.5px solid #e5e7eb; background: #f9fafb; color: #111; font-size: 14px; outline: none; transition: all 0.22s; box-sizing: border-box; font-family: inherit; }
        .fi::placeholder { color: #d1d5db; }
        .fi:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 4px rgba(99,102,241,0.1); }
        .fi-wrap { position: relative; }
        .fi-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; pointer-events: none; }
        .fi-eye { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; font-size: 15px; padding: 0; transition: color 0.2s; }
        .fi-eye:hover { color: #6366f1; }

        .sub-btn { width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer; font-size: 15px; font-weight: 700; color: #fff; background: linear-gradient(90deg, #4f46e5, #7c3aed, #2563eb, #4f46e5); background-size: 300% auto; animation: shimBtn 4s linear infinite; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 4px 20px rgba(99,102,241,0.35); font-family: inherit; letter-spacing: 0.3px; }
        .sub-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.45); }
        .sub-btn:active { transform: scale(0.98); }

        .sec-btn { display: block; width: 100%; padding: 13px; border-radius: 12px; border: 1.5px solid #e5e7eb; background: #fff; color: #374151; font-size: 14px; font-weight: 600; text-align: center; text-decoration: none; transition: all 0.2s; box-sizing: border-box; }
        .sec-btn:hover { border-color: #6366f1; color: #6366f1; background: #f5f3ff; }

        .lbl { display: block; font-size: 11px; font-weight: 700; color: #9ca3af; margin-bottom: 7px; letter-spacing: 0.6px; text-transform: uppercase; }
        .pill { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 20px; background: #eef2ff; border: 1px solid #c7d2fe; font-size: 11px; color: #4f46e5; font-weight: 700; margin-bottom: 14px; }
        .divline { display: flex; align-items: center; gap: 10px; margin: 18px 0; width: 100%; }
        .divline::before,.divline::after { content:''; flex:1; height:1px; background:#e5e7eb; }

        .rtnl { font-size: 12px; color: #9ca3af; text-decoration: none; padding: 5px 12px; border-radius: 16px; border: 1px solid #e5e7eb; transition: all 0.2s; }
        .rtnl:hover { color: #6366f1; border-color: #c7d2fe; background: #eef2ff; }
        .rtnl-reg { color: #6366f1; background: #eef2ff; border-color: #c7d2fe; }
      `}</style>

      {/* ═══ LEFT PANEL ═══ */}
      <div className="lp-left">
        <div className="grid-bg" />
        {/* Orbs */}
        <div className="orb" style={{ width: 300, height: 300, top: -80, left: -80, background: "radial-gradient(circle,rgba(109,40,217,0.4) 0%,transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
        <div className="orb" style={{ width: 240, height: 240, bottom: 20, right: -60, background: "radial-gradient(circle,rgba(37,99,235,0.35) 0%,transparent 70%)", animation: "float 10s ease-in-out infinite reverse" }} />
        <div className="orb" style={{ width: 180, height: 180, bottom: 180, left: 40, background: "radial-gradient(circle,rgba(236,72,153,0.28) 0%,transparent 70%)", animation: "float 12s ease-in-out infinite" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 28px" }}>
          <div style={{ width: 76, height: 76, borderRadius: 20, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 22px", boxShadow: "0 16px 48px rgba(99,102,241,0.55)", animation: "float 4s ease-in-out infinite" }}>⚡</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.4px" }}>Welcome Back!</h1>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, margin: "0 0 32px", lineHeight: 1.6 }}>Your projects are waiting.<br />Sign in to pick up where you left off.</p>

          {/* Feature rows */}
          {[
            { icon: "📋", bg: "rgba(99,102,241,0.3)", text: "Track tasks in real-time" },
            { icon: "📊", bg: "rgba(59,130,246,0.3)", text: "Visual dashboards & analytics" },
            { icon: "🤝", bg: "rgba(16,185,129,0.28)", text: "Collaborate with your team" },
            { icon: "🔔", bg: "rgba(245,158,11,0.28)", text: "Smart deadline reminders" },
          ].map((f, i) => (
            <div key={i} className="feat-row" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feat-icon" style={{ background: f.bg }}>{f.icon}</div>
              <span>{f.text}</span>
              <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.28)", fontSize: 12 }}>✓</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ RIGHT PANEL ═══ */}
      <div className="lp-right">
        {/* Right top nav */}
        <div style={{ position: "absolute", top: 18, right: 20, display: "flex", gap: 8 }}>
          <Link to="/" className="rtnl">Home</Link>
          <Link to="/register" className="rtnl rtnl-reg">Register →</Link>
        </div>

        <div style={{ width: "100%", maxWidth: 340 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="pill"><span>🔐</span><span>SECURE LOGIN</span></div>
            <h2 style={{ color: "#111827", fontSize: 22, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.3px" }}>Login in to your account</h2>
            <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>Enter your credentials to access your workspace</p>
          </div>

          {loading && <Loader />}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 18 }}>
              <label className="lbl">Username</label>
              <div className="fi-wrap">
                <span className="fi-ico">👤</span>
                <input type="text" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} required className="fi" />
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label className="lbl" style={{ margin: 0 }}>Password</label>
                <span style={{ fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 500 }}>Forgot password?</span>
              </div>
              <div className="fi-wrap">
                <span className="fi-ico">🔑</span>
                <input type={showPass ? "text" : "password"} placeholder="••••••••" onChange={e => setPassword(e.target.value)} required className="fi" style={{ paddingRight: 44 }} />
                <button type="button" className="fi-eye" onClick={() => setShowPass(!showPass)}>{showPass ? "🙈" : "👁️"}</button>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <input type="checkbox" id="rem" style={{ accentColor: "#6366f1", width: 15, height: 15, cursor: "pointer" }} />
              <label htmlFor="rem" style={{ fontSize: 13, color: "#6b7280", cursor: "pointer" }}>Remember me for 30 days</label>
            </div>
            <button type="submit" className="sub-btn">{loading ? "Signing in..." : "login In →"}</button>
          </form>

          <div className="divline"><span style={{ fontSize: 12, color: "#9ca3af" }}>New to TrackProject?</span></div>

          <Link to="/register" className="sec-btn">Create a account</Link>

          <p style={{ textAlign: "center", fontSize: 11, color: "#d1d5db", marginTop: 22 }}>🔒 Protected by 256-bit SSL encryption</p>
        </div>
      </div>
    </div>
  );
};

export default Login;