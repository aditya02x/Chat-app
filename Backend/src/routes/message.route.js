import express from 'express'
import authMiddleware from '../middleware/protectRoute.js'
import { getMessage, sendMessage } from '../controllers/message.controller.js'
const router = express.Router()

router.post('/:id',authMiddleware,sendMessage)
router.get('/:id',authMiddleware,getMessage)

export default router;