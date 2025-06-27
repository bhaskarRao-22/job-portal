const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, recruiterId: req.user.id });
    await job.save();
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user.id });
    res.status(200).json({ jobs });
    // res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate({ _id: req.params.id, recruiterId: req.user.id }, req.body, { new: true });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ job });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete({ _id: req.params.id, recruiterId: req.user.id });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
