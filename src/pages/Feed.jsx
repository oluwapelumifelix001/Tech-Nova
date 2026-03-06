import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Zap } from 'lucide-react'
import { useStore } from '../store/useStore'
import { fetchNewsFeed } from '../services/mockNews'
import ArticleCard from '../components/feed/ArticleCard'

export default function Feed() {
    const { selectedCategories } = useStore()
    const [activeTab, setActiveTab] = useState('all') // 'all' or 'my-feed'
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadNews = async () => {
            setIsLoading(true)
            const data = await fetchNewsFeed(selectedCategories)
            setArticles(data)
            setIsLoading(false)
        }
        loadNews()
    }, [selectedCategories]) // Trigger refetch when categories change

    const filteredArticles = useMemo(() => {
        if (activeTab === 'all') return articles
        if (selectedCategories.length === 0) return []
        return articles.filter(article => selectedCategories.includes(article.categoryId))
    }, [articles, activeTab, selectedCategories])

    const mainArticles = filteredArticles.filter(a => a.type === 'article')
    const quickBytes = filteredArticles.filter(a => a.type === 'quick_byte')

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Tech Nova Feed</h1>
                    <p className="text-slate-400">The latest breakthroughs and discoveries.</p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-xl backdrop-blur-md border border-white/10 w-fit">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'all'
                            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        All News
                    </button>
                    <button
                        onClick={() => setActiveTab('my-feed')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'my-feed'
                            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Filter size={14} /> My Feed
                        {selectedCategories.length > 0 && (
                            <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">
                                {selectedCategories.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-slate-700 border-t-sky-500 rounded-full animate-spin" />
                </div>
            ) : filteredArticles.length === 0 ? (
                <div className="text-center py-20 glass-panel rounded-3xl border-dashed">
                    <p className="text-slate-400 mb-4">You haven't selected any categories yet.</p>
                    <button
                        onClick={() => {
                            window.scrollTo(0, 0)
                            window.location.href = '/'
                        }}
                        className="text-sky-400 hover:text-sky-300 font-medium underline underline-offset-4"
                    >
                        Go to home to personalize your feed
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold border-b border-white/10 pb-4 mb-6">Deep Dives</h2>
                        <AnimatePresence mode="popLayout">
                            {mainArticles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ArticleCard article={article} />
                                </motion.div>
                            ))}
                            {mainArticles.length === 0 && (
                                <p className="text-slate-400 italic">No deep dives available for this selection.</p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar / Quick Bytes */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-white/10 pb-4 mb-6 flex items-center gap-2 text-amber-400">
                            <Zap size={20} className="fill-amber-400" /> Quick Bytes
                        </h2>
                        <AnimatePresence mode="popLayout">
                            {quickBytes.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/40 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                                            30 sec read
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{article.headline}</h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">{article.summary}</p>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-semibold hover:bg-amber-500/30 transition-colors"
                                    >
                                        Read summary
                                    </a>
                                </motion.div>
                            ))}
                            {quickBytes.length === 0 && (
                                <p className="text-slate-400 italic">No quick bytes currently available.</p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    )
}
