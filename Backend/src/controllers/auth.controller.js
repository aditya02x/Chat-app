import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import generatetoken from '../utils/generateToken.js'

export const signup = async (req,res)=>{
    try {
        const {fullname,username,password}=req.body

        if(!fullname || !username || !password){
            return res.status(404).json({message:"all credintial are required"})
        }

        const existUser = await User.findOne({username})

        if(existUser){
            return res.status(400).json({message:"user allready exist"})
        }

        //hash password
    

        const hashpassword = await bcrypt.hash(password,10)

        const user = new User({
            fullname,
            username,
            password:hashpassword
        })
       
        await user.save()
        const token = generatetoken(user._id)
        res.status(201).json({ message: "User created successfully" ,
             user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic
    },
                token
         })


        
    } catch (error) {
        console.error(error)
        return res.status(500).json({mesage:"Server error"})
        
    }
}
export const login =async(req,res)=>{
    try {
        const {username,password} = req.body

        if(!username || !password){
             return res.status(404).json({menubar:"all credintial are required"})
        }

      const user = await User.findOne({username})  

      if(!user){
           return res.status(400).json({mesage:"user doesnot exist"})
      }

      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch){
        return res.status(400).json({message:"INVALID CREDINTIAL"})
      }
      const token = generatetoken(user._id)

              res.status(201).json({ message: "login sucessfully",
                 user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic
    },
                token
               })

      
        
    } catch (error) {
         console.error(error)
        return res.status(500).json({message:"Server error"})
    }
}