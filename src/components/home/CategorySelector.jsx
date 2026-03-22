import { motion } from 'framer-motion'
import { useStore, CATEGORIES } from '../../store/useStore'
import { Check, Sparkles, RefreshCcw } from 'lucide-react'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { 
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
}

export default function CategorySelector() {
    const { selectedCategories, toggleCategory } = useStore()
    const selectedCount = selectedCategories.length

    const handleReset = () => {
        selectedCategories.forEach(id => toggleCategory(id))
    }

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-24 relative">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 relative"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 mb-6">
                    <Sparkles size={14} className="text-sky-400" />
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Customize</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Curate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Feed</span>
                </h2>
                
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Select the domains that shape your world. We'll surface the breakthroughs that matter most to you.
                </p>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto relative"
            >
                {CATEGORIES.map((category, index) => {
                    const isSelected = selectedCategories.includes(category.id)
                    const Icon = category.icon

                    return (
                        <motion.button
                            key={category.id}
                            variants={item}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleCategory(category.id)}
                            className={`
                                group relative flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden
                                ${isSelected 
                                    ? 'bg-slate-900 border-sky-500/50 shadow-lg shadow-sky-500/10' 
                                    : 'bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                                }
                            `}
                        >
                            {/* Selection Indicator */}
                            <div className={`
                                absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                ${isSelected 
                                    ? 'bg-sky-500 border-sky-500 scale-100' 
                                    : 'border-slate-600 scale-90 opacity-0 group-hover:opacity-50'
                                }
                            `}>
                                <Check size={12} className={`text-white transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} />
                            </div>

                            {/* Icon Container */}
                            <div className={`
                                relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300
                                ${isSelected 
                                    ? 'bg-gradient-to-br from-sky-500/20 to-indigo-500/20 ring-1 ring-sky-500/30' 
                                    : 'bg-slate-800 group-hover:bg-slate-700'
                                }
                            `}>
                                <span className={isSelected ? 'scale-110' : 'group-hover:scale-105 transition-transform'}>
                                    {category.icon}
                                </span>
                                {isSelected && (
                                    <div className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className={`
                                    font-semibold text-lg mb-1 transition-colors
                                    ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                                `}>
                                    {category.label}
                                </h3>
                                <p className="text-sm text-slate-500 truncate">
                                    {category.description || `${category.label} news & insights`}
                                </p>
                            </div>

                            {/* Hover Gradient */}
                            <div className={`
                                absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 pointer-events-none
                                ${isSelected 
                                    ? 'from-sky-500/5 to-transparent opacity-100' 
                                    : 'group-hover:from-slate-800/50 to-transparent group-hover:opacity-100'
                                }
                            `} />
                        </motion.button>
                    )
                })}
            </motion.div>

            {/* Status Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/50 border border-slate-800">
                    <div className="flex -space-x-2">
                        {[...Array(Math.min(selectedCount || 1, 3))].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-2 h-2 rounded-full ${selectedCount > 0 ? 'bg-sky-400' : 'bg-slate-600'}`}
                                style={{ opacity: selectedCount > 0 ? 1 - (i * 0.2) : 0.3 }}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-medium text-slate-300">
                        {selectedCount === 0 
                            ? 'Select at least one topic' 
                            : `${selectedCount} topic${selectedCount === 1 ? '' : 's'} selected`
                        }
                    </span>
                </div>

                {selectedCount > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        <RefreshCcw size={14} />
                        Reset
                    </motion.button>
                )}
            </motion.div>

            {/* Progress Indicator */}
            {selectedCount > 0 && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 origin-left z-50"
                    style={{ 
                        boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)' 
                    }}
                />
            )}
        </section>
    )
}