const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

router.post("/users", authMiddleware, isAdmin, adminController.createUser);
router.put("/users/:userId", authMiddleware, isAdmin, adminController.editUser);

module.exports = router;
