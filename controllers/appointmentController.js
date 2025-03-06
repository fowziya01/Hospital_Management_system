const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware= require("../middleware/roleMiddleware");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
        secure:false,
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS ,
        }
    });
//Book Appointment (Admin Only)
const bookAppointment = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Only admin can book appointments" });
        }

        const { patientId, doctorId, date, time } = req.body;

        // Check if patient and doctor exist
        const patient = await User.findById(patientId);
        const doctor = await User.findById(doctorId);

        if (!patient || patient.role !== "patient") {
            return res.status(404).json({ message: "Patient not found" });
        }
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Create new appointment
        const newAppointment = new Appointment({ patient: patientId, doctor: doctorId, date, time });
        await newAppointment.save();
      res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
// Send Email (NodeMailer)

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to:"fowzy123@gmail.com" ,
        subject: "Appointment Confirmation",
        html: `<p>Your appointment with Doctor is booked </p>`,
    };

  let info= await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.response);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
//View Appointments (Doctor Only)
const viewAppointments = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Forbidden: Only doctors can view appointments" });
        }

        const doctorId = req.user.userId;  // Doctor's ID from auth
        const appointments = await Appointment.find({ doctor: doctorId })
            .populate("patient", "name email") // Populate patient details
            .populate("doctor", "name email"); // Populate doctor details

        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this doctor" });
        }

        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { bookAppointment, viewAppointments };
