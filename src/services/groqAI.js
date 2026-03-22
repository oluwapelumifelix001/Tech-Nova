const API_KEY = import.meta.env.VITE_TOGETHER_API_KEY || ''
const API_URL = "https://api.together.xyz/v1/chat/completions"

// Fallback models for Together AI
const MODELS = [
    "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",      // Blisteringly fast Llama 3.1 8B 
    "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",     // Fantastic reasoning, slightly slower
    "mistralai/Mixtral-8x7B-Instruct-v0.1"              // Hyper-reliable and fast
]

export const askNovaAI = async (prompt, mode, contextArticle = null) => {
    if (!API_KEY) {
        return 
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
