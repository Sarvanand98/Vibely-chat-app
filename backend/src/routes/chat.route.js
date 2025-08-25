import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import chatController from '../controllers/chat.controller.js'
const router=express.Router()

router.use(protectedRoute)
router.get("/token",chatController.getStreamToken)


export default router;