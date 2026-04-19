// controllers/projectController.js
import Project from "../Models/Project.js";


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};


export const createProject = async (req, res) => {
  try {
    const { name, clientName, deadline, status } = req.body;

    if (!name || !clientName) {
      return res.status(400).json({ message: "Name and Client name are required" });
    }

    const project = await Project.create({
      name,
      clientName,
      deadline,
      status: status || "Pending",
      user: req.user.id, 
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};

