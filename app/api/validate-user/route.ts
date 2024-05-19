import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { validateUser } from "@/controllers/user";
import { connectDb } from "@/lib/db";

export async function POST(req: NextRequest) {
    const { refreshToken, accessToken } = await req.json();

    if (!refreshToken || !accessToken) {
        return NextResponse.json("Unauthorized", {
            status: 401,
        });
    }

    const userId = await validateUser(accessToken.value);

    if (!userId) {
        return NextResponse.json("Unauthorized", {
            status: 401,
        });
    }

    await connectDb();

    const user = await User.findOne({
        _id: userId,
    });

    if (!user) {
        return NextResponse.json("Unauthorized", {
            status: 401,
        });
    }

    return NextResponse.json({ user }, { status: 200 });
}
