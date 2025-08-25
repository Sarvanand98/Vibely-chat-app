import mongoose, { connect } from 'mongoose'

export const connectDB =async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected ${connect.connection.host}`);
        
    }
    catch(error){
        console.log("error in connecting db",error);
        
    }
}