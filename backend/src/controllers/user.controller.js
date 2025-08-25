import User from "../models/User.js"
import FriendRequest from "../models/friendRequest.js"

export default{
    getRecommendedUsers: async(req,res)=>{
        try {
            const currentUserId=req.user._id
            const currentUser=await User.findById(currentUserId)
            
            const RecommendedUser=await User.find({
                $and:[
                    {_id:{$ne:currentUserId}},
                    {_id:{$nin:currentUser.friends}},
                    {isOnboarded:true}
                ]
            })

            res.status(200).json(RecommendedUser)
        } catch (error) {
            console.log("Error in getting recommended users", error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    },
    getMyFriends: async(req,res)=>{
        try {
            const user =await User.findById(req.user.id)
            .select("friends")
            .populate("friends","fullName profilePic learningLanguage nativeLanguage")

            res.status(200).json(user.friends)
        } catch (error) {
            console.log("Error in getting my friends", error);
            res.status(500).json({ message: "Internal Server Error" })

            
        }

    },
    sendFriendRequest: async(req,res)=>{
        try {
            const myId=req.user.id;
            const {id:recipientId} =req.params;

            if(myId===recipientId){
                return res.status(400).json({message:"You cannot send a friend request to yourself"})
            }

            const recipient=await User.findById(recipientId)
            if(!recipient){
                return res.status(404).json({message:"Recipient not found"})
            }

            if(recipient.friends.includes(myId)){
                return res.status(400).json({message:"You are already friends with this user"})
            } 
            const existFriendRequest=await FriendRequest.findOne({
                 $or:[
                    {sender:myId,recipient:recipientId},
                    {sender:recipientId,recipient:myId}
                ],
            })

            if(existFriendRequest){
                return res.status(400).json({message:"Friend request already exists"})
            }
            
            const friendRequest=await FriendRequest.create({
                sender:myId,
                recipient:recipientId
            })
            res.status(201).json( friendRequest)
        } catch (error) {
            console.log("Error in sending friend request", error);
            res.status(500).json({ message: "Internal Server Error" })
            
        }
    },
    acceptFriendRequest :async(req,res)=>{
        try {
            const {id:requestId}=req.params;

            const friendRequest=await FriendRequest.findById(requestId)
            if(!friendRequest){
                return res.status(404).json({message:"Friend request not found"})
            }

            if(friendRequest.recipient.toString()!==req.user.id){
                return res.status(403).json({message:"You are not authorized to accept this friend request"})
            }

            friendRequest.status="accepted"
            await friendRequest.save()

            await User.findByIdAndUpdate(friendRequest.sender,{
                $addToSet:{friends:friendRequest.recipient}
            })
            await User.findByIdAndUpdate(friendRequest.recipient,{
                $addToSet:{friends:friendRequest.sender}
            })

            res.status(200).json({message:"Friend Request Accepted"})

        } catch (error) {
            console.log("Error in accepting friend request", error);
            res.status(500).json({ message: "Internal Server Error" })
            
        }
    },
    getFriendRequests: async(req,res)=>{
        try {
            const incomingReq=await FriendRequest.find({
                recipient:req.user.id,
                status:"pending"
            }).populate("sender","fullName profilePic nativeLanguage learningLanguage")

            const acceptedReq=await FriendRequest.find({
                sender:req.user.id,
                status:"accepted"
            }).populate("recipient","fullName profilePic ")
            res.status(200).json({
                incomingReq,
                acceptedReq
            })

        } catch (error) {
            console.log("Error in getting friend requests", error);
            res.status(500).json({ message: "Internal Server Error" })
            
        }
    },
    getOutgoingFriendReqs :async(req,res)=>{
        try {
            const outgoingRequests= await FriendRequest.find({
                sender:req.user.id,
                status:"pending"
            }).populate("recipient","fullName profilePic nativeLanguage learningLanguage")
            res.status(200).json(outgoingRequests)
            
        } catch (error) {
            console.log("Error in getting outgoing friend requests", error);
            res.status(500).json({ message: "Internal Server Error" })
            
        }
    }

}
