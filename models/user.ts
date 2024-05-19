import { Schema, model, models } from "mongoose";
import bcryptjs from "bcryptjs";
import { encode } from "@/app/api/auth/[...nextAuth]";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileUrl: {
            type: String,
            default: "/images/default-profile.png",
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    const res = await encode({
        token: {
            _id: this._id,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
        },
        salt: process.env.ACCESS_TOKEN_SALT!,
        secret: process.env.ACCESS_TOKEN_SECRET!,
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY!),
    });

    return res;
};

userSchema.methods.generateRefreshToken = async function () {
    const res = await encode({
        token: {
            _id: this._id,
        },
        salt: process.env.REFRESH_TOKEN_SALT!,
        secret: process.env.REFRESH_TOKEN_SECRET!,
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY!),
    });

    return res;
};
export default models?.User || model("User", userSchema);
