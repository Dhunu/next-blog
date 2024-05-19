import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const refreshToken = cookies().get("refreshToken");
    const accessToken = cookies().get("accessToken");

    if (!refreshToken || !accessToken) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
        const res = await fetch("http://localhost:3000/api/validate-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken, accessToken }),
        });

        if (res.status === 401) {
            throw new Error("Unauthorized");
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
}

export const config = {
    matcher: "/",
};
