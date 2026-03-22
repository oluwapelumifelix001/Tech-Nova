import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Rss, Home, Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const closeMenu = () => setIsOpen(false)

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/feed', label: 'Feed', icon: Rss },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled 
                        ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20'
                        : 'bg-slate-950'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link 
                            to="/" 
                            onClick={closeMenu}
                            className="flex items-center gap-3 group"
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                                    <Sparkles size={20} className="relative z-10" />
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-sky-400 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight text-white leading-none">
                                    Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Nova</span>
                                </span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium mt-0.5">Science & Tech</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.path)
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                            active 
                                                ? 'text-white' 
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                    >
                                        {active && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-slate-800 rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Icon size={16} className={active ? 'text-sky-400' : ''} />
                                            {item.label}
                                        </span>
                                    </Link>
                                )
                            })}
                            
                            <div className="w-px h-6 bg-slate-800 mx-2" />
                            
                            <Link
                                to="/ask"
                                className="group relative px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Ask Nova
                                    <Sparkles size={14} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden relative w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={20} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMenu}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-slate-950 border-l border-slate-800 z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full p-6 pt-24">
                                <div className="flex-1 flex flex-col gap-2">
                                    {navItems.map((item, index) => {
                                        const Icon = item.icon
                                        const active = isActive(item.path)
                                        return (
                                            <motion.div
                                                key={item.path}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    to={item.path}
                                                    onClick={closeMenu}
                                                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                                                        active 
                                                            ? 'bg-slate-800 text-white' 
                                                            : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                            active ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800'
                                                        }`}>
                                                            <Icon size={18} />
                                                        </div>
                                                        <span className="font-medium">{item.label}</span>
                                                    </div>
                                                    <ChevronRight size={16} className={active ? 'text-sky-400' : 'text-slate-600'} />
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                    
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-4"
                                    >
                                        <Link
                                            to="/ask"
                                            onClick={closeMenu}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                    <Sparkles size={18} />
                                                </div>
                                                <div>
                                                    <span className="font-semibold block">Ask Nova</span>
                                                    <span className="text-xs text-indigo-200">AI Assistant</span>
                                                </div>
                                            </div>
                                            <ChevronRight size={16} />
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Mobile Footer */}
                                <div className="pt-6 border-t border-slate-800">
                                    <p className="text-xs text-slate-500 text-center">
                                        © 2024 TechNova. Curating the future.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}