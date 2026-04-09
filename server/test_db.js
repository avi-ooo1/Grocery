import mongoose from 'mongoose';
import 'dotenv/config';

const testConnection = async () => {
    try {
        console.log("Testing connection with URL:", `${process.env.MONGODB_URL}/grocery`);
        await mongoose.connect(`${process.env.MONGODB_URL}/grocery`, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        console.log("Connected Successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Connection Failed:", error.message);
        process.exit(1);
    }
}

testConnection();
