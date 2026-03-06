import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
    persist(
        (set) => ({
            selectedCategories: [],
            toggleCategory: (categoryId) =>
                set((state) => {
                    const isSelected = state.selectedCategories.includes(categoryId)
                    if (isSelected) {
                        return {
                            selectedCategories: state.selectedCategories.filter((id) => id !== categoryId),
                        }
                    } else {
                        return {
                            selectedCategories: [...state.selectedCategories, categoryId],
                        }
                    }
                }),
            userEmail: null,
            setUserEmail: (email) => set({ userEmail: email }),
        }),
        {
            name: 'technova-storage',
        }
    )
)

export const CATEGORIES = [
    { id: 'ai', label: 'Artificial Intelligence', icon: '🤖', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20 hover:border-sky-500/50', active: 'bg-sky-500/20 border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.3)]' },
    { id: 'robotics', label: 'Robotics', icon: '🦾', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:border-orange-500/50', active: 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' },
    { id: 'bio', label: 'Biotechnology', icon: '🧬', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50', active: 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
    { id: 'space', label: 'Space Exploration', icon: '🚀', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-500/50', active: 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' },
    { id: 'climate', label: 'Climate Tech', icon: '🌱', color: 'bg-lime-500/10 text-lime-400 border-lime-500/20 hover:border-lime-500/50', active: 'bg-lime-500/20 border-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.3)]' },
    { id: 'quantum', label: 'Quantum Computing', icon: '⚛️', color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 hover:border-fuchsia-500/50', active: 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)]' },
    { id: 'gadgets', label: 'Gadgets', icon: '📱', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:border-rose-500/50', active: 'bg-rose-500/20 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' },
    { id: 'future', label: 'Future of Work', icon: '💼', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20 hover:border-violet-500/50', active: 'bg-violet-500/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]' },
]
