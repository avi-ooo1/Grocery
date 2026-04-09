import mongoose from 'mongoose';
import dns from 'node:dns';

// DNS blocking bypass (Google DNS)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URL || '';
        const cleanUrl = url.trim();
        
        if (!cleanUrl) {
            throw new Error("MONGODB_URL is missing in .env file!");
        }

        const hostPart = cleanUrl.split('@')[1] ? cleanUrl.split('@')[1].split('/')[0] : 'URL_MALFORMED';
        console.log("--- DB Connection Attempt ---");
        console.log("Target Host:", hostPart);

        // Event Listeners
        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB Connected Successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB Connection Error:", err.message);
        });

        // bufferCommands: false ka matlab hai agar connection nahi hua 
        // toh Mongoose query queue nahi karega, seedha error dega.
        mongoose.set('bufferCommands', false);

        // Connection options
        const options = {
            dbName: 'grocery',
            serverSelectionTimeoutMS: 5000, 
            family: 4, // IPv4 force
        };

        // ISKO AWAIT KARNA ZAROORI HAI
        return await mongoose.connect(cleanUrl, options);

    } catch (error) {
        console.error("--- Critical Connection Failure ---");
        console.error("Reason:", error.message);
        console.log("Tip: Fresh connection string use karein aur IP whitelist check karein.");
        process.exit(1); // App stop kar dein agar DB connect na ho
    }
}

export default connectDB;