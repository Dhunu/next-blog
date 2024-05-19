import Logo from "@/components/Logo";
import LogoutButton from "@/components/ui/LogoutButton";
import React from "react";
import NavLinks from "./NavLinks";

export default function Navbar() {
    return (
        <nav className="w-full h-[70px] flex items-center justify-between px-5 md:px-10 xl:px-20 bg-white text-black">
            <Logo />
            <NavLinks />
            <LogoutButton />
        </nav>
    );
}
