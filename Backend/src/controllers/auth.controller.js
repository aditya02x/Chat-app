import User from '../models/User.model.js'
import bcrypt from 'bcrypt'

export const signup = async (req,res)=>{
    try {
        const {fullname,username,password}=req.body

        if(!fullname || !username || !password){
            return res.status(404).json({menubar:"all credintial are required"})
        }

        const existUser = await User.findOne({username})

        if(existUser){
            return res.status(400).json({mesage:"user allready exist"})
        }

        //hash password
    

        const hashpassword = await bcrypt.hash(password,10)

        const user = new User({
            fullname,
            username,
            password:hashpassword
        })
       
        await user.save()
        res.status(201).json({ message: "User created successfully" })


        
    } catch (error) {
        console.error(error)
        return res.staus(500).json({mesage:"Server error"})
        
    }
}
export const login =async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}