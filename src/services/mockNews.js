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
        if (!selectedCategoryIds || selectedCategoryIds.length === 0) {
            const query = 'technology OR science'
            const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${GNEWS_API_KEY}`
            
            const response = await fetch(url)
            if (!response.ok) throw new Error(`GNews API error: ${response.status}`)
            
            const data = await response.json()
            if (!data.articles) return []
            
            return data.articles.map((article, index) => ({
                id: article.url,
                categoryId: CATEGORIES[index % CATEGORIES.length].id,
                headline: article.title,
                summary: article.description,
                takeaway: `Source: ${article.source.name}`,
                readTime: '3 min read',
                type: index % 4 === 0 ? 'quick_byte' : 'article',
                imageUrl: article.image,
                url: article.url
            }))
        }

        // If categories are selected, fetch them sequentially with a 1-second delay
        let allArticles = []
        
        for (let i = 0; i < selectedCategoryIds.length; i++) {
            const categoryId = selectedCategoryIds[i]
            const query = getSearchQueryForCategory(categoryId)
            const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${GNEWS_API_KEY}`
            
            // Respect GNews free tier limit of 1 request per second
            if (i > 0) {
                await new Promise(resolve => setTimeout(resolve, 1050))
            }
            
            const response = await fetch(url)
            
            if (!response.ok) {
                console.error(`GNews API error for ${categoryId}: ${response.status}`)
                continue // Skip this category if it fails, but continue with others
            }   
            
            const data = await response.json()
            if (data.articles) {
                const mappedArticles = data.articles.map((article, index) => ({
                    id: `${article.url}-${categoryId}`, // Ensure unique IDs across categories
                    categoryId: categoryId,
                    headline: article.title,
                    summary: article.description,
                    takeaway: `Source: ${article.source.name}`,
                    readTime: '3 min read',
                    type: index % 4 === 0 ? 'quick_byte' : 'article',
                    imageUrl: article.image,
                    url: article.url
                }))
                allArticles = [...allArticles, ...mappedArticles]
            }
        }

        // Shuffle articles so they are mixed instead of grouped strictly by category
        for (let i = allArticles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allArticles[i], allArticles[j]] = [allArticles[j], allArticles[i]];
        }

        return allArticles
    } catch (error) {
        console.error("Error fetching news:", error)
        // Fallback to empty array if all fetch attempts completely fail
        return []
    }
}
