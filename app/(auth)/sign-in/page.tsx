import SignInForm from "@/components/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account.",
};

export default function SignIn() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center px-5">
            <div className="flex flex-col gap-1 mb-10 max-w-[400px] justify-center items-center w-full">
                <h1 className="text-4xl font-bold">Sign In</h1>
                <p className="text-base text-muted-foreground">
                    Sign in to your account
                </p>
            </div>
            <SignInForm />
        </div>
    );
}
