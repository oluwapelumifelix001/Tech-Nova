import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <section className="relative w-full max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-sky-500/10 blur-[100px] rounded-full point-events-none" />
            <div className="absolute top-0 right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[100px] rounded-full point-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-medium text-sky-400">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    New: The "Ask Nova" AI Assistant is live
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    The future of <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                        science & technology.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Stay ahead of the curve with personalized news bites covering AI, robotics, space, and quantum computing. Simplified for everyone, powered by AI.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/feed" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                        Start Reading <ArrowRight size={18} />
                    </Link>
                    <a href="#subscribe" className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        Subscribe Free
                    </a>
                </div>

                <div className="mt-12 flex items-center justify-center gap-4 text-sm text-slate-400">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border border-slate-800 bg-slate-700 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-sky-400" />
                        Join <span className="text-white font-medium">10,000+</span> curious minds
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
