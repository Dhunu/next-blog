import React from "react";
import Logo from "../Logo";
import User from "../User";
import LogoutButton from "../ui/LogoutButton";

export default function BlogNavbar() {
    return (
        <div className="w-full h-20 flex justify-between px-5 md:px-10 xl:px-20">
            <Logo />
            <div className="flex gap-5 items-center">
                <User />
                <LogoutButton />
            </div>
        </div>
    );
}
