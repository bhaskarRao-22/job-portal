const express = require("express");
const {
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getJobStats,
  getAllJobsPublic,
  getAllJobsAdmin,
  updateJobStatus,
  deleteJobAdmin,
} = require("../controllers/jobController");
const { protect, isRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, isRole(["recruiter"]), createJob);
router.get("/", protect, isRole(["recruiter"]), getMyJobs);
router.get("/public", getAllJobsPublic);
router.put("/:id", protect, isRole(["recruiter"]), updateJob);
router.delete("/:id", protect, isRole(["recruiter"]), deleteJob);
router.get("/stats", protect, isRole(["recruiter"]), getJobStats);

router.get("/admin/all", protect, isRole(["admin"]), getAllJobsAdmin);
router.patch("/admin/status/:id", protect, isRole(["admin"]), updateJobStatus);
router.delete("/admin/:id", protect, isRole(["admin"]), deleteJobAdmin);

module.exports = router;
