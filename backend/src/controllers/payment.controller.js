import User from '../models/User.js'

export default{
    payment: async (req,res)=>{
        try {
            const {type,label,details}=req.body;
            if(type==="p2p"){
                res.status(400).json({message:"p2p method coming soon"})
            }
            const user=await User.findById(req.user.id)
            user.paymentMethods.push({type,label,details})
            await user.save();
            res.status(201).json({ paymentMethods: user.paymentMethods })
        } catch (error) {
                console.log(error);
              res.status(500).json({ message: 'Failed to add payment method' });
        }
    },
    data: async(req,res)=>{
        try {
            const user=await User.findById(req.user.id).select("paymentMethods")
            res.json({ details: user.paymentMethods });

        } catch (error) {
            res.status(500).json({ message: 'Failed to get wallet addresses' });
        }
    }
}