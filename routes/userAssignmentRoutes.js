// routes/userAssignmentRoutes.js
const express = require("express");
const router = express.Router();
const { createUserAssignment, getUserAssignment ,getUserAssignmentsByUserId} = require("../controllers/userAssignmentController");



router.post("/", createUserAssignment);
router.get("/", getUserAssignment);
router.get("/getassignmentbyuser", getUserAssignmentsByUserId);

module.exports = router;
