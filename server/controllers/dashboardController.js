const Client = require("../models/Client");
const Project = require("../models/Project");

const getDashboard = async (req, res) => {
  try {
    const clients = await Client.find().limit(5);
    const projects = await Project.find().limit(5);

    const stats = {
      clients: await Client.countDocuments(),
      active: await Project.countDocuments({ status: "Ongoing" }),
      completed: await Project.countDocuments({ status: "Completed" }),
    };

    res.json({ stats, clients, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };