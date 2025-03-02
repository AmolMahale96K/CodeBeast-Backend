const axios = require("axios");
const { API_URL, API_KEY } = require("../config/apiConfig");

// 🚀 **Run the code**
const runCode = async (req, res) => {
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
};

// 📊 **Check execution status**
const checkStatus = async (req, res) => {
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
};

// 📄 **Fetch output after execution**
const fetchOutput = async (req, res) => {
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
};

module.exports = { runCode, checkStatus, fetchOutput };
