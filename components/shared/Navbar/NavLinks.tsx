import LinkButton from "@/components/ui/LinkButton";
import React from "react";

export default function NavLinks() {
    return (
        <ul className="flex gap-10 flex-1 justify-center">
            <li>
                <LinkButton href="/" label="Home" />
            </li>
            <li>
                <LinkButton href="/my-blogs" label="My Blogs" />
            </li>
            <li>
                <LinkButton
                    href="/my-blogs/create-blog"
                    label="Create"
                    className="rounded-md bg-primary/60 text-white"
                />
            </li>
        </ul>
    );
}
