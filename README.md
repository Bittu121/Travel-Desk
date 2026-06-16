# ✈️ Travel Desk Management System

> Enterprise-grade Corporate Travel Management Platform with Multi-Level Approval Workflow, Role-Based Access Control (RBAC), Vendor Coordination, Finance Tracking, Automated Email Notifications, and Secure Document Management.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-API-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

🔗 **Live Demo:** [Demo Link Here](#)

---

## 📌 Overview

Built a full-stack enterprise travel management platform that streamlines corporate travel requests through a structured approval workflow. The system manages travel planning, approvals, vendor coordination, ticket booking, bill uploads, reimbursement tracking, and automated notifications while ensuring secure role-based access.

---

## ✨ Key Highlights

* Multi-Level Approval Workflow
* Role-Based Access Control (5 Roles)
* JWT Authentication with HTTP-only Cookies
* Automated Email Notifications
* Vendor Ticket & Bill Management
* Finance Payment Tracking
* Dashboard Analytics & Reporting
* Secure File Upload System using Multer
* Search, Filtering & Pagination
* Audit-Friendly Travel Lifecycle Tracking

---

## 📈 Project Scale

* 5 User Roles
* 20+ REST APIs
* Complete Travel Request Lifecycle
* Multi-Step Approval Workflow
* Email Notification System
* File Upload & Document Management
* Dashboard Analytics
* Authentication & Authorization Module

---

## 🏗 System Architecture

```text
Employee
    │
    ▼
Manager Approval
    │
    ▼
HR Approval
    │
    ▼
Vendor Assignment & Booking
    │
    ▼
Ticket & Bill Upload
    │
    ▼
Finance Payment Tracking
    │
    ▼
Travel Request Closure
```

---

## 👥 User Roles

| Role     | Responsibilities                                |
| -------- | ----------------------------------------------- |
| Employee | Create and track travel requests                |
| Manager  | Approve or reject travel requests               |
| HR       | Final approval and vendor assignment            |
| Vendor   | Upload tickets, bills, booking details          |
| Finance  | Update payment status and reimbursement details |

---

## 🔄 Travel Workflow

1. Employee submits a travel request.
2. System generates a unique Travel ID.
3. Manager reviews and approves/rejects the request.
4. HR performs final approval and assigns a vendor.
5. Vendor uploads tickets, bills, and booking details.
6. Finance updates payment status.
7. Automated email notifications are sent at every stage.
8. Travel request lifecycle is completed.

---

## 🛠 Tech Stack

### Frontend

* React 19
* Redux Toolkit
* React Router
* Tailwind CSS
* Material UI
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* HTTP-only Cookies
* Multer
* Nodemailer

---

## 🗄 Database Design

| Collection     | Purpose                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| LOGIN          | User accounts, roles, and authentication                                                                        |
| TRAVEL_REQUEST | Complete travel request lifecycle, approvals, booking details, payment status, ticket uploads, and bill uploads |
| TRAVELER       | Traveler details associated with travel requests                                                                |

---

## 🔌 Core REST APIs

### Authentication

```http
POST   /api/v1/auth/user/register
POST   /api/v1/auth/user/login
POST   /api/v1/auth/user/logout
POST   /api/v1/auth/user/forgot-password
POST   /api/v1/auth/user/reset-password/:token
GET    /api/v1/auth/user/managers
GET    /api/v1/auth/user/vendors
```

### Travel Request

```http
POST   /api/v1/travel/travel-request
GET    /api/v1/travel/requests/me
```

### Approval Workflow

```http
GET    /api/v1/travel-requests/pending
GET    /api/v1/travel-requests/pending/:id
PUT    /api/v1/travel-requests/pending/update/:id
GET    /api/v1/travel-requests/approved-requests
```

### Bills

```http
PUT    /api/v1/bills/upload-bill/:id
GET    /api/v1/bills/:id/uploadBill
DELETE /api/v1/bills/:id/deleteBill
```

### Tickets

```http
PUT    /api/v1/tickets/upload-ticket/:id
GET    /api/v1/tickets/:id/uploadTicket
DELETE /api/v1/tickets/:id/deleteTicket
```

### Status Updates

```http
PUT    /api/v1/status/status/:id
PUT    /api/v1/status/bookMarks/:id
PUT    /api/v1/status/updateBookedStatus/:id
```

---

## 📊 Dashboard Metrics

* Total Requests
* Pending Requests
* Approved Requests
* Rejected Requests
* Booked Requests

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Travel Request Form

![Travel Request Form](screenshots/travel-request-form.png)

### Manager Approval Panel

![Manager Approval](screenshots/manager-approval.png)

### HR Vendor Assignment

![HR Vendor Assignment](screenshots/hr-vendor-assignment.png)

### Vendor Booking & Upload

![Vendor Booking](screenshots/vendor-booking.png)

### Finance Payment Tracking

![Finance Payment Tracking](screenshots/finance-payment-tracking.png)

---

## ⚙️ Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/travel-desk-management-system.git
cd travel-desk-management-system
```

---

### Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

## 🔐 Environment Variables

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Server (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

COOKIE_SECRET=your_cookie_secret
```

---

## ▶️ Running the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 🔒 Security Features

* JWT Authentication
* HTTP-only Cookies
* Password Hashing
* Role-Based Access Control (RBAC)
* Protected Routes
* Secure File Upload Validation
* Authorization Middleware

---

## 🚀 Future Enhancements

* Travel Cost Estimation
* Travel Policy Enforcement
* Approval Escalation Rules
* Real-Time Notifications
* Vendor Performance Analytics
* PDF Export & Reporting

---

## ⭐ Why This Project Stands Out

This project simulates a real-world enterprise travel management system used by organizations to manage employee travel requests, approvals, vendor bookings, ticket uploads, bill management, and finance workflows. It demonstrates strong full-stack development skills, authentication & authorization, REST API design, workflow automation, database modeling, file handling, and enterprise business process implementation.

---

### ⭐ If you found this project useful, consider giving it a star on GitHub.
