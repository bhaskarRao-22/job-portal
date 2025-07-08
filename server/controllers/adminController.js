const { Parser } = require("json2csv");
const Job = require("../models/Job");
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.toggleBanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.isBanned = !user.isBanned;
    await user.save();
    res.json({
      msg: `User ${user.isBanned ? "banned" : "unbanned"} successfully.`,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.exportJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");

    const data = jobs.map((job) => ({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,
      postedBy: job.postedBy?.name || "N/A",
      postedEmail: job.postedBy?.email || "N/A",
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("jobs.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.exportUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const data = users.map((user) => ({
      name: user.name,
      email: user.email,
      role: user.role,
      isBanned: user.isBanned,
      createdAt: user.createdAt,
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
