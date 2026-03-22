import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the API with your key from environment variables
// Ensure you have VITE_GEMINI_API_KEY in your .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

export const askNovaAI = async (prompt, mode, contextArticle = null) => {
    if (!API_KEY) {
        return "Oops! Please add your Gemini API key to the .env file as VITE_GEMINI_API_KEY to let me answer your questions using Google's generative AI."
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY)
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: "You are Nova, an AI assistant for the Tech Nova news platform. Keep responses concise and engaging."
        })
        
        let promptPrefix = ""
        
        if (mode === 'eli5') {
            promptPrefix = "Explain this extremely simply, as if to a 5-year-old. Keep it short. "
        } else if (mode === 'detailed') {
            promptPrefix = "Provide a detailed, comprehensive response. "
        } else if (mode === 'technical') {
            promptPrefix = "Use advanced technical language, focusing on underlying concepts and mechanics. "
        }

        let fullPrompt = promptPrefix + prompt
        if (contextArticle) {
            fullPrompt = `Using the following context about the article "${contextArticle.headline}" (Summary: ${contextArticle.summary}), answer this prompt: ${fullPrompt}`
        }

        const result = await model.generateContent(fullPrompt)

        return result.response.text()
    } catch (error) {
        console.error("Gemini API Error:", error)
        return "Sorry, I encountered an error while processing your request to the Gemini API. Please check the console for details."
    }
}
