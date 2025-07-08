const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://job-portal-693f.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cookieParser());