import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()


 const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo Db connect to the database")
        
    } catch (error) {
        console.error(error)
        return console.log("FAILED TO CONNECT TO DATABASE")
       
        
    }
}

export default connectDb