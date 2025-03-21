const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController.js");

// Send a message
router.post("/", messageController.sendMessage);

// Get messages between two users
router.get("/:user1/:user2", messageController.getMessagesBetweenUsers);

// Mark a message as read
router.patch("/:id/read", messageController.markAsRead);

module.exports = router;
