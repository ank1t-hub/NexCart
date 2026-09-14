import {v2 as cloudinary} from "cloudinary"
import {productModel} from "../models/ProductModel.js"

//function for add product
const addProduct = async (req,res) => {  //to add a product we use a middleware by using multer 
    try {
        const {name ,description, price, category, subCategory, sizes, bestSeller} = req.body
        // const image1 = req.files.image1 || req.files.image1[0]
        // const image2 = req.files.image2 || req.files.image2[0]
        // const image3 = req.files.image3 || req.files.image3[0]
        // const image4 = req.files.image4 || req.files.image4[0]
        const image1 = req.files && req.files.image1 ? req.files.image1[0] : undefined;
        const image2 = req.files && req.files.image2 ? req.files.image2[0] : undefined;
        const image3 = req.files && req.files.image3 ? req.files.image3[0] : undefined;
        const image4 = req.files && req.files.image4 ? req.files.image4[0] : undefined;

        console.log(name ,description, price, category, subCategory, sizes, bestSeller);
        console.log(image1,image2,image3,image4);
        
        const images  = [image1,image2,image3,image4].filter((item) => item !== undefined )//now before uploading these local storage files to database upload these on cloudinary for storage related issue of database
        console.log(images); 
        
        //uploading on cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        // console.log(imagesUrl);
        

        //Now uploading this cloudinary url to database
        const  productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller === "true" ? true : false, //converting string into bolean
            sizes:sizes ? JSON.parse(sizes) : [] , //string to array,
            image:imagesUrl,
            date:Date.now()
        }
        console.log(productData);
        const product = new productModel(productData) //using product model to create product which can saved to database
        await product.save()
        
        return res.json({success:true,message:"product added"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}//now here anyone can add producty using this route later we add authentication so only admin can able to addd product



//function for list product
const listProduct = async (req,res) => {
      try {
        const products = await productModel.find({})
        res.json({success:true,products})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})

      }
}



//function for remove product
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(201).json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error);
        res.status(401).json({success:false,message:error.message})
    }
}//this fuction(route) is also open to any one later we add authentication so only admin can delete products





//function for single product info
const singleProduct = async (req,res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.status(202).json({success:true,product})
    } catch (error) {
        console.log(error);
        res.status(402).json({success:false,message:error.message})
    }
}




export {addProduct,listProduct,removeProduct,singleProduct}