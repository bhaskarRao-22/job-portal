const Application = require("../models/Application");

exports.applyToJob = async (req, res) => {
  const { jobId, resumeUrl } = req.body;
  try {
    const alreadyApplied = await Application.findOne({
      jobId,
      seekerId: req.user.id,
    });
    if (alreadyApplied)
      return res
        .status(400)
        .json({ msg: "You have already applied for this job." });

    const newApp = await Application.create({
      jobId,
      resumeUrl,
      seekerId: req.user.id,
    });
    res.status(201).json({ newApp });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ seekerId: req.user.id }).populate(
      "jobId"
    );
    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
