"use client";

import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/navigation-menu";
import LogoutButton from "./ui/LogoutButton";
import Link from "next/link";

export default function UserNav({ user }: { user: any }) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger className="rounded-full">
                        {user.username}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="left-auto right-0 p-3">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/profile"
                                className="dark:hover:bg-zinc-800 px-2 py-1 rounded-md dark:bg-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 transition-colors text-center font-semibold text-gray-900/60 dark:text-white/80"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/settings"
                                className="dark:hover:bg-zinc-800 px-2 py-1 rounded-md dark:bg-neutral-700 transition-colors text-center font-semibold text-gray-900/60 dark:text-white/80 bg-neutral-100 hover:bg-neutral-200/80"
                            >
                                Settings
                            </Link>
                            <LogoutButton />
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
