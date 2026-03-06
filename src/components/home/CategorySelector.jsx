import { motion } from 'framer-motion'
import { useStore, CATEGORIES } from '../../store/useStore'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const item = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 }
}

export default function CategorySelector() {
    const { selectedCategories, toggleCategory } = useStore()

    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Personalize Your Universe</h2>
                <p className="text-slate-400">Select the topics you care about to curate your daily news feed.</p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
            >
                {CATEGORIES.map((category) => {
                    const isSelected = selectedCategories.includes(category.id)

                    return (
                        <motion.button
                            key={category.id}
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleCategory(category.id)}
                            className={`
                flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300
                backdrop-blur-sm
                ${isSelected ? category.active : category.color}
              `}
                        >
                            <span className="text-2xl drop-shadow-md bg-white/10 rounded-full p-2">{category.icon}</span>
                            <span className="font-semibold tracking-wide">{category.label}</span>
                        </motion.button>
                    )
                })}
            </motion.div>

            {selectedCategories.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center text-sm font-medium text-slate-300"
                >
                    {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'} curated for you.
                </motion.div>
            )}
        </section>
    )
}
