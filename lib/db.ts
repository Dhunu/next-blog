import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const connectInstance = await mongoose.connect(process.env.MONGODB_URI!)
        console.log(
            `Connected to ${connectInstance.connection.host} on port ${connectInstance.connection.port}`
        );
    } catch (error) {
        console.error({ "MONGODB CONNECTION ERROR": error });
    }
}