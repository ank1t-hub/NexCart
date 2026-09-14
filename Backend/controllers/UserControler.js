// here we add logic  using that we allow user to create account and login
import {userModel} from '../models/UserModel.js'
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => { //this function is created after creating token variable in loginuser and registeruser as token
    return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
             return res.json({success:false,message:"User does not exists"})
        }

        const isMatch =  await bcrypt.compare(password,user.password) //here user.password is password stored in database
        if (isMatch) {
            const token = createToken(user._id)
            return res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
} //we are using this function for routes so here we have req and res 


//route for user register
const registerUser = async (req,res) => {
    // res.json({msg:"register API is Working"})
    try {
        const {name,email,password}= req.body
        
        //checking user already exist or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {   //here validator is built in validator for eamil
             return res.json({success:false,message:"Please enter a valid email"})
        }
        if (password.length < 8) {   //here validator is built in validator for eamil
             return res.json({success:false,message:"Please enter a Strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)  //using this token user can login to apllication
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//route for admin Login
const adminlogin = async (req,res) => {
    try {
        const {email,password}=req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password , process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {loginUser,registerUser,adminlogin}