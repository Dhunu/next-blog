import { register } from "@/controllers/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { username, firstName, lastName, email, password } = await req.json();

    if (!email && !username) {
        return NextResponse.json("Please provide an email and username", {
            status: 400,
        });
    }

    try {
        await register({ username, firstName, lastName, email, password });
        return NextResponse.json("User registered", {
            status: 200,
        });
    } catch (error) {
        console.log({ "register error": error });
        return NextResponse.json("Error registering user", {
            status: 400,
        });
    }
}
