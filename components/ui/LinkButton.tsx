"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LinkButton({
    href,
    label,
    className,
}: {
    href: string;
    label: string;
    className?: string;
}) {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <Link
            href={href}
            className={cn(
                "p-2 rounded-md font-semibold transition-colors duration-200 relative flex flex-col",
                active && "text-primary",
                className
            )}
        >
            <span className="text-lg">{label}</span>
            <div
                className={cn(
                    active &&
                        "absolute w-1/2 h-1 rounded-t-md bg-primary bottom-0"
                )}
            />
        </Link>
    );
}
