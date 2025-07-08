# 🧑‍💼 Job Portal with Admin Dashboard – (MERN Stack + Tailwind CSS) 

A full-featured Job Portal built using the MERN Stack (MongoDB, Express, React, Node.js) with Docker, JWT Auth, Admin Controls, Role-Based Dashboards, Resume Upload, and CSV Export features.

---

## 🚀 Live Demo

- **Frontend** (Vercel): [job-portal.vercel.app](https://job-portal-693f.vercel.app/)
- **Backend** (Railway): [job-portal-api.up.railway.app](https://job-portal-production-1a78.up.railway.app)

---

## ⚙️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT + Refresh Token (cookie-based)
- **Deployment**: Railway (API), Vercel (Frontend)
- **Storage**: Cloudinary (Resume Upload)
- **Data Export**: CSV using `json2csv`
- **Security**: Rate Limiting, Banned User Blocking
- **Realtime (optional)**: WebSockets (planned)

---

## 👥 User Roles

1. **Job Seeker**  
   - Register/Login
   - Browse & filter jobs
   - Upload resume
   - Apply to jobs

2. **Recruiter**  
   - Post jobs
   - View applications
   - Dashboard analytics

3. **Admin**  
   - Moderate jobs
   - Manage users (ban/unban/delete)
   - Export data (Jobs/Users as CSV)

---

## ✨ Features

- 🔐 JWT Auth with Refresh Tokens
- ⛔ Banned User Logic (blocked from login or job apply)
- 📁 Resume upload via Cloudinary
- 📊 Recruiter analytics (Recharts)
- 📤 Admin CSV Export (Jobs & Users)
- 🐳 Docker-ready backend
- 🌐 Fully deployed on Vercel & Railway
- 📦 Protected routes by user role
- 📱 Responsive UI with Tailwind

---

## 🔧 Installation (Local Dev)

### 1. Clone the repo

```bash
git clone https://github.com/bhaskarRao-22/job-portal.git
cd job-portal
