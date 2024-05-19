import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api", "/_next"],
        },
        sitemap: "https://blogify-stories.vercel.app/sitemap.xml",
    };
}
