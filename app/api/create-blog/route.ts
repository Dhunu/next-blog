import { createBlog } from "@/controllers/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { title, slug, content } = await req.json();

    if ([title, slug, content].some((field) => field?.trim() === "")) {
        return {
            status: 400,
            json: {
                message: "Please fill in all fields",
            },
        };
    }

    const res = await createBlog({ title, slug, content });

    const { blog } = await res.json();

    return NextResponse.json(blog, { status: 200 });
}
