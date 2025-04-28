// routes/userAssignmentRoutes.js
const express = require("express");
const router = express.Router();
const { createUserAssignment, getUserAssignment } = require("../controllers/userAssignmentController");



router.post("/", createUserAssignment);
router.get("/", getUserAssignment);

module.exports = router;
