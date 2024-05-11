import SignUpForm from "@/components/SignUpForm";
import React from "react";

export default function SignUp() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center px-5">
            <div className="flex flex-col gap-1 mb-10 max-w-[400px] justify-center items-center w-full">
                <h1 className="text-4xl font-bold">Sign Up</h1>
                <p className="text-base text-muted-foreground">
                    Create an account to get started
                </p>
            </div>
            <SignUpForm />
        </div>
    );
}
