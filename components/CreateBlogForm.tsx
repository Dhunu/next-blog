"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { Button } from "./ui/button";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long",
    }),
    slug: z.string(),
    content: z.string(),
    coverImage: z.string(),
});

export default function CreateBlogForm() {
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [uploadedCoverImage, setUploadedCoverImage] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            slug: "",
            coverImage: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        // TODO: Handle form submission
        await fetch("/api/blogs", {});
    }

    async function uploadCoverImage(file: File) {
        if (!file) {
            alert("No file found");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = fetch("/api/upload", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());

        const { path } = await res;

        if (path) {
            const imgPath = path.replace("public", "");

            form.setValue("coverImage", imgPath);
            setUploadedCoverImage(true);

            setCoverImageFile(null);
        }
    }

    async function deleteCoverImage() {
        const path = form.getValues("coverImage");

        if (!path) {
            return;
        }

        const res = fetch("/api/upload", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ path }),
        });

        const data = await res;
        const { message } = await data.json();

        if (message === "File deleted") {
            form.setValue("coverImage", "");
            setUploadedCoverImage(false);
        }
    }

    useEffect(() => {
        form.setValue("slug", currentTitle.toLowerCase().replace(/\s+/g, "-"));
    }, [currentTitle]);
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-screen-2xl mr-auto w-full space-y-6 mt-10"
            >
                {uploadedCoverImage && (
                    <div className="flex flex-col gap-5">
                        <h2 className="text-xl font-semibold mb-5">
                            Cover Image
                        </h2>

                        <div className="flex gap-5">
                            <Image
                                src={
                                    form.getValues("coverImage") ??
                                    "/placeholder.png"
                                }
                                width={400}
                                height={400}
                                alt="Cover Image"
                            />

                            <Button
                                type="button"
                                onClick={() => deleteCoverImage()}
                                variant="destructive"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
                {coverImageFile && (
                    <div className="flex flex-col gap-5">
                        <h2 className="text-xl font-semibold mb-5">Preview</h2>

                        <div className="flex gap-5">
                            <Image
                                src={
                                    coverImageFile
                                        ? URL.createObjectURL(coverImageFile)
                                        : "/placeholder.png"
                                }
                                width={400}
                                height={400}
                                alt="Cover Image"
                            />
                            <Button
                                type="button"
                                className="bg-green-600 text-white hover:bg-green-700 transition-all"
                                onClick={() =>
                                    coverImageFile &&
                                    uploadCoverImage(coverImageFile)
                                }
                            >
                                Upload
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setCoverImageFile(null)}
                                variant="destructive"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                )}
                {!coverImageFile && form.getValues("coverImage") === "" && (
                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover Image</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="file"
                                        onChange={(e) =>
                                            setCoverImageFile(
                                                e.target.files?.[0] ?? null
                                            )
                                        }
                                        className="w-80"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter title here"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setCurrentTitle(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter slug here"
                                    type="text"
                                    value={form.getValues("slug")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Enter title here"
                                    rows={10}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
