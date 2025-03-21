const Message = require("../database/models/Message");
const User = require("../database/models/User");
const { Op } = require("sequelize");

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json({ msg: "Message sent", message });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get all messages between two users
exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Mark a message as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ msg: "Message not found" });

    message.isRead = true;
    await message.save();

    res.json({ msg: "Message marked as read", message });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
