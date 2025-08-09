import { fetchGeminiAI } from "../services/geminiService.js";

export const getAIRecommendation = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const result = await fetchGeminiAI(query);
    res.json({ recommendation: result });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
