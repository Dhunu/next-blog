"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { authFormSchema } from "@/lib/utils";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import authService from "@/appwrite/auth";

const formSchema = z
    .object({
        fullName: z
            .string()
            .min(3, { message: "Name must be at least 3 characters" }),
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default function SignUpForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        //TODO: Handle form submission
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-[400px] w-full"
            >
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your full name here"
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Password</FormLabel>
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

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password again</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your password again here"
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="text-white w-full">
                    Sign Up
                </Button>
                <div className="mt-10 flex justify-center items-center">
                    <span className="text-muted-foreground text-sm">
                        Already have an account?
                    </span>
                    <Button
                        type="button"
                        variant="link"
                        onClick={() => router.push(" /sign-in")}
                        className="text-primary text-sm"
                    >
                        Sign In
                    </Button>
                </div>
            </form>
        </Form>
    );
}
