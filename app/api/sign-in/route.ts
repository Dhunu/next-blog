import { login } from "@/controllers/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, username, password } = await req.json();

    if (!email && !username) {
        return NextResponse.json("Please provide an email and username", {
            status: 400,
        });
    }

    try {
        const response = await login({ username, email, password });

        if (response.status === 401) {
            return NextResponse.json("Invalid credentials", {
                status: 401,
            });
        }

        const { accessToken, refreshToken, loggedInUser } =
            await response.json();

        const options = {
            httpOnly: true,
            secure: true,
        };

        cookies().set("accessToken", accessToken, options);
        cookies().set("refreshToken", refreshToken, options);

        return NextResponse.json({ loggedInUser }, { status: 200 });
    } catch (error) {
        console.log({ "login error": error });
        return NextResponse.json("Invalid credentials", {
            status: 401,
        });
    }
}
