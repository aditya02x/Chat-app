import User from '../models/User.model.js'

export const getAllUsers = async (req,res) =>{
    try {
        const loggedInUser = req.user._id
        const users = await User.find({_id:{$ne:loggedInUser}}).select('-password')
        res.status(200).json(users)
        
    } catch (error) {
         console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}