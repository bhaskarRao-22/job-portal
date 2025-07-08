const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, role });

    const tokens = generateTokens(newUser);
    res
      .status(201)
      .json({ user: { id: newUser._id, role: newUser.role }, ...tokens });
  } catch (err) {
    console.error("REGISTER ERROR: ", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (user.isBanned) {
      return res.status(403).json({ msg: "You are banned. Contact admin." });
    }

    const tokens = generateTokens(user);
    // res
    //   .status(200)
    //   .json({ user: { id: user._id, role: user.role }, ...tokens });

    // Set refresh token in secure cookie
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on Railway
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      user: { id: user._id, role: user.role },
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ msg: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: "User not found" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired refresh token" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ msg: "Logged out successfully" });
};