import { createBlog } from "@/controllers/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { title, slug, content } = await req.json();

    if ([title, slug, content].some((field) => field?.trim() === "")) {
        return NextResponse.json(
            { message: "All fields are required" },
            { status: 400 }
        );
    }

    const res = await createBlog({ title, slug, content });

    const { blog } = await res.json();

    return NextResponse.json({ blog }, { status: 200 });
}
