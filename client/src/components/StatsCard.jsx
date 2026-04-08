import React from 'react';

const StatsCard = ({ title, value, icon, bgColor, iconColor }) => {
  return (
    <div className={`p-6 rounded-2xl border border-transparent shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02] ${bgColor}`}>
      <div className={`p-3 rounded-xl bg-white shadow-sm ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-[#64748B] text-sm font-medium uppercase tracking-wide">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value || 0}</h3>
      </div>
    </div>
  );
};

export default StatsCard;