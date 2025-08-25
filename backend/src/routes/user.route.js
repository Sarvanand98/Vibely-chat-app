import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import userController from '../controllers/user.controller.js'

const router=express.Router()
router.use(protectedRoute)

router.get("/",userController.getRecommendedUsers)
router.get("/friends",userController.getMyFriends)
router.post("/friends-request/:id", userController.sendFriendRequest)
router.put("/friends-request/:id/accept", userController.acceptFriendRequest)
router.get("/friends-requests", userController.getFriendRequests)
router.get("/outgoing-friends-requests", userController.getOutgoingFriendReqs)

export default router;