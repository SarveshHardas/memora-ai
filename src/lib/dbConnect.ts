import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number;
}

const connection: connectionObject = {};

export default async function dbConnect() : Promise<void> {
    if (connection.isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}