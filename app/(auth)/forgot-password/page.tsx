import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import React from "react";

export default function FotgotPassword() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center px-5">
            <div className="flex flex-col gap-1 mb-10 max-w-[400px] justify-center items-center w-full">
                <h1 className="text-4xl font-bold">Forgot Password</h1>
                <p className="text-base text-muted-foreground">
                    Enter email to reset password
                </p>
            </div>
            <ForgotPasswordForm />
        </div>
    );
}
