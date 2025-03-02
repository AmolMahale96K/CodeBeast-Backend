const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const runnerRoutes = require("./routes/runnerRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const fs = require("fs");

const app = express();

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data
app.use("/uploads", express.static("uploads")); // Serve uploaded files

mongoose
  .connect("mongodb://localhost:27017/CodeBeast", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", runnerRoutes);
app.use("/api", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
