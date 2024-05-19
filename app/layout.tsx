import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Blogify - A place for your stories",
        template: "%s | Blogify",
    },
    description:
        "Blogify is a place for your stories. Share your thoughts and ideas with the world.",
    openGraph: {
        title: {
            default: "Blogify - A place for your stories",
            template: "%s | Blogify",
        },
        description:
            "Blogify is a place for your stories. Share your thoughts and ideas with the world.",
        type: "website",
        locale: "en_IN",
        url: "https://blogify-stories.vercel.app/",
        siteName: "Blogify",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <NextTopLoader
                        color={"#16a249"}
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #16a249,0 0 5px #16a249"
                        template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                        zIndex={1600}
                        showAtBottom={false}
                        showSpinner={false}
                    />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
