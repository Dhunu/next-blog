import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connectInstance = await mongoose.connect(
            process.env.MONGODB_URI!
        );
        console.log(
            `Connected to ${connectInstance.connection.host} on port ${connectInstance.connection.port}`
        );

        return true;
    } catch (error) {
        console.error({ "MONGODB CONNECTION ERROR": error });
        return false;
    }
};
