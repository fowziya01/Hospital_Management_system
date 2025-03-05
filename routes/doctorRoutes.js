const express = require("express");
const { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Doctor
router.post("/", authMiddleware, createDoctor);

// Get All Doctors
router.get("/", authMiddleware, getAllDoctors);

// Get Doctor by ID
router.get("/:doctorId", authMiddleware, getDoctorById);

// Update a Doctor
router.put("/:doctorId", authMiddleware, updateDoctor);

// Delete a Doctor
router.delete("/:doctorId", authMiddleware, deleteDoctor);

module.exports = router;
