import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDb from './src/config/db.js'
import { app, httpServer } from './socket/socket.js'
import authroutes from './src/routes/auth.route.js'
import messagesroute from './src/routes/message.route.js'
import userRoutes from './src/routes/user.routes.js'
app.use(cors())

app.use(express.json())  // 👈 add this!


app.get('/',(req,res)=>{
    res.send("Welcome hello world")
})
app.use("/api/auth", authroutes)
app.use('/api/messages',messagesroute)
app.use('/api/users', userRoutes)
const PORT = process.env.PORT || 5000





const startserver = async ()=>{
    try {
        await connectDb()
        httpServer.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

        
    } catch (error) {
        console.error(error)
        
    }
}
startserver()