import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname:{
        required:true,
        type:String,
        trim:true
    },
    username:{
        required:true,
        type:String,
        unique:true,
        trime:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})


export default mongoose.model("User",userSchema)