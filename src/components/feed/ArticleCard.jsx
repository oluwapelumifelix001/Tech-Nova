import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../store/useStore'
import { useState } from 'react'

export default function ArticleCard({ article }) {
    const [isSaved, setIsSaved] = useState(false)
    const navigate = useNavigate()
    const category = CATEGORIES.find(c => c.id === article.categoryId) || CATEGORIES[0]

    const handleExplain = () => {
        navigate('/ask', { state: { contextArticle: article } })
    }

    const isQuickByte = article.type === 'quick_byte'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel rounded-2xl p-6 transition-all border ${category.color.split(' ')[0]} border-white/5 hover:border-white/20`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${category.color.replace(' text-', ' bg-').replace('/10', '/20')} bg-opacity-20 backdrop-blur-md`}>
                    <span>{category.icon}</span> {category.label}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-medium bg-black/20 px-2 py-1 rounded-md">
                        {article.readTime}
                    </span>
                    <button
                        onClick={() => setIsSaved(!isSaved)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        {isSaved ? <BookmarkCheck size={18} className="text-sky-400" /> : <Bookmark size={18} />}
                    </button>
                </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
                    {article.headline}
                </a>
            </h3>

            {article.imageUrl && (
                <div className="w-full h-48 md:h-64 mb-4 rounded-xl overflow-hidden relative">
                    <img
                        src={article.imageUrl}
                        alt={article.headline}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
                </div>
            )}

            <div className="mb-4 relative pl-4 border-l-2 border-slate-700">
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {article.summary}
                </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-400 to-indigo-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Key Takeaway</h4>
                <p className="text-sm font-medium text-slate-200">
                    {article.takeaway}
                </p>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleExplain}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 hover:text-indigo-200 transition-colors text-sm font-semibold border border-indigo-500/20"
                >
                    <Sparkles size={16} /> Explain Further
                </button>
            </div>
        </motion.div>
    )
}
