const API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''

// Auto-detect OpenRouter keys based on prefix
const isRoute = API_KEY.startsWith("sk-or")
const API_URL = isRoute ? "https://openrouter.ai/api/v1/chat/completions" : "https://api.groq.com/openai/v1/chat/completions"

// List of fallback models (in priority order) to automatically try if one is rate-limited
const MODELS = isRoute 
    ? [
        "qwen/qwen3-4b:free",                                           // Less well-known, high capacity
        "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",// Incredible quality, often uncrowded
        "nvidia/nemotron-nano-9b-v2:free",                              // Fast NVIDIA alternative
        "minimax/minimax-m2.5:free"                                     // Highly reliable enterprise free tier
      ] 
    : ["llama3-8b-8192"] // Groq handles their own traffic well

export const askNovaAI = async (prompt, mode, contextArticle = null) => {
    if (!API_KEY) {
        return "Oops! Please add your API key to the .env file as VITE_GROQ_API_KEY to let me answer your questions using AI."
    }

    try {
        let systemInstruction = "You are Nova, an AI assistant for the Tech Nova news platform. Keep responses concise, helpful, and engaging."
        
        if (mode === 'eli5') {
            systemInstruction += " Explain this extremely simply, as if to a 5-year-old. Keep it short and use analogies."
        } else if (mode === 'detailed') {
            systemInstruction += " Provide a detailed, comprehensive response with deep insights."
        } else if (mode === 'technical') {
            systemInstruction += " Use advanced technical language, focus on algorithms, mechanics, code, and hard science."
        }

        let fullPrompt = prompt
        if (contextArticle) {
            fullPrompt = `Using the following context about the article "${contextArticle.headline}" (Summary: ${contextArticle.summary}), answer this prompt:\n\n${prompt}`
        }

        let lastError = null;

        // Try each model until one succeeds
        for (const currentModel of MODELS) {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: currentModel,
                    messages: [
                        { role: "system", content: systemInstruction },
                        { role: "user", content: fullPrompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 1024
                })
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.warn(`Model ${currentModel} failed (${response.status}):`, errorText)
                lastError = `API returned ${response.status}`
                
                // If it's a rate limit (429) or upstream server issue (502/503), try the next model
                if (response.status === 429 || response.status >= 500) {
                    continue; 
                }
                
                // If it's auth or billing error, break immediately
                throw new Error(lastError)
            }

            const data = await response.json()
            return data.choices[0].message.content
        }

        // If all models failed
        throw new Error(lastError || "All fallback models were rate limited")

    } catch (error) {
        console.error("AI API Error:", error)
        return "Sorry, the AI models are currently overwhelmed with requests. Please try again in a few moments!"
    }
}
