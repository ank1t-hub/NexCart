import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/Mongodb.js'
import connectCloudinary from './config/Cloudinary.js'
import userRouter from './routes/UserRoute.js'
import productRouter from './routes/ProductRoute.js'
import cartRouter from './routes/CartRoute.js'
import OrderRouter from './routes/OrderRoute.js'


//App config
const app = express()
const port = process.env.PORT || 4000

void connectDb().catch((error) => {
  console.error('MongoDB startup failed:', error.message)
})

void connectCloudinary().catch((error) => {
  console.error('Cloudinary startup failed:', error.message)
})

//middlewares
app.use(express.json())
app.use(cors())


//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',OrderRouter)

app.get('/',(req,res) => {
    res.send("API Working")
})


//To start the express server locally only
if (!process.env.VERCEL) {
  app.listen(port, () => console.log('server started on port :' + port))
}

export default app;
