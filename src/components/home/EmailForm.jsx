import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Mail } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function EmailForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle, loading, success
    const { setUserEmail } = useStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')

        // Simulate API call to MongoDB / Resend
        setTimeout(() => {
            setStatus('success')
            setUserEmail(email)

            // Reset form after a few seconds
            setTimeout(() => {
                setEmail('')
                setStatus('idle')
            }, 5000)
        }, 1500)
    }

    return (
        <section id="subscribe" className="w-full max-w-3xl mx-auto px-6 py-20">
            <div className="relative glass-panel rounded-3xl p-8 md:p-12 overflow-hidden border-sky-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                        <Mail className="text-indigo-400" size={32} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the TechNova Newsletter</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                        Get personalized weekly tech roundups based on your selected interests. No spam, just pure signal.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-md relative flex items-center">
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full bg-black/20 border border-white/10 rounded-full py-4 pl-6 pr-32 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all text-white disabled:opacity-50"
                            required
                        />

                        <div className="absolute right-2">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="flex items-center gap-2 px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded-full font-medium border border-emerald-500/20"
                                    >
                                        <CheckCircle size={18} /> Done
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key="button"
                                        type="submit"
                                        disabled={status === 'loading'}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center px-6 py-2 md:py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full font-medium text-white shadow-lg shadow-sky-500/25 transition-all disabled:opacity-75"
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Subscribe <Send size={16} className="ml-2 hidden sm:block" />
                                            </>
                                        )}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>

                    <p className="mt-6 text-xs text-slate-500">
                        By subscribing, you agree to our privacy policy. Real updates from our MongoDB database via Resend coming soon!
                    </p>
                </div>
            </div>
        </section>
    )
}
