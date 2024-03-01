const express = require("express");
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, messageController.sendMessage);
router.put("/:messageId/like", authMiddleware, messageController.likeMessage);

module.exports = router;
