import { create } from 'zustand'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,

    signup: async (data) => {
        try {
            set({ isLoading: true })
            const res = await axios.post('/api/auth/signup', data)
            set({ user: res.data.user })
        } catch (error) {
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },

    login: async (data) => {
        try {
            set({ isLoading: true })
            const res = await axios.post('/api/auth/login', data)
            set({ user: res.data.user })
        } catch (error) {
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    },

    logout: () => {
        set({ user: null })
    }

}))

export default useAuthStore