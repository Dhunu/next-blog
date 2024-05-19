import BlogNavbar from "@/components/BlogNavbar";
import BreadcrumBar from "@/components/BreadcrumBar";
import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            <BlogNavbar />
            <BreadcrumBar />
            {children}
        </main>
    );
}
