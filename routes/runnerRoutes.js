const express = require("express");
const { runCode, checkStatus, fetchOutput } = require("../controllers/runnerController");

const router = express.Router();

router.post("/run", runCode);
router.get("/status", checkStatus);
router.get("/output", fetchOutput);

module.exports = router;
