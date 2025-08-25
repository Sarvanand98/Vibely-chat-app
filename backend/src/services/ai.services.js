import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a helpful and friendly assistant for a chat application. 
    Answer user questions clearly and accurately, whether they are about coding, technology, or general topics. 
    If asked for code review, provide constructive feedback and suggestions. 
    For non-coding questions, respond politely and informatively. 
    Always be concise, supportive, and respectful in your responses.
       
`
});

export async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}