import { create } from 'zustand'
import axios from 'axios'

const useChatStore = create((set) => ({
    users: [],
    selectedUser: null,
    messages: [],

    getUsers: async () => {
        try {
            const res = await axios.get('/api/users')
            set({ users: res.data })
        } catch (error) {
            console.error(error)
            alert("Failed to fetch users")
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user })
    },

    getMessages: async (userId) => {
        try {
            const res = await axios.get(`/api/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            console.error(error)
            alert("Failed to fetch messages")
        }
    },

    sendMessage: async (userId, message) => {
        try {
            const res = await axios.post(`/api/messages/${userId}`, { message })
            set((state) => ({ messages: [...state.messages, res.data] }))
        } catch (error) {
            console.error(error)
            alert("Failed to send message")
        }
    }

}))

export default useChatStore