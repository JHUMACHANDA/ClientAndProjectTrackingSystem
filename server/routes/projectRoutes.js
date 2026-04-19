import express from "express";
import Project from "../Models/Project.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name, clientName, deadline, status } = req.body; // ✅ frontend এর সাথে match

    if (!name || !clientName) {
      return res.status(400).json({ message: "Name and Client name required" });
    }

    const project = await Project.create({
      name,
      clientName, 
      deadline,   
      status: status || "Pending",
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;