import Message from '../models/Message.model.js'

export const sendMessage = async (req, res) => {
    try {
        const {id:receiverId} =req.params;
    const {message} =req.body;
    const senderId = req.user._id


    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })

    await newMessage.save()

    res.status(201).json(newMessage)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Server error"})
        
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: otherUserId } = req.params
const myId = req.user._id

const messages = await Message.find({
    $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId }
    ]
})
res.status(200).json(messages)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Server error"})
        
    }
}