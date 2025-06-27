const express = require('express');
const { createJob, getMyJobs, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, isRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, isRole(['recruiter']), createJob);
router.get('/', protect, isRole(['recruiter']), getMyJobs);
router.put('/:id', protect, isRole(['recruiter']), updateJob);
router.delete('/:id', protect, isRole(['recruiter']), deleteJob);

module.exports = router;
