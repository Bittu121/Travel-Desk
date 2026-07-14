# Travel Desk Management System

A role-based platform for managing corporate travel requests end to end — from
submission, through manager and HR approval, to vendor booking and finance
payment tracking.

## Contents

- [Dashboard preview](#dashboard-preview)
- [Features](#features)
- [Roles](#roles)
- [How a request flows](#how-a-request-flows)
- [Flow diagram](#flow-diagram)
- [ER diagram](#er-diagram)
- [Schema diagram](#schema-diagram)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Known limitations](#known-limitations)

## Tech stack

**Client** — React 19, Vite, Tailwind CSS, MUI, Redux Toolkit, React Router,
Axios, react-icons, xlsx (Excel export).

**Server** — Node.js, Express, MongoDB (Mongoose), JWT auth (httpOnly
cookies), bcrypt, Multer (file uploads), Nodemailer (email notifications).

## Dashboard preview

| Employee | Manager / HR | Vendor | Finance | Admin |
|----------|--------------|--------|---------|-------|


<!--
Once screenshots are captured, drop them in `docs/screenshots/` and swap
each cell above for:
![Employee dashboard](docs/screenshots/employee-dashboard.png)
-->


## Features
## How a Request Flows

### User Management
HR creates and manages user accounts for Employees, Managers, Vendors, and Finance users.

### Start
An Employee or Manager logs into the system, fills out the travel request form, and submits it.

### Travel Request Submitted
The request status changes to **Pending Approval at Reporting Manager**, and the Reporting Manager receives an email notification.

### Reporting Manager Decision
The Reporting Manager reviews the request.

- **Approve:** The status changes to **Pending Approval at HR**, and HR receives an email notification.
- **Reject:** The status changes to **Rejected by Manager**, and the workflow ends.

### HR Decision

- **Approve:** HR assigns a travel vendor from the vendor list. The status changes to **Approved by HR – Assigned to Vendor**, and the selected vendor receives an email notification.
- **Reject:** The status changes to **Rejected by HR**, and the workflow ends.

### Vendor Receives the Request
After receiving the notification, the assigned vendor can view the request in their dashboard.

### Vendor Uploads Documents
The vendor books the travel arrangements and uploads all required documents, such as tickets.

### Vendor Updates Booking Status
The vendor continues uploading the required documents until the travel is confirmed, then marks the request as **Booked**. The request is moved to the **Booked Tickets** view.

### Finance Updates Payment
After the booking is completed, the Finance team updates the payment status by marking it as **Paid**.

### End
Once the payment has been processed, the travel request lifecycle is complete.

> **Note:** The Admin can view every request at any stage of the workflow across all employees and vendors. The Admin is not part of the approval process and has read-only access.


## Roles

| Role     | Can do |
|----------|--------|
| Employee | Submit and track their own requests |
| Manager  | First approval on a request |
| HR       | Second approval, assigns a vendor, manages user accounts |
| Vendor   | Uploads tickets/bills, records a booking reference, marks a request as booked |
| Finance  | Updates payment status |
| Admin    | Views every request across the company (read-only in the UI) |



## Flow diagram

![System Workflow](./images/Travel_Desk_Management_system_Flow_Diagram.png)

### User Management
HR creates and manages user accounts for Employees, Manager, users, Vendors and Finance.

### Start
An employee or manager login in the system and fills the travel request form and submit.

### Travel Request submitted
The request status becomes Pending Approval at Reporting Manager, and the reporting manager receives an email notification.

### Reporting Manager decision
The reporting manager reviews the request.

- If the manager approves it, the status changes to Pending Approval at HR, and HR receives an email notification.
- If the manager rejects the request, the status becomes Rejected by Manager, and the workflow ends.

### HR decision

**Approve:**
- HR assigns a travel vendor from the vendor list.
- The status changes to Approved by HR – Assigned to Vendor.
- The selected vendor receives an email notification.

**Reject:**
- Status changes to Rejected by HR, and the workflow ends.

### Vendor receives the request
After receiving the notification, the assigned vendor can view the request in their dashboard.

### Vendor uploads documents
The vendor books the travel arrangements and uploads all required documents, such as tickets.

### Vendor updates booking status
Keeps uploading until travel is confirmed, then marks the request as *booked*; it moves to the Booked Tickets view.

### Finance updates payment
After the booking is completed, the Finance team updates the payment information by marking the payment status as Paid.

### End
Once the payment has been processed, the travel request lifecycle is complete.

> Admin can view the request at any point in this flow, across every employee and vendor, without needing to be part of the approval chain.

## ER diagram

![ER Diagram](./images/Travel_Desk_ER_Diagram.png)


## Schema diagram

![Schema Diagram](./images/Travel_Desk_Schema-Diagram.png)

## Project structure

```
travel-desk-management-system/
├── client/            React frontend (Vite)
│   └── src/
│       ├── pages/     Route-level pages (dashboards, forms, landing page)
│       └── components/
└── server/            Express backend
    └── src/
        ├── models/       Mongoose schemas (User, TravelRequest)
        ├── controllers/  Route handlers
        ├── services/     Business logic
        ├── routes/       API route definitions
        ├── middleware/   Auth & role guards, file upload
        └── utils/        Email templates & helpers
```

## Getting started

### Prerequisites

- Node.js
- A MongoDB instance (local or Atlas)
- An SMTP account for outgoing email (e.g. Mailtrap for development)

### Server setup

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

```
PORT=5000
VITE_FRONTEND_KEY=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_password
```

```bash
npm run dev
```

### Client setup

```bash
cd client
npm install
```

Create a `.env` file in `client/` with:

```
VITE_API_KEY=http://localhost:5000
```

```bash
npm run dev
```

The client runs on `http://localhost:5173` and talks to the server on
`http://localhost:5000`.

### Creating your first account

There's no seed data — go to `/signup`, fill in your details, and pick a
role (Employee, Manager, HR, Vendor, or Finance). Pick **HR** first if you
want to add the rest of your team afterward from the HR dashboard, since
that's the only role with a "Create User" screen. (The `admin` role isn't
offered on the sign-up form; it has to be set directly on the user document
in the database.)

## Available scripts

**Server** (run from `server/`)

| Command | Description |
|---------|-------------|
| `npm start` | Run the server once with plain Node |
| `npm run dev` | Run the server with nodemon (auto-restarts on changes) |

**Client** (run from `client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build a production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Known limitations

- `POST /register` and the `/signup` page are open to anyone and let the
  caller pick their own role — there's no invite-only gate yet.
- `GET /managers` and `GET /vendors` are unauthenticated.
- File uploads (tickets/bills) have no size or file-type restriction.
- Requests are fetched in full on the backend; search and pagination are
  handled client-side only.

## Notes

- Uploaded ticket and bill files are stored on the server under
  `server/src/upload/`.
