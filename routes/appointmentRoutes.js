const express = require("express");
const { bookAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Book an Appointment (Patient)
router.post("/", authMiddleware, bookAppointment);

// Get All Appointments
router.get("/", authMiddleware, getAllAppointments);

// Get Appointment by ID
router.get("/:appointmentId", authMiddleware, getAppointmentById);

// Update an Appointment
router.put("/:appointmentId", authMiddleware, updateAppointment);

// Delete an Appointment
router.delete("/:appointmentId", authMiddleware, deleteAppointment);

module.exports = router;
