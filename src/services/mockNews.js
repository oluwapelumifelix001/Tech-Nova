import { CATEGORIES } from '../store/useStore'

const GNEWS_API_KEY = 'ccdae270fb3d4b96ac93ce666f011a0a'

// Helper function to map our category IDs to GNews search queries
const getSearchQueryForCategory = (categoryId) => {
    switch (categoryId) {
        case 'ai': return 'artificial intelligence OR machine learning'
        case 'robotics': return 'robotics OR robots'
        case 'bio': return 'biotechnology OR CRISPR'
        case 'space': return 'space exploration OR NASA OR SpaceX'
        case 'climate': return 'climate tech OR renewable energy'
        case 'quantum': return 'quantum computing'
        case 'gadgets': return 'gadgets OR consumer electronics'
        case 'future': return 'future of work OR remote work tech'
        default: return 'technology'
    }
}

export const fetchNewsFeed = async (selectedCategoryIds = []) => {
    try {
        // If no categories selected, just fetch general tech news
        const query = selectedCategoryIds && selectedCategoryIds.length > 0
            ? selectedCategoryIds.map(getSearchQueryForCategory).join(' OR ')
            : 'technology OR science'

        // We use the `search` endpoint of GNews
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${GNEWS_API_KEY}`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`GNews API error: ${response.status}`)
        }

        const data = await response.json()

        if (!data.articles) {
            return []
        }

        // Map the GNews response format to our application's format
        return data.articles.map((article, index) => {
            // We randomly assign a category for the visual badge if the user hasn't selected specific ones
            // In a production app with a real backend, you'd use NLP to classify the article perfectly.
            const assignedCategoryId = selectedCategoryIds && selectedCategoryIds.length > 0
                ? selectedCategoryIds[index % selectedCategoryIds.length]
                : CATEGORIES[index % CATEGORIES.length].id

            return {
                id: article.url, // URL is a good unique ID
                categoryId: assignedCategoryId,
                headline: article.title,
                summary: article.description,
                takeaway: `Source: ${article.source.name}`,
                readTime: '3 min read', // Mocking read time
                type: index % 4 === 0 ? 'quick_byte' : 'article', // Make every 4th article a quick byte
                imageUrl: article.image,
                url: article.url
            }
        })

    } catch (error) {
        console.error("Error fetching news:", error)
        // Fallback to empty array if the API fails or rate limits
        return []
    }
}
