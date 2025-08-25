import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import {  upsertStream } from "../lib/stream.js"

export default {
    signup: async (req, res) => {
        const { email, password, fullName } = req.body
        try {
            if (!email || !password || !fullName) {
                return res.status(400).json({ message: "All field are Required" })
            }
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be 6 characters" })

            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }
            const existUser = await User.findOne({ email })
            if (existUser) {
                return res.status(400).json({ message: "Email Already Exists!" });

            }
            const idx = Math.floor(Math.random() * 100) + 1;
            const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                email, password: hashedPassword, fullName, profilePic: randomAvatar
            })

            try {
                await upsertStream({
                id:newUser._id.toString(),
                name:newUser.fullName,
                image:newUser.profilePic||""
            })
            console.log(`Stream User created ${newUser.fullName}`);
            
            } catch (error) {
                console.log("Error creating new user",error);
                
            }
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "7d"
            })

            res.cookie("jwt", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                samesite: "strict",
                secure: process.env.NODE_ENV === "production"
            })
            res.status(201).json({ success: true, user: newUser, message: "User created" })
        } catch (error) {
            console.log("error in signup controller!", error);
            res.status(500).json({ message: "Internal Server Error!" })

        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({ message: "All field are Required" })
            }
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(401).json({ message: "Invalid Email or Password" })
            }
            const passwordMatch = await bcrypt.compare(password,user.password)
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid Email or Password" });
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "7d"
            })

            res.cookie("jwt", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                samesite: "strict",
                secure: process.env.NODE_ENV === "production"
            })
             res.status(200).json({ success: true, user, message: "Login successful" });
        } catch (error) {
             console.log("error in login controller!", error);
            res.status(500).json({ message: "Internal Server Error!" });
        }
    },

    logout: async (req,res)=>{
        res.clearCookie("jwt")
        res.status(200).json({success:true, message: "Logout!" });
    },
    onboard: async(req,res)=>{
      try {
        const userId = req.user._id

        const{fullName,bio,location,learningLanguage,nativeLanguage}=req.body

        if(!fullName||!bio||!location||!learningLanguage||!nativeLanguage){
            res.status(400).json({
                message:"All feilds Required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !location && "location",
                    !learningLanguage && "learningLanguage",
                    !nativeLanguage && "nativeLanguage"
                ].filter(Boolean)
            })
        }
        const updateUser=await User.findByIdAndUpdate(userId,{
            ...req.body,isOnboarded:true
        },{new:true}) 
        if(!updateUser){
            return res.status(404).json({ message: "User not found" })

        }
        try {
            await upsertStream({
            id: updateUser._id.toString(),
            name:updateUser.fullName,
            image:updateUser.profilePic||""
        })
            console.log(`Stream User updated ${updateUser.fullName}`);


        } catch (error) {
            console.log("Error in upserting stream", error);
        }
        res.status(200).json({ success: true, user: updateUser })
      } catch (error) {
        console.log("Error in onboarding ", error);
        res.status(500).json({ message: "Internal Server Error" })

      }
        
    },
    delete: async (req,res)=>{
        try {
            const id =req.user._id;
            const Userexist= await User.findByIdAndDelete(id);
            if(!Userexist){
                res.status(400).json({message:"User Not Found!"})
                
            }
             res.status(200).json({ success: true, message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal Server Error!" });
        }
        
    }

}