import CreateBlogForm from "@/components/CreateBlogForm";
import React from "react";

export default function CreateBlog() {
    return (
        <section className="w-full min-h-screen px-5 md:px-10 xl:px-20 mt-10">
            <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
                Create Blog
            </h1>
            <CreateBlogForm />
        </section>
    );
}
