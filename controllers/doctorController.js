const Doctor = require("../models/doctorModel");
const createDoctor = async (req, res) => {
    try {
      const { userId, specialization, availableDays } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const doctor = new Doctor({ userId, specialization, availableDays });
      await doctor.save();
  
      res.status(201).json({ message: "Doctor added successfully", doctor });
    } catch (error) {
      res.status(500).json({ message: "Error creating doctor", error: error.message });
    }
  };
  
// Get All Doctors (Accessible to all authenticated users)
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};

// Get Doctor by ID (Admin & Doctor themselves)
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Allow only Admin or the doctor themselves to access this
    if (req.user.role !== "admin" && req.user.id !== doctor._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor details", error: error.message });
  }
};

// Update a Doctor (Admin & Doctor themselves)
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Only Admin or the doctor themselves can update
    if (req.user.role !== "admin" && req.user.id !== doctor._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.doctorId, req.body, { new: true });
    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error: error.message });
  }
};

// Delete a Doctor (Admin Only)
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Only Admin can delete a doctor
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Doctor.findByIdAndDelete(req.params.doctorId);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
