const express = require("express");
const router = express.Router();
const {
    getAssignments,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    markAssignmentAsSolved
} = require("../controllers/assignmentController");

// Routes
router.get("/", getAssignments);
router.get("/:id", getAssignmentById);
router.post("/", createAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);
router.put("/:id/solve", markAssignmentAsSolved);


module.exports = router; 
