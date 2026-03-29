import express from 'express'
import { getAllUsers } from '../controllers/user.controller.js'
import authMiddleware from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/', authMiddleware, getAllUsers)

export default router