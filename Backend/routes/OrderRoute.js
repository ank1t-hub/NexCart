import express from 'express'


import { placeOrder,placeOrderGpay,placeOrderRazorpay,placeOrderPhonepay,AllOrders,UserOrders,UpdateStatus}  from '../controllers/OrderController.js'
import adminAuth from '../middleware/AdminAuthMidleware.js'
import authUser from '../middleware/Auth.js'

const OrderRouter = express.Router()


//admin features
OrderRouter.post('/list',adminAuth,AllOrders)
OrderRouter.post('/status',adminAuth,UpdateStatus)


//Payment features 
OrderRouter.post('/place',authUser,placeOrder)
OrderRouter.post('/gpay',authUser,placeOrderGpay)
OrderRouter.post('/razorpay',authUser,placeOrderRazorpay)
OrderRouter.post('/phonepay',authUser,placeOrderPhonepay)




//user Features
OrderRouter.post('/userorders',authUser,UserOrders)


// orderRouter.post('/verifyStripe',authUser,verifyStripe)



export default OrderRouter