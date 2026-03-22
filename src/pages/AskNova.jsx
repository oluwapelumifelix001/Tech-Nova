import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Bot, User, Loader2, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { askNovaAI } from '../services/geminiAI'
import ReactMarkdown from 'react-markdown'

const MODES = [
    { id: 'eli5', label: "Explain like I'm 5", icon: '🧸' },
    { id: 'detailed', label: "Detailed", icon: '📚' },
    { id: 'technical', label: "Deep Dive", icon: '🔬' },
]

export default function AskNova() {
    const location = useLocation()
    const navigate = useNavigate()
    const contextArticle = location.state?.contextArticle || null

    const [messages, setMessages] = useState([{
        id: '1',
        role: 'assistant',
        content: contextArticle
            ? `I see you're reading about "${contextArticle.headline}". What would you like to know? I can explain it simply, give you more details, or dive deep into the tech.`
            : "Hello! I'm Nova, your AI guide to the future. Ask me anything about science, technology, or recent breakthroughs.",
    }])
    const [input, setInput] = useState('')
    const [activeMode, setActiveMode] = useState('detailed')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMsg = input.trim()
        setInput('')

        // Add user message
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }])
        setIsLoading(true)

        try {
            // Call mock AI service
            const response = await askNovaAI(userMsg, activeMode, contextArticle)

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                modeUsed: activeMode
            }])
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSuggested = (question) => {
        setInput(question)
    }

    return (
        <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 py-8 max-h-[calc(100vh-4rem)]">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-medium mb-3 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <span className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg shadow-purple-500/25">
                            <Sparkles size={24} />
                        </span>
                        Ask Nova
                    </h1>
                </div>

                {/* Mode Selector */}
                <div className="flex bg-white/5 p-1 rounded-xl backdrop-blur-md border border-white/10 w-fit">
                    {MODES.map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => setActiveMode(mode.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeMode === mode.id
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span>{mode.icon}</span> <span className="hidden sm:inline">{mode.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden glass-panel relative shadow-2xl">

                {/* Context Banner (if coming from an article) */}
                {contextArticle && (
                    <div className="bg-indigo-500/20 border-b border-indigo-500/20 p-4 flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                        <span className="text-indigo-200">
                            Context active: <span className="font-bold text-white">{contextArticle.headline}</span>
                        </span>
                    </div>
                )}

                {/* Message History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex flex-col max-w-[85%] ${message.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                        >
                            <div className="flex items-center gap-2 mb-2 px-1">
                                {message.role === 'assistant' ? (
                                    <>
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                                            <Bot size={14} className="text-white" />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-400">Nova</span>
                                        {message.modeUsed && (
                                            <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                                                {MODES.find(m => m.id === message.modeUsed)?.label}
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xs font-semibold text-slate-400">You</span>
                                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                                            <User size={14} className="text-white" />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className={`
                p-4 rounded-2xl text-[15px] leading-relaxed
                ${message.role === 'user'
                                    ? 'bg-sky-500 text-white rounded-tr-none'
                                    : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'}
              `}>
                                {message.role === 'user' ? (
                                    message.content
                                ) : (
                                    <div className="space-y-1">
                                        <ReactMarkdown
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                                                h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-5 mb-3 text-white" {...props} />,
                                                h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-5 mb-3 text-white" {...props} />,
                                                h3: ({ node, ...props }) => <h3 className="text-base font-bold mt-4 mb-2 text-white" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3 space-y-1 marker:text-purple-400" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3 space-y-1 marker:text-purple-400" {...props} />,
                                                li: ({ node, ...props }) => <li {...props} />,
                                                code: ({ node, inline, ...props }) =>
                                                    inline ? <code className="bg-black/30 px-1.5 py-0.5 rounded text-[13px] text-sky-300 font-mono" {...props} />
                                                        : <pre className="bg-black/50 p-4 rounded-xl overflow-x-auto my-3 border border-white/5"><code className="text-[13px] font-mono text-slate-300" {...props} /></pre>,
                                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-500/50 pl-4 py-1 italic text-slate-300 bg-white/5 rounded-r-lg my-3" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-sky-400 hover:text-sky-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 text-slate-400 p-2"
                        >
                            <Loader2 className="animate-spin" size={18} />
                            <span className="text-sm font-medium animate-pulse">Nova is thinking...</span>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && !contextArticle && (
                    <div className="px-6 pb-2 flex flex-wrap gap-2 text-sm justify-center">
                        <button onClick={() => handleSuggested("How do quantum computers actually work?")} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-slate-300">
                            How do quantum computers work?
                        </button>
                        <button onClick={() => handleSuggested("What's the latest breakthrough in CRISPR?")} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-slate-300">
                            Latest breakthrough in CRISPR?
                        </button>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                    <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Ask Nova anything (using ${MODES.find(m => m.id === activeMode)?.label} mode)...`}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-white placeholder-slate-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 p-2.5 rounded-full bg-purple-500 text-white hover:bg-purple-400 disabled:opacity-50 disabled:hover:bg-purple-500 transition-colors"
                        >
                            <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Ai can make mistakes. Check important info.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
