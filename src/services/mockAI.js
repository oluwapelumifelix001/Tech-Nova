// This service mocks the Google Gemini API for the frontend
// To make this real, you would create a backend endpoint that uses @google/genai

export const askNovaAI = async (prompt, mode, contextArticle = null) => {
    // Simulate network latency for the AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))

    let prefix = ''
    if (contextArticle) {
        prefix = `Regarding "${contextArticle.headline}": `
    }

    // Very simple mocked responses based on mode
    if (mode === 'eli5') {
        return prefix + "Imagine you have a really smart dog that can learn anything. Right now, scientists just taught the dog how to read books! That's what this means, but for computers."
    }

    if (mode === 'detailed') {
        return prefix + "This development represents a significant step forward. By utilizing advanced neural architectures, the system can now process information with 40% greater efficiency, leading to faster research cycles in the mentioned field."
    }

    if (mode === 'technical') {
        return prefix + "The underlying mechanism relies on a novel approach to attention mechanisms in transformer models, specifically optimizing O(N^2) complexity down to O(N log N) through sparse attention matrices, which allows for significantly larger context windows during training epochs."
    }

    return "I'm Nova! How can I help you explore the universe of technology today?"
}
