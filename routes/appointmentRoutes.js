const express = require("express");
const { bookAppointment, viewAppointments } = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware"); // Import role-based middleware

const router = express.Router();

// ✅ Route: Only Admin can book an appointment
router.post("/book", authMiddleware, authorizeRole("admin"), bookAppointment);

// ✅ Route: Only Doctor can view appointments
router.get("/", authMiddleware, authorizeRole("doctor"), viewAppointments);

module.exports = router;
