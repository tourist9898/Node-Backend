const Group = require("../models/Group");

const groupController = {
  createGroup: async (req, res) => {
    const { name, description } = req.body;

    try {
      const newGroup = new Group({ name, description });
      await newGroup.save();

      res
        .status(201)
        .json({ message: "Group created successfully", group: newGroup });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteGroup: async (req, res) => {
    const { groupId } = req.params;

    try {
      await Group.findByIdAndDelete(groupId);

      res.json({ message: "Group deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  searchGroups: async (req, res) => {
    const { query } = req.query;

    try {
      const groups = await Group.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });

      res.json({ groups });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = groupController;
