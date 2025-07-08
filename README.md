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

#################################################
### Set up environment files
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### /client/.env
VITE_API_BASE_URL=http://localhost:5000


### Run Backend
cd server
npm install
npm run dev

### Run Frontend
cd ../client
npm install
npm run dev


### 🐳 Docker Setup (Optional)
cd server
docker build -t job-portal-api .
docker run -p 5000:5000 job-portal-api


### 🛡️ Security Highlights
Rate limiting on login & apply routes
HttpOnly cookie for refresh tokens
Banned user checks on backend

### 📥 CSV Export (Admin Only)
Export all job listings → jobs.csv
Export all users → users.csv
Accessible from Admin Dashboard with download buttons.


<<<<<<<< 📜 License >>>>>>>>
This project is open-source and free to use for educational or commercial purposes. ✌️
