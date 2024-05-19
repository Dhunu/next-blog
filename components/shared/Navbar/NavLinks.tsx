import LinkButton from "@/components/ui/LinkButton";
import React from "react";

export default function NavLinks() {
    return (
        <ul className="flex gap-10">
            <li>
                <LinkButton href="/" label="Home" />
            </li>
            <li>
                <LinkButton href="/my-blogs" label="My Blogs" />
            </li>
        </ul>
    );
}
