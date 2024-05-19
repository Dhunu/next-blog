import Logo from "@/components/Logo";
import LogoutButton from "@/components/ui/LogoutButton";
import React from "react";
import NavLinks from "./NavLinks";
import User from "@/components/User";

export default function Navbar() {
    return (
        <nav className="w-full h-20 flex items-center justify-between px-5 md:px-10 xl:px-20 border-b sticky top-0">
            <Logo />
            <NavLinks />
            <div className="flex gap-5 items-center w-60 justify-end">
                <User />
                <LogoutButton />
            </div>
        </nav>
    );
}
