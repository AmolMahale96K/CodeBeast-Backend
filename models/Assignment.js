const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true }
});

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    testCases: [TestCaseSchema] // Array of test cases
});

const AssignmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalQuestions: { type: Number, default: 1 }, // Always 1 question per assignment
    solved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
    completed: { type: Boolean, default: false },
    question: QuestionSchema, // Single question per assignment
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
