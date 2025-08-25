import express from 'express'
import authcontroller from '../controllers/auth.controller.js'
import { protectedRoute } from '../middleware/auth.middleware.js'
const router= express.Router()

router.post("/signup",authcontroller.signup)
router.post("/login",authcontroller.login)
router.post("/logout",authcontroller.logout)
router.post("/delete",protectedRoute,authcontroller.delete)
router.post("/onboard",protectedRoute,authcontroller.onboard)

router.get("/me",protectedRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})

export default router;