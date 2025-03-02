const express = require("express");
const { registerUser, loginUser, verifyUser,getUserProfile  } = require("../controllers/authController");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyUser);
router.get("/profile", getUserProfile);

module.exports = router;
