const Doctor = require("../models/doctorModel"); // Assuming "Doctor" is a User with role "doctor"

// Create a Doctor
const createDoctor = async (req, res) => {
    try {
        const { name, email, specialization } = req.body;

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) return res.status(400).json({ message: "Doctor already exists" });

        const newDoctor = new Doctor({ name, email, role: "doctor", specialization });
        await newDoctor.save();

        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get All Doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ role: "doctor" }).select("-password");
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findOne({ _id: doctorId, role: "doctor" }).select("-password");

        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a Doctor
const updateDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { name, specialization } = req.body;

        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, { name, specialization }, { new: true });

        if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });

        res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a Doctor
const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

        if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });

        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };
