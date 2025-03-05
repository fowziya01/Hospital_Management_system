const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },  // Reference Patient model
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },  // Reference Doctor model
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "completed", "cancelled"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
