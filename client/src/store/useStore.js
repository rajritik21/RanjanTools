import { create } from 'zustand'

const useStore = create((set) => ({
  theme: localStorage.getItem('rt_theme') || 'light',
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('rt_theme', next)
      document.documentElement.setAttribute('data-theme', next)
      return { theme: next }
    }),

  language: localStorage.getItem('rt_lang') || 'en',
  setLanguage: (lang) => {
    localStorage.setItem('rt_lang', lang)
    set({ language: lang })
  },
}))

export default useStore
