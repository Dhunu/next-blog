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

const formSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

export default function SignInForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        //TODO: Handle form submission
        console.log(data);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-[400px] w-full"
            >
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
                                <Button
                                    type="button"
                                    className="text-sm"
                                    variant="link"
                                    onClick={() =>
                                        router.push("/forgot-password")
                                    }
                                >
                                    Forgot Password?
                                </Button>
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
                    Sign In
                </Button>
                <div className="mt-10 flex justify-center items-center">
                    <span className="text-muted-foreground text-sm">
                        Don't have an account?
                    </span>
                    <Button
                        type="button"
                        variant="link"
                        onClick={() => router.push("/sign-up")}
                        className="text-primary text-sm"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </Form>
    );
}
