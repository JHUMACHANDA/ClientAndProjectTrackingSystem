import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    clientName: { type: String, required: true },
    deadline:   { type: Date },
    status:     { type: String, enum: ["Pending", "Ongoing", "Completed"], default: "Pending" },
    user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);