🏥Hospital Management System (Backend)


📖 Table of Contents

About the Project

Features

Tech Stack

Installation

Environment Variables

API Endpoints

Usage

Screenshots

Contributors

License

📌 About the Project

The Hospital Management System is a backend REST API built with Node.js, Express.js, and MongoDB, designed to manage appointments, users, and authentication with JWT and Role-Based Access Control (RBAC). The system also uses Nodemailer to send appointment confirmations via email.

🚀 Features

✅ User Roles (RBAC): Admin, Doctor, Patient

✅ JWT Authentication: Secure login and access control

✅ Nodemailer Integration: Email confirmation for appointments

✅ CRUD Operations: Manage users, doctors, and appointments

✅ Role-Based Access: Admin manages users, doctors manage appointments, patients book appointments

✅ Logger Middleware: To konw the url, method and time

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT, bcrypt

Authorization: Role-Based Access Control (RBAC)

Email Notifications: Nodemailer

Other Tools: dotenv, CORS

⚙️ Installation

1️⃣ Clone the Repository














bash
Copy
Edit
git clone https://github.com/yourusername/hospital-management-system.git
cd hospital-management-system
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Configure Environment Variables
Create a .env file in the root directory:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
4️⃣ Run the Server
bash
Copy
Edit
npm start
The server will run on http://localhost:5000

🔐 Environment Variables
Variable	Description
PORT	Server port (default: 5000)
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT authentication
EMAIL_USER	Email address for sending appointment emails
EMAIL_PASS	Email password or app password
📡 API Endpoints
🔹 Authentication
Method	Endpoint	Description
POST	/auth/signup	Register a new user
POST	/auth/login	Login user
🔹 User Management (Admin Only)
Method	Endpoint	Description
GET	/users	Get all users
DELETE	/users/:id	Delete a user
🔹 Doctor Management (Admin Only)
Method	Endpoint	Description
POST	/doctors	Add a new doctor
GET	/doctors	Get all doctors
🔹 Appointments
Method	Endpoint	Description	Access
POST	/appointments	Book an appointment	Patient
GET	/appointments	View all appointments	Admin, Doctor
DELETE	/appointments/:id	Cancel an appointment	Admin, Patient
🎯 Usage
1️⃣ Register & Login
Users sign up and log in using JWT authentication.
Admin assigns roles to users (Admin, Doctor, Patient).
2️⃣ Role-Based Access Control (RBAC)
Admin: Can manage doctors, users, and appointments.
Doctor: Can view assigned appointments.
Patient: Can book and cancel appointments.
3️⃣ Book an Appointment (Patients)
Patients send a POST request to /appointments with doctor details.
A confirmation email is sent using Nodemailer.
4️⃣ View Appointments (Doctors)
Doctors send a GET request to /appointments to view schedules.
📸 Screenshots
Appointment Booking	Email Confirmation
🤝 Contributors
👩‍💻 Your Name - Backend Developer
👨‍💻 Contributor 2 - Database Manager
Want to contribute? Feel free to create a Pull Request!

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🌟 Star the Repo!
If you found this project helpful, please ⭐ the repository to show your support!










