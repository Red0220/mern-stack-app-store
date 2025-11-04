import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log('connected...');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}