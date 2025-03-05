const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const logger = require("./middleware/logMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);  // Logging middleware

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("🏥 Hospital Management System API is Running...");
});

// Start Server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
