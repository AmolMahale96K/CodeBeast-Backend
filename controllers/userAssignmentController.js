// controllers/userAssignmentController.js
const UserAssignment = require("../models/UserAssignment");

// Create a new user assignment submission
exports.createUserAssignment = async (req, res) => {
    try {
      const { userId, assignmentId, code, passTestCases } = req.body;
  
      // First, check if this userId + assignmentId already exists
      let userAssignment = await UserAssignment.findOne({ userId, assignmentId });
  
      if (userAssignment) {
        // Update existing record
        userAssignment.code = code;
        userAssignment.passTestCases = passTestCases;
        await userAssignment.save();
        res.status(200).json({ message: "Submission updated successfully!" });
      } else {
        // Create a new record
        userAssignment = new UserAssignment({
          userId,
          assignmentId,
          code,
          passTestCases
        });
        await userAssignment.save();
        res.status(201).json({ message: "Submission created successfully!" });
      }
    } catch (error) {
      console.error("Error saving or updating user assignment:", error.message);
      res.status(500).json({ error: "Server error saving/updating assignment" });
    }
  };
  

exports.getUserAssignment = async (req, res) => {
    try {
      const { userId, assignmentId } = req.query;
  
      if (!userId || !assignmentId) {
        return res.status(400).json({ message: "Missing userId or assignmentId" });
      }
  
      const userAssignment = await UserAssignment.findOne({ userId, assignmentId });
  
      if (!userAssignment) {
        return res.status(404).json({ message: "No previous code found" });
      }
  
      res.status(200).json(userAssignment);
    } catch (error) {
      console.error("Error fetching user assignment:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };

