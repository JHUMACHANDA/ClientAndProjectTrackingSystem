import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../assets/services/projectService";

const STATUS_STYLES = {
  Pending: {
    badge: "bg-[#1f1a0e] text-[#EF9F27] border border-[#854F0B]",
    dot: "bg-[#EF9F27]",
    bar: "bg-[#EF9F27]",
  },
  Ongoing: {
    badge: "bg-[#0d1928] text-[#378ADD] border border-[#185FA5]",
    dot: "bg-[#378ADD]",
    bar: "bg-[#378ADD]",
  },
  Completed: {
    badge: "bg-[#0d1a0d] text-[#639922] border border-[#3B6D11]",
    dot: "bg-[#639922]",
    bar: "bg-[#639922]",
  },
};

const FILTERS = ["All", "Pending", "Ongoing", "Completed"];

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching projects", error);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  const counts = {
    All: projects.length,
    Pending: projects.filter((p) => p.status === "Pending").length,
    Ongoing: projects.filter((p) => p.status === "Ongoing").length,
    Completed: projects.filter((p) => p.status === "Completed").length,
  };

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "—";

  return (
    <div className="min-h-screen font-sans" style={{ background: "#120f17" }}>
      {/* ── NAVBAR ── */}
      <nav
        className="sticky top-0 z-20 flex justify-between items-center px-8 py-3.5"
        style={{ background: "#161922", borderBottom: "1px solid #252836" }}
      >
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div
            className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-white text-[11px] font-medium"
            style={{ background: "#534AB7" }}
          >
            P
          </div>
          <span className="text-[15px] font-medium" style={{ color: "#e8eaf0" }}>
            ProjectHub
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-1.5 text-sm rounded-lg transition"
            style={{
              background: "transparent",
              border: "1px solid #2a2d3e",
              color: "#9298ad",
            }}
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="max-w-5xl mx-auto px-8 pt-10 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[26px] font-medium leading-snug" style={{ color: "#e8eaf0" }}>
            Manage your <span style={{ color: "#7F77DD" }}>projects</span>
            <br />all in one place
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "#5a6078" }}>
            Track clients, deadlines, and progress easily.
          </p>
        </div>

        <div className="hidden md:flex gap-2.5">
          {[
            { label: "Total", count: counts.All, color: "#7F77DD" },
            { label: "Pending", count: counts.Pending, color: "#EF9F27" },
            { label: "Ongoing", count: counts.Ongoing, color: "#378ADD" },
            { label: "Done", count: counts.Completed, color: "#639922" },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              className="rounded-xl px-5 py-3 text-center min-w-[68px]"
              style={{ background: "#161922", border: "1px solid #252836" }}
            >
              <div className="text-[22px] font-medium" style={{ color }}>{count}</div>
              <div className="text-[11px] mt-0.5" style={{ color: "#5a6078" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="max-w-5xl mx-auto px-8 mb-4">
        <div
          className="flex gap-1 rounded-[10px] p-1 w-fit"
          style={{ background: "#161922", border: "1px solid #252836" }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 text-sm rounded-[7px] transition-all flex items-center gap-1.5"
              style={
                filter === f
                  ? { background: "#534AB7", color: "#fff" }
                  : { background: "transparent", color: "#5a6078" }
              }
            >
              {f}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#1e2130]">
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="max-w-5xl mx-auto px-8 pb-16">
        <div
          className="rounded-[14px] overflow-hidden"
          style={{ background: "#161922", border: "1px solid #252836" }}
        >
          <div
            className="grid px-5 py-2.5 text-[11px] font-medium uppercase tracking-[.07em]"
            style={{
              gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr", // Updated columns
              background: "#0f1517",
              borderBottom: "1px solid #252836",
              color: "#3d4260",
            }}
          >
            <span>Project name</span>
            <span>Client</span>
            <span>Deadline</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>

          {filtered.length > 0 ? (
            filtered.map((project, idx) => {
              const s = STATUS_STYLES[project.status] || STATUS_STYLES.Pending;

              return (
                <div
                  key={project._id || idx}
                  className="grid px-5 items-center transition"
                  style={{
                    gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr",
                    borderBottom: "1px solid #1a1d2e",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${s.dot}`} />
                    <span className="text-[13px] font-medium truncate" style={{ color: "#c8ccda" }}>
                      {project.name}
                    </span>
                  </div>

                  <span className="text-[13px] truncate" style={{ color: "#5a6078" }}>
                    {project.clientName}
                  </span>

                  <span className="text-[13px]" style={{ color: "#5a6078" }}>
                    {formatDate(project.deadline)}
                  </span>

                  <div>
                    <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full ${s.badge}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* ✅ Correct Action Button inside the row */}
                  <div className="text-right">
                    <button
                      onClick={() => navigate(`/review/${project._id}`)}
                      className="px-3 py-1 text-[11px] rounded bg-[#534AB7] text-white hover:bg-[#3C3489] transition"
                    >
                      Review
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center text-[13px]" style={{ color: "#3d4260" }}>
              No projects found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;