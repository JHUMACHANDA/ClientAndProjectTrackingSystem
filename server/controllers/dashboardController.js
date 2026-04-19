import Client from "../Models/Client.js"; 
import Project from "../Models/Project.js";

export const getDashboardStats = async (req, res) => {
    try {
        
        const userId = req.user.id; 

        
        const clients = await Client.find({ user: userId }); 
        const projects = await Project.find({ user: userId });

       const stats = {
    clients: clients.length,
    active: projects.filter(p => p.status === 'Ongoing').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    pending: projects.filter(p => p.status === 'Pending').length,  // ✅ নতুন
};

res.status(200).json({
    success: true,
    stats,
    clients,
    projects
});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching dashboard data" });
    }
};