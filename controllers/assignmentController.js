const Assignment = require("../models/Assignment");

// Get all assignments
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// Get a single assignment by ID
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// Create a new assignment
exports.createAssignment = async (req, res) => {
    try {
        const { name, solved = 0, completed = false, question } = req.body;

        if (!name || !question) {
            return res.status(400).json({ message: "Name and question are required" });
        }

        const newAssignment = new Assignment({ name, solved, completed, question });
        const savedAssignment = await newAssignment.save();

        res.status(201).json(savedAssignment);
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// Update an assignment
exports.updateAssignment = async (req, res) => {
    try {
        const { name, solved, completed, question } = req.body;

        const updatedAssignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            { name, solved, completed, question },
            { new: true, runValidators: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.status(200).json(updatedAssignment);
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// Delete an assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// Update only the solve attribute
exports.markAssignmentAsSolved = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        assignment.solved = 1;
        await assignment.save();

        res.status(200).json({ message: "Assignment marked as solved", assignment });
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

