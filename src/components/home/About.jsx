import { motion } from 'framer-motion'
import { 
    Sparkles, 
    Zap, 
    Globe, 
    Brain, 
    Clock, 
    Shield, 
    ChevronRight,
    ArrowRight,
    Newspaper,
    MessageSquare,
    Bookmark
} from 'lucide-react'
import { useState } from 'react'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
}

const features = [
    {
        id: 'curate',
        icon: Newspaper,
        title: 'Smart Curation',
        description: 'Our AI analyzes thousands of sources daily, surfacing only the breakthroughs that matter to your selected interests.',
        stat: '50K+',
        statLabel: 'Articles processed daily',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
        color: 'from-sky-400 to-blue-500'
    },
    {
        id: 'digest',
        icon: Brain,
        title: 'AI Digestion',
        description: 'Complex research and technical papers transformed into clear, actionable insights you can consume in under 3 minutes.',
        stat: '3 min',
        statLabel: 'Average read time',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
        color: 'from-purple-400 to-indigo-500'
    },
    {
        id: 'assistant',
        icon: MessageSquare,
        title: 'Ask Nova',
        description: 'Your personal research assistant. Ask follow-up questions, dive deeper into topics, or get explanations on demand.',
        stat: '24/7',
        statLabel: 'Always available',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop',
        color: 'from-indigo-400 to-violet-500'
    }
]

const benefits = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Zero loading, instant updates' },
    { icon: Shield, title: 'Bias-Free', desc: 'Multiple perspectives, every story' },
    { icon: Clock, title: 'Time Saved', desc: '2 hours back in your day' },
    { icon: Globe, title: 'Global Coverage', desc: 'Sources from 40+ countries' }
]

export default function HowItWorks() {
    const [activeFeature, setActiveFeature] = useState(features[0])

    return (
        <section className="w-full py-24 relative overflow-hidden bg-slate-950">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                   
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Science news, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                            radically simplified.
                        </span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        We cut through the noise of technical jargon and breaking news alerts to deliver 
                        what actually matters — clear, contextual, and actionable intelligence.
                    </p>
                </motion.div>

                {/* Interactive Feature Showcase */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
                    {/* Left: Feature List */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            const isActive = activeFeature.id === feature.id
                            
                            return (
                                <motion.button
                                    key={feature.id}
                                    variants={item}
                                    onClick={() => setActiveFeature(feature)}
                                    className={`
                                        w-full text-left p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden
                                        ${isActive 
                                            ? 'bg-slate-900 border-sky-500/30 shadow-lg shadow-sky-500/5' 
                                            : 'bg-transparent border-slate-800 hover:border-slate-700 hover:bg-slate-900/30'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className={`
                                            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                                            ${isActive 
                                                ? `bg-gradient-to-br ${feature.color} text-white shadow-lg` 
                                                : 'bg-slate-800 text-slate-400 group-hover:text-white'
                                            }
                                        `}>
                                            <Icon size={24} />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className={`
                                                    text-xl font-semibold transition-colors
                                                    ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                                                `}>
                                                    {feature.title}
                                                </h3>
                                                <ChevronRight 
                                                    size={20} 
                                                    className={`
                                                        transition-all duration-300
                                                        ${isActive ? 'text-sky-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}
                                                    `} 
                                                />
                                            </div>
                                            
                                            <p className={`
                                                text-sm leading-relaxed mb-3 transition-colors
                                                ${isActive ? 'text-slate-300' : 'text-slate-500'}
                                            `}>
                                                {feature.description}
                                            </p>
                                            
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-4 pt-2"
                                                >
                                                    <div>
                                                        <span className="text-2xl font-bold text-white">{feature.stat}</span>
                                                        <span className="text-xs text-slate-500 ml-2 uppercase tracking-wider">{feature.statLabel}</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Active Indicator Line */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeFeature"
                                            className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${feature.color}`}
                                        />
                                    )}
                                </motion.button>
                            )
                        })}
                    </motion.div>

                    {/* Right: Visual Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 shadow-2xl">
                            <motion.img
                                key={activeFeature.image}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7 }}
                                src={activeFeature.image}
                                alt={activeFeature.title}
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                            
                            {/* Floating UI Element */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeFeature.color} flex items-center justify-center`}>
                                        <activeFeature.icon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">{activeFeature.title}</p>
                                        <p className="text-xs text-slate-400">Active now</p>
                                    </div>
                                    <div className="ml-auto flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse delay-75" />
                                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse delay-150" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-sky-500/20 rounded-full blur-2xl" />
                    </motion.div>
                </div>

                {/* Benefits Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon
                        return (
                            <motion.div
                                key={benefit.title}
                                variants={item}
                                className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-300 text-center"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center transition-colors">
                                    <Icon size={24} className="text-sky-400" />
                                </div>
                                <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                                <p className="text-sm text-slate-500">{benefit.desc}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                        <span className="px-6 text-slate-400 text-sm">Ready to upgrade your news diet?</span>
                        <button className="group px-6 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-sky-50 transition-all flex items-center gap-2">
                            Get Started Free
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}