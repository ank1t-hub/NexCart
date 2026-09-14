import mongoose from 'mongoose'

import dns from "node:dns";
// Force Node.js to use public Google DNS to bypass network/SRV blocks
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const connectDb = async () => {
    if (!process.env.MONGODB_URI) {
        console.warn('MONGODB_URI is not set. Skipping database connection.');
        return;
    }

    mongoose.connection.on('connected', () => {
        console.log('DB CONNECTED')
    })

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error.message)
    })

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'e-commerce'
        })
    } catch (error) {
        console.error('MongoDB connect failed:', error.message)
        throw error
    }
}

export default connectDb;