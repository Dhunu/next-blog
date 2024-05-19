import { connectDb } from "@/lib/db";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const createBlog = async ({
    title,
    slug,
    content,
}: {
    title: string;
    slug: string;
    content: string;
}) => {
    await connectDb();

    if ([title, slug, content].some((field) => field?.trim() === "")) {
        return NextResponse.json("Please fill in all fields", {
            status: 400,
        });
    }

    const existingBlog = await Blog.findOne({
        slug,
    });

    if (existingBlog) {
        return NextResponse.json("Blog already exists", {
            status: 400,
        });
    }

    const accessToken = cookies().get("accessToken");

    const res = await fetch(`${process.env.ORIGIN}/api/get-current-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accessToken,
        }),
    });

    const data = await res.json();
    const author = data.user;

    console.log({ author });

    const newBlog = new Blog({
        title,
        slug,
        content,
        author,
    });

    await newBlog.save();

    return NextResponse.json(newBlog, { status: 200 });
};

export { createBlog };
