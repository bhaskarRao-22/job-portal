const Job = require("../models/Job");
const mongoose = require("mongoose");

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
    const job = await Job.findByIdAndUpdate(
      { _id: req.params.id, recruiterId: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ job });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete({
      _id: req.params.id,
      recruiterId: req.user.id,
    });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getJobStats = async (req, res) => {
  try {
    const recruiterObjectId = new mongoose.Types.ObjectId(req.user.id);
    const stats = await Job.aggregate([
      { $match: { recruiterId: recruiterObjectId } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const formattedStats = stats.map((s) => ({
      month: new Date(0, s._id - 1).toLocaleString("default", {
        month: "short",
      }),
      jobs: s.count,
    }));
    res.json(formattedStats);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllJobsPublic = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
};

exports.getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiterId", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(id, { status }, { new: true });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteJobAdmin = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
