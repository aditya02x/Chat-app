import dotenv from 'dotenv'
dotenv.config()
import connectDb from './src/config/db.js'
import express from 'express'


const app = express()
import cors from 'cors'
app.use(cors())

app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Welcome hello world")
})
const PORT = process.env.PORT || 5000





const startserver = async ()=>{
    try {
        await connectDb()
        app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

        
    } catch (error) {
        console.error(error)
        
    }
}
startserver()