import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <section className="relative w-full min-h-[80vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-slate-950">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://img.freepik.com/premium-photo/astronaut-suit-against-black-background-space-technology-concept_641298-276.jpg" 
                    alt="Space technology"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" 
                 style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} 
            />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-left"
                    >
                        {/* Live Badge */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-sky-500/20 backdrop-blur-sm mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                            <span className="text-sm font-medium text-sky-400 tracking-wide uppercase text-[10px]">Now Live</span>
                            <span className="text-slate-400 text-sm">Ask Nova AI Assistant</span>
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            The future of{' '}
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                                science & technology
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed font-light">
                            Curated intelligence on AI, robotics, space exploration, and quantum breakthroughs. 
                            Delivered in digestible insights for the intellectually curious.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                            <Link 
                                to="/feed" 
                                className="group px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-sky-50 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105"
                            >
                                Start Reading 
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            
                            <button className="group px-8 py-4 rounded-full bg-slate-900/50 border border-slate-700 text-white font-medium hover:border-sky-500/50 hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                    <Play size={14} fill="currentColor" />
                                </span>
                                Watch Demo
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
                                ].map((src, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 overflow-hidden">
                                        <img src={src} alt="Reader" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <div className="flex items-center gap-1 text-sky-400 mb-0.5">
                                    <Sparkles size={14} />
                                    <span className="font-semibold text-white">10,000+</span>
                                </div>
                                <p className="text-slate-500">Curious minds joined</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Featured Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 backdrop-blur-sm p-8 shadow-2xl">
                            <div className="absolute top-0 right-0 w-30 h-30 bg-sky-500/10 rounded-full blur-3xl" />
                            
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">Trending Now</p>
                                    <h3 className="text-white font-semibold text-lg">SpaceX Starship Launch</h3>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-medium">Space</span>
                            </div>
                            
                            <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-slate-800">
                                <img 
                                    src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&auto=format&fit=crop" 
                                    alt="Space technology"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                The latest orbital test flight marks a significant milestone in reusable rocket technology...
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>5 min read</span>
                                <span>2 hours ago</span>
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    AI
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Nova Assistant</p>
                                    <p className="text-slate-500 text-xs">Ready to help</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
        </section>
    )
}