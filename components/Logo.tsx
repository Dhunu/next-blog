import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center w-60">
            <Image src="/logo.png" alt="logo" width={180} height={40} />
        </Link>
    );
}
