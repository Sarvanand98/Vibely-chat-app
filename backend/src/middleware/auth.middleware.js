import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import "dotenv/config"

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized-no token" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
       
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized-invalid token" })
        }
        const user = await User.findById(decode.userId).select("-password")
        if (!user) {
            return res.status(401).json({ message: "Unauthorized-User not Found" })

        }
        req.user = user

        next()
    }
    catch (error) {
        console.log("Error in Protected Route", error);
        res.status(500).json({ message: "Internal Server Error" })

    }
}