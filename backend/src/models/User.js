import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const PaymentMethodSchema = new mongoose.Schema({
    type: { type: String, enum: ["upi", "card", "bank", "wallet", "phonepe", "gpay","Crypto","p2p"], required: true },
    label: { type: String, default: "" },
    details: { type: mongoose.Schema.Types.Mixed }, 
    addedAt: { type: Date, default: Date.now }
});
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    isOnboarded: {
        type: Boolean,
        default: false,
    },
    
    paymentMethods: [PaymentMethodSchema],

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]

}, { timestamps: true })

const User = mongoose.model("User", userSchema)
// userSchema.pre("save", async (next) => {
//     try {
//         const salt = await bcrypt.genSalt(10)
//         this.password = await bcrypt.hash(this.password, salt)
//         next()
//     } catch (error) {
//         next(error)
//     }
// })
export default User;