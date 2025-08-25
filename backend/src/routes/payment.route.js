import express from "express"
import paymentController from "../controllers/payment.controller.js";
import { protectedRoute } from '../middleware/auth.middleware.js'
const router= express.Router()


router.post("/paymentmethod",protectedRoute,paymentController.payment)
router.get("/data",protectedRoute,paymentController.data)

export default router;