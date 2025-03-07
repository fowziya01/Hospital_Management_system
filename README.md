🏥Hospital Management System (Backend)


📖 Table of Contents

About the Project

Features

Tech Stack

Installation

Environment Variables

API Endpoints

Usage

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

https://github.com/fowziya01/Hospital_Management_system.git

2️⃣ Navigate to the Project Directory  
   ```sh
   cd repo Hospital_Management_system

3️⃣ Install Dependencies

npm install

4️⃣ Set Up Environment Variables

Create a .env file in the root directory and add the following:

MONGO_URI="mongodb://127.0.0.1:27017/HospitalMS?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8"
PORT=8081

JWT_SECRET="shhhh"

//app password

EMAIL_USER="fowzijunaid@gmail.com"

EMAIL_PASS="akrg zsia kzlj bpsn"

5️⃣ Start the Server

node server.js

🚀 Server running on port 8081

MongoDB Connected Successfully

📡 API Endpoints

🔹 Authentication

Method	                   Endpoint	                     Description

POST	                  api/auth/register	            Register a new user

POST	                  api/auth/login	              Login user  with JWT authentication

🔹 User Management (Admin Only)

Method	                   Endpoint	                         Description

GET	                      /users                         	Get all users

DELETE	                  /users/:id	                    Delete a user

🔹 Doctor Management (Admin and doctor only)

Method	                   Endpoint	                          Description

POST	                    api/doctors/	                      Add a new doctor (Added only by admin)

GET                       api/doctors/                      	Get all doctors(Accessible to All Authenticated Users)

GET                        api/doctors/:doctorId               Get doctors by Id (Accessible to All Authenticated Users)

PUT                        api/doctors/:doctorId                Find by Id and updating (Only Admin)

DELETE                     api/doctors/:doctorId                 Find by Id and delete (Only Admin)

🔹 Patients

Method	                         Endpoint                             	Description

POST                        api/patients/create                       Create a new patients

GET                         api/patients/                             Get all patients (Only accessible to doctors)

GET                         api/patients/:id                          Get patients by Id (Only accessible to doctors)
                   
                     
🔹 Appointments

Method	                         Endpoint                             	Description

POST	                          api/appointments /book               	Book an appointment	Patient only by admin

GET                              api/appointments/                      Only Doctor can view appointments

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

Doctors send a GET request to /appointments to view schedule

🤝 Contributors

👩‍💻 FOWZIYA BEGAM - Backend Developer

👨‍💻 Contributor 2 - Database Manager

Want to contribute? Feel free to create a Pull Request!

📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

🌟 Star the Repo!

If you found this project helpful, please ⭐ the repository to show your support!











