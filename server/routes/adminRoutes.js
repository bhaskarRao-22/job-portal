const express = require("express");
const router = express.Router();
const { protect, isRole } = require("../middlewares/authMiddleware");
const { getAllUsers, toggleBanUser, deleteUser } = require("../controllers/adminController");

router.get("/users", protect, isRole(["admin"]), getAllUsers);
router.patch("/ban-user/:id", protect, isRole(["admin"]), toggleBanUser);
router.delete("/user/:id", protect, isRole(["admin"]), deleteUser);

module.exports = router;
