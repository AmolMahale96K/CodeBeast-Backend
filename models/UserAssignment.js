// models/UserAssignment.js
const mongoose = require("mongoose");

const UserAssignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  code: { type: String, required: true }, // User's submitted code
  passTestCases: { type: Number, required: true } // Number of test cases passed
});

module.exports = mongoose.model("UserAssignment", UserAssignmentSchema);
    