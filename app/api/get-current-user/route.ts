import { validateUser } from "@/controllers/user";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectDb } from "@/lib/db";

export async function POST(req: NextRequest) {
    await connectDb();

    const { accessToken } = await req.json();

    if (!accessToken) {
        return NextResponse.json("Unauthorized", {
            status: 401,
        });
    }

    const userId = await validateUser(accessToken.value);

    const currentUser = await User.findOne({
        _id: userId,
    });

    if (!currentUser) {
        return NextResponse.json("Unauthorized", {
            status: 401,
        });
    }

    return NextResponse.json({ user: currentUser }, { status: 200 });
}
