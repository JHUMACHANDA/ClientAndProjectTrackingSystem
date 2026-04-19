import express from "express";
import { 
    getClients, 
    createClient, 
    updateClient, 
    deleteClient 
} from "../controllers/clientController.js";
import { protect } from "../middleware/authMiddleware.js"; // এই লাইনটি যোগ করুন

const router = express.Router();

// সব রাউটেই 'protect' মিডলওয়্যার যোগ করা হয়েছে
// এতে নিশ্চিত হবে যে শুধু লগইন করা ইউজারই এই কাজগুলো করতে পারবে
router.get("/", protect, getClients);
router.post("/", protect, createClient);
router.put("/:id", protect, updateClient);
router.delete("/:id", protect, deleteClient);

export default router;