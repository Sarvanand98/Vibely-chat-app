import express from "express"
import aiController from "../controllers/ai.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router= express.Router()



router.post("/help",protectedRoute,aiController.handle)


export default router;