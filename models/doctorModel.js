const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    availableDays: [{ type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }]
},{timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
