const Message = require("../models/Message");

const messageController = {
  sendMessage: async (req, res) => {
    const { groupId, content } = req.body;
    const userId = req.user.id;

    try {
      const newMessage = new Message({ groupId, userId, content });
      await newMessage.save();

      res
        .status(201)
        .json({ message: "Message sent successfully", message: newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  likeMessage: async (req, res) => {
    const { messageId } = req.params;

    try {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { $inc: { likes: 1 } },
        { new: true }
      );

      res.json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = messageController;
