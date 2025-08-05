require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: "http://localhost:5002",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI({
  apiKey: "AIzaSyDSJAZSTIKFwqhPAqNRKZEDW9_fYyAG4-k", 
});

app.post("/api/interview", async (req, res) => {
  try {
    const { question } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
