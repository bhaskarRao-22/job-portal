const express = require("express");
const {
  applyToJob,
  getMyApplications,
} = require("../controllers/applicationController");
const { protect, isRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, isRole(["seeker"]), applyToJob);
router.get("/", protect, isRole(["seeker"]), getMyApplications);

module.exports = router;
