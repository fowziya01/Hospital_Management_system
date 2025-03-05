const express = require("express");
const { createPatient, getAllPatients, getPatientById } = require("../controllers/patientController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to restrict access

const router = express.Router();

router.post("/create", createPatient);

// Get all patients (Only accessible to doctors)
router.get("/", authMiddleware, getAllPatients);

// Get a patient by ID (Only accessible to doctors)
router.get("/:id", authMiddleware, getPatientById);

module.exports = router;
