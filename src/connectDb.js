import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()


const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch(err) {
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDbgit