//this is the first file for authentication here we write code for authentication of admin so we can use this middleware to controller function like add product and remove product so that only user can use that functions 
import jwt from "jsonwebtoken" 

const adminAuth = async (req,res,next) => {
 try {
    const { token } = req.headers
    if (!token) {
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
    const token_decode= jwt.verify(token,process.env.JWT_SECRET)
    if (token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
    next()
 } catch (error) {
    console.log(error);
        return res.json({success:false,message:error.message})    
 }
}//here next is a callback function




export default adminAuth