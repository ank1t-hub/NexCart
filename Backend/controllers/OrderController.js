import OrderModel from '../models/OrderModel.js'
import {userModel} from '../models/UserModel.js'
import Stripe from 'stripe'


//global variables
const currency ='inr'
const deliveryCharge = 10

// //gateway Initilize
// const  stripe = new Stripe(process.env.STRIPE_SECRET_KEY)




//placing Order Using Stripe 
// const PlaceOrderStripe = async (req,res) => {
//     try {
//         const {userId,items,amount,address} = req.body
//         const {origin} = req.headers
//         const  orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod:"Stripe",
//             payment:false,
//             date:Date.now()
//         }
//         const newOrder = new OrderModel(orderData)
//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency:currency,
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price * 100
//             },
//             quantity:item.quantity
//         }))
//         line_items.push({
//             price_data: {
//                 currency:currency,
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:deliveryCharge * 100
//             },
//             quantity:1        
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode:'payment',
//         })


//         res.json({success:true,session_url:session.url})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }
// }

// //verify Stripe
// const verifyStripe = async (req,res) => {
//     const {orderId,success,userId} = req.body
//     try {
//         if (succes === "true"){
//             await OrderModel.findByIdAndDelete(orderId,{payment:true})
//             await userModel.findByIdAndDelete(userId,{cartData:{}})
//             res.json({success:true})
//         }
//         else{
//             await OrderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }
// }
// //now add route in OrderRoute.js
// orderRouter.post('/verifyStripe',authUser,verifyStripe)
//now add one page in frontend Verify.jsx(12.38)//and add its route in app .jsx(<Route path='/verify' element={<Verify/>}/>) //this is not secure method to verify payments to veryify payments you have to use webhooks but for now it is enough



// placing order using cod order 
const placeOrder = async (req,res)  => {
    try {
        const {userId,items,amount,address} = req.body

        const  orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})//now if Order is Placed then we have to remove the cartdata of That Useer

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}




// placing order using Gpay order 
const placeOrderGpay = async (req,res)  => {
    try {
        res.json({ success: true, message: "Gpay placeholder working" });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// placing order using razorpay order (12:46)
const placeOrderRazorpay= async (req,res)  => {
    try {
        res.json({ success: true, message: " Razorpay PlaceHoder working" });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}




// placing order using Phonepay order 
const placeOrderPhonepay= async (req,res)  => {
    try {
        res.json({ success: true, message: "Phonepay placeholder working" });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}






//All orders Data for Admin pannel
const AllOrders= async (req,res)  => {
    try {
        const orders = await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}




//User Order data for frontend 
const UserOrders= async (req,res)  => {  //here we display Orders of particular user in its my Oders page 
    try {
        const  {userId} =  req.body
        const orders = await  OrderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}




//Update Order Status 
const UpdateStatus= async (req,res)  => {   //we use this function to change the order status of UserModel which is default as Order placed (And ony admin can Update the order status)
    try {
        const {orderId,status} = req.body
        await OrderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}



export { placeOrder,placeOrderGpay,placeOrderRazorpay,placeOrderPhonepay,AllOrders,UserOrders,UpdateStatus}