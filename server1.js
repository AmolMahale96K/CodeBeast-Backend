const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://api.paiza.io/runners/create";
const API_KEY = "guest"; // Default API key for Paiza

// 🚀 **Run the code**
app.post("/run", async (req, res) => {
    try {
        const { language, source_code, input } = req.body;

        if (!language || !source_code) {
            return res.status(400).json({ error: "Language and source code are required." });
        }

        const response = await axios.post(API_URL, {
            language,
            source_code,
            input: input || "", // Optional input handling
            api_key: API_KEY
        });

        if (!response.data || !response.data.id) {
            return res.status(500).json({ error: "Failed to get execution ID from API." });
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error processing request", details: error.message });
    }
});

// 📊 **Check execution status**
app.get("/status", async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Execution ID is required." });
    }

    try {
        const response = await axios.get(`https://api.paiza.io/runners/get_status?id=${id}&api_key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching status", details: error.message });
    }
});

// 📄 **Fetch output after execution**
app.get("/output", async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Execution ID is required." });
    }

    try {
        const response = await axios.get(`https://api.paiza.io/runners/get_details?id=${id}&api_key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching output", details: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
