import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Rss, Home, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const closeMenu = () => setIsOpen(false)

    const NavLinks = () => (
        <>
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-400 transition-colors py-2 md:py-0">
                <Home size={16} /> Home
            </Link>
            <Link to="/feed" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-400 transition-colors py-2 md:py-0">
                <Rss size={16} /> Feed
            </Link>
            <Link to="/ask" onClick={closeMenu} className="w-fit mt-2 md:mt-0 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2">
                Ask Nova <Sparkles size={14} />
            </Link>
        </>
    )

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 flex flex-col bg-[#0f172a]/90 backdrop-blur-xl">
            <div className="w-full px-6 py-4 flex justify-between items-center relative z-20">
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-xl font-bold tracking-tight">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white">
                        <Sparkles size={18} />
                    </div>
                    Tech<span className="text-sky-400">Nova</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <NavLinks />
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-slate-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden border-t border-white/10 bg-[#0f172a]"
                    >
                        <div className="flex flex-col gap-4 p-6 text-sm font-medium">
                            <NavLinks />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
