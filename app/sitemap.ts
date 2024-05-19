import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: "https://blogify-stories.vercel.app/",
            lastModified: new Date().toISOString(),
        },
        {
            url: "https://blogify-stories.vercel.app/sign-in",
            lastModified: new Date().toISOString(),
        },
        {
            url: "https://blogify-stories.vercel.app/sign-up",
            lastModified: new Date().toISOString(),
        },
        {
            url: "https://blogify-stories.vercel.app/forgot-password",
            lastModified: new Date().toISOString(),
        },
        {
            url: "https://blogify-stories.vercel.app/my-blogs",
            lastModified: new Date().toISOString(),
        },
    ];
}
