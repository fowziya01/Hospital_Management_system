const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, specialization, availableDays, age, gender, medicalHistory } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        // Store additional data based on role
        if (role === "doctor") {
            if (!specialization) {
                return res.status(400).json({ message: "Specialization is required for doctors" });
            }
            const newDoctor = new Doctor({ userId: newUser._id, specialization, availableDays });
            await newDoctor.save();
        } else if (role === "patient") {
            if (!age || !gender) {
                return res.status(400).json({ message: "Age and gender are required for patients" });
            }
            const newPatient = new Patient({ userId: newUser._id, name, age, gender, medicalHistory });
            await newPatient.save();
        }else if (role === "admin") {
            // No additional model needed for admin, just register the user
        }

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Fetch additional details based on role
        let userDetails = { name: user.name, email: user.email, role: user.role };

        if (user.role === "doctor") {
            const doctorDetails = await Doctor.findOne({ userId: user._id }).select("-userId");
            if (doctorDetails) userDetails = { ...userDetails, ...doctorDetails._doc };
        } else if (user.role === "patient") {
            const patientDetails = await Patient.findOne({ userId: user._id }).select("-userId");
            if (patientDetails) userDetails = { ...userDetails, ...patientDetails._doc };
        }

        res.status(200).json({ message: "Login successful", token, user: userDetails });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




module.exports = { registerUser, loginUser };
