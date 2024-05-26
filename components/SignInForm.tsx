"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
    const router = useRouter();
    const [isUsername, setIsUsername] = React.useState(false);
    const [signingIn, setSigningIn] = React.useState(false);

    const formSchema = z.object({
        username: isUsername ? z.string().min(3) : z.string().optional(),
        email: isUsername ? z.string().optional() : z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setSigningIn(true);
        await fetch("/api/sign-in", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setSigningIn(false);
                    router.replace("/");
                }
            })
            .catch((error) => {
                alert("Invalid credentials");
                setSigningIn(false);
                router.refresh();
            });
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-[400px] w-full"
            >
                {isUsername ? (
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <div className="w-full flex justify-between items-center">
                                    <FormLabel>Username</FormLabel>
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="p-0"
                                        onClick={() => setIsUsername(false)}
                                    >
                                        Use Email Instead
                                    </Button>
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your username here"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) : (
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="w-full flex justify-between items-center">
                                    <FormLabel>Email</FormLabel>
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="p-0"
                                        onClick={() => setIsUsername(true)}
                                    >
                                        Use Username Instead
                                    </Button>
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your email here"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Password</FormLabel>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-primary font-semibold"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your password here"
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="text-white w-full">
                    {signingIn ? (
                        <span className="flex gap-2 items-center">
                            Signin In
                            <LoaderCircle className="w-4 h4 animate-spin" />
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </Button>
                <div className="mt-10 flex justify-center items-center">
                    <span className="text-muted-foreground text-sm">
                        Don&apos;t have an account?
                    </span>
                    <Link
                        href="/sign-up"
                        className="text-primary text-sm font-semibold ml-2"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </Form>
    );
}
