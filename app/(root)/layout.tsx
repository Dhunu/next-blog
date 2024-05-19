import Navbar from "@/components/shared/Navbar";
import React from "react";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}
