import { generateContent } from "../services/ai.services.js"
export default {
    handle: async (req, res) => {
        const prompt = req.body.prompt;
        if (!prompt) {
            return res.status(400).send("prompt is required")
        }
        let timeout = setTimeout(() => {
            res.status(500).send("Server error: Request timed out");
        }, 10000);
        try {
            const response = await generateContent(prompt)
            clearTimeout(timeout);
            res.send(response)
        } catch (err) {
            clearTimeout(timeout);
            console.error(err);
            res.status(500).send("Server error")
        }
    }
}