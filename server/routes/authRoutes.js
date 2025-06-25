const express = require("express");
const { register, login } = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/protected", protect);
router.get("/protected", protect, (req, res) => {
  res.json({
    msg: `Hello ${req.user.role}, your ID is ${req.user.id}`
  });
});

module.exports = router;