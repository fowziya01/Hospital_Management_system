const Appointment = require("../models/appointmentModel");

// Book an Appointment
const bookAppointment = async (req, res) => {
    try {
        const { doctor, date, time } = req.body;
        const patient = req.userId; // Logged-in user (Patient)

        const newAppointment = new Appointment({ doctor, patient, date, time, status: "pending" });
        await newAppointment.save();

        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get All Appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate("doctor patient", "name email");
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findById(appointmentId).populate("doctor patient", "name email");

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update an Appointment
const updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { date, time, status } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, { date, time, status }, { new: true });

        if (!updatedAppointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete an Appointment
const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { bookAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment };
