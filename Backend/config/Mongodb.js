import mongoose from 'mongoose'

import dns from "node:dns";
// Force Node.js to use public Google DNS to bypass network/SRV blocks
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const connectDb= async  () => {
    mongoose.connection.on(`connected`,() => {
        console.log("DB CONNECTED");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`) 
}

export default connectDb;