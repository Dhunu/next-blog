import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        cookies().delete("accessToken");
        cookies().delete("refreshToken");

        return NextResponse.json("Logout successful", {
            status: 200,
        });
    } catch (error) {
        console.log({ "logout error": error });
        return NextResponse.json("Logout failed", {
            status: 500,
        });
    }
}
