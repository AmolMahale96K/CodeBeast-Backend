const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const path = require("path");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

    user = new User({ name, email, password: hashedPassword, profilePic });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");
      return res.status(500).json({ message: "Server error: missing JWT secret" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify User
const verifyUser = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const verified = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    res.json({ message: "Token is valid", userId: verified.id });
  } catch (err) {
    console.error("Token verification failed:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
  
};


module.exports = { registerUser, loginUser, verifyUser,getUserProfile };
