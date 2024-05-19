"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export default function LogoutButton() {
    const router = useRouter();
    const [logingOut, setLogingOut] = useState(false);

    async function handleLogout() {
        try {
            setLogingOut(true);
            setTimeout(async () => {
                const response = await fetch("/api/logout");
                if (response.status === 200) {
                    console.log("Logout successful");
                    setLogingOut(false);
                    router.push("/sign-in");
                } else {
                    console.log("Logout failed");
                    setLogingOut(false);
                    alert("Logout failed");
                }
            }, 2000);
        } catch (error) {
            console.log({ "logout error": error });
        }
    }
    return (
        <Button
            onClick={() => handleLogout()}
            type="button"
            className="text-white"
        >
            {logingOut ? (
                <span className="flex gap-2 items-center">
                    Logging Out
                    <Loader2 className="animate-spin w-4 h4" />
                </span>
            ) : (
                "Logout"
            )}
        </Button>
    );
}
