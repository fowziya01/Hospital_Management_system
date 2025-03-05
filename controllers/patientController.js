const Patient = require("../models/patientModel");

// Create a New Patient
const createPatient = async (req, res) => {
    try {
        const { userId, name, age, gender, medicalHistory } = req.body;

        if (!userId || !name || !age || !gender) {
            return res.status(400).json({ message: "User ID, Name, Age, and Gender are required" });
        }

        const newPatient = new Patient({ userId, name, age, gender, medicalHistory });
        await newPatient.save();

        res.status(201).json({ message: "Patient created successfully", patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get All Patients (Only accessible to doctors)
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate("userId", "name email");
        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a Single Patient by ID (Only accessible to doctors)
const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id).populate("userId", "name email");

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createPatient, getAllPatients, getPatientById };
