import React, { useEffect, useState } from 'react'
import useChatStore from '../store/useChatStore'
import useAuthStore from '../Store/useAuthStore'

const ChatBox = () => {
    const { selectedUser, messages, getMessages, sendMessage } = useChatStore()
    const { user } = useAuthStore()
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser])

    const handleSend = async () => {
        if (!message.trim()) return
        await sendMessage(selectedUser._id, message)
        setMessage('')
    }

    if (!selectedUser) {
        return (
            <div className='flex-1 h-screen flex items-center justify-center bg-[#0a1a2e] text-white'>
                <h1 className='text-2xl'>Select a user to start chatting! 💬</h1>
            </div>
        )
    }

    return (
        <div className='flex-1 h-screen flex flex-col bg-[#0a1a2e] text-white'>

            {/* Header */}
            <div className='p-4 bg-[#082E55] flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center font-bold'>
                    {selectedUser.fullname[0].toUpperCase()}
                </div>
                <h1 className='text-xl font-bold'>{selectedUser.fullname}</h1>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-3'>
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`max-w-xs p-3 rounded-lg ${
                            msg.senderId === user._id
                                ? 'bg-blue-500 self-end'
                                : 'bg-gray-600 self-start'
                        }`}
                    >
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className='p-4 bg-[#082E55] flex gap-3'>
                <input
                    type='text'
                    className='flex-1 p-3 rounded text-black text-lg'
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded'
                >
                    Send
                </button>
            </div>

        </div>
    )
}

export default ChatBox