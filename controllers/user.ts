import { decode } from "@/app/api/auth/[...nextAuth]";
import { connectDb } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

const generateAccessandRefreshToken = async (userId: string) => {
    await connectDb();

    const user: any = await User.findById(userId);

    if (!user) {
        return NextResponse.json("User not found", {
            status: 404,
        });
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
};

const register = async ({
    firstName,
    lastName,
    username,
    email,
    password,
}: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}) => {
    await connectDb();

    if (
        [firstName, lastName, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        return NextResponse.json("Please fill in all fields", {
            status: 400,
        });
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        return NextResponse.json("User already exists", {
            status: 400,
        });
    }

    const user = await User.create({
        firstName,
        lastName,
        username: username?.toLowerCase(),
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        return NextResponse.json("User not found", {
            status: 404,
        });
    }

    return await login({ email, username, password });
};

const login = async ({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) => {
    await connectDb();
    if (!email && !username) {
        return NextResponse.json("Please provide email or username", {
            status: 400,
        });
    }

    const user: any = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (!user) {
        console.log({ "login error": "Invalid credentials" });
        return NextResponse.json("Invalid credentials", {
            status: 401,
        });
    }

    const isMatched = await user.isPasswordCorrect(password);

    if (!isMatched) {
        console.log({ "login error": "Invalid credentials 2" });
        return NextResponse.json("Invalid credentials", {
            status: 401,
        });
    }

    const res = await generateAccessandRefreshToken(user._id);

    if (res.status === 404) {
        return NextResponse.json("User not found", {
            status: 404,
        });
    }

    const { accessToken, refreshToken } = await res.json();

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return NextResponse.json(
        { loggedInUser, accessToken, refreshToken },
        {
            status: 200,
        }
    );
};

const logout = async (userId: string) => {
    await connectDb();

    const user = await User.findById(userId);

    if (!user) {
        return NextResponse.json("User not found", {
            status: 404,
        });
    }

    user.refreshToken = "";
    user.save({ validateBeforeSave: false });

    return NextResponse.json("User logged out", {
        status: 200,
    });
};

const validateUser = async (accessToken: string) => {
    const decadedToken = await decode({
        token: accessToken,
        salt: process.env.ACCESS_TOKEN_SALT!,
        secret: process.env.ACCESS_TOKEN_SECRET!,
    });

    const userId = decadedToken?._id;

    return userId;
};

const getCurrentUser = async (userId: string) => {
    await connectDb();

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
        return NextResponse.json("User not found", {
            status: 404,
        });
    }

    return NextResponse.json(user, { status: 200 });
};

export {
    register,
    login,
    generateAccessandRefreshToken,
    logout,
    validateUser,
    getCurrentUser,
};
