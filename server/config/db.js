import mongoose from "mongoose";
import dns from "dns";
import "dotenv/config";

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
            directConnection: false,
        });
        console.log("✅ MongoDB Atlas Connected");
    } catch (error) {
        console.error("❌ DB Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;