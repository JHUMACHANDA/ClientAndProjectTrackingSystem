import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // কানেকশন ফাইল ইমপোর্ট করুন
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

// এখানে ডাটাবেস কল করুন
connectDB(); 

const app = express();
app.use(express.json()); // ডাটা বডি থেকে পড়ার জন্য
app.use(cors());        // ফ্রন্টএন্ডকে এক্সেস দেওয়ার জন্য

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
// server.js এ এই line টা missing হতে পারে
app.use("/api/projects", projectRoutes); 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));