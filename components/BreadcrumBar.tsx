"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Skeleton } from "./ui/skeleton";

export default function BreadcrumBar() {
    const pathname = usePathname();
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted)
        return (
            <div className="w-full px-5 md:px-10 xl:px-20 mt-10">
                <Skeleton className="h-8 rounded-md w-80" />
            </div>
        );

    const paths = pathname.split("/").filter(Boolean);

    return (
        <Breadcrumb className="w-full px-5 md:px-10 xl:px-20 mt-10">
            <BreadcrumbList>
                {paths.map((path, index) => (
                    <BreadcrumbItem key={index} className="text-xl font-bold">
                        {index < paths.length - 1 ? (
                            <BreadcrumbLink href={`/${path}`}>
                                {path
                                    .split("-")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.substring(1)
                                    )
                                    .join(" ")}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>
                                {path
                                    .split("-")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.substring(1)
                                    )
                                    .join(" ")}
                            </BreadcrumbPage>
                        )}
                        {index < paths.length - 1 && (
                            <BreadcrumbSeparator className="text-primary font-bold">
                                {"/"}
                            </BreadcrumbSeparator>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
