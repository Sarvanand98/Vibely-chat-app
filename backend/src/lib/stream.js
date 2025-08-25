import { StreamChat } from "stream-chat";
import "dotenv/config"

const apiKey=process.env.STREAM_API_KEY
const apiSecret=process.env.STREAM_API_SECRET

if(!apiKey||!apiSecret){
    console.error("Stream Crediential Missing");
}
const StreamClient=StreamChat.getInstance(apiKey,apiSecret)

export const upsertStream= async (userData)=>{
    try {
        await StreamClient.upsertUser(userData)
        return userData
    } catch (error) {
        console.error("Error creating User to Strem",error);
        
    }
}

export const generateStreamToken =(userId)=>{
   try {

    const userIdStr = userId.toString();
    return StreamClient.createToken(userIdStr);

} catch (error) {

    console.error("Error generating Stream",error)
}

}