const express = require("express");
const { 
    createDoctor, 
    getAllDoctors, 
    getDoctorById, 
    updateDoctor, 
    deleteDoctor 
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware"); // New Role Middleware

const router = express.Router();

// Create a Doctor (Only Admin)
router.post("/", authMiddleware, roleMiddleware("admin"), createDoctor);

// Get All Doctors (Accessible to All Authenticated Users)
router.get("/", authMiddleware, getAllDoctors);

// Get Doctor by ID (Accessible to All Authenticated Users)
router.get("/:doctorId", authMiddleware, getDoctorById);

// Update a Doctor (Only Admin)
router.put("/:doctorId", authMiddleware, roleMiddleware("admin"), updateDoctor);

// Delete a Doctor (Only Admin)
router.delete("/:doctorId", authMiddleware, roleMiddleware("admin"), deleteDoctor);

module.exports = router;
