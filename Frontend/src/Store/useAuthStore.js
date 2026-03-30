import { create } from 'zustand'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,

    signup: async (data) => {
    try {
        set({ isLoading: true })
        console.log("Sending data:", data)  // 👈 ADD THIS
        const res = await axios.post('/api/auth/signup', data)
        set({ user: res.data.user })
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        alert("Signup successful!")
        return true
    } catch (error) {
        console.log("Error:", error.response.data)  // 👈 ADD THIS
        console.error(error)
         alert(error.response.data.message)
         return false
    } finally {
        set({ isLoading: false })
    }
},

    login: async (data) => {
        try {
            set({ isLoading: true })
            const res = await axios.post('/api/auth/login', data)
            set({ user: res.data.user })
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            alert("Login successful!")
            return true
        } catch (error) {
            console.error(error)
             alert(error.response.data.message)
             return false

        } finally {
            set({ isLoading: false })
        }
    },

    logout: () => {
        set({ user: null })
        alert("Logged out successfully!")
  
    }

}))

export default useAuthStore