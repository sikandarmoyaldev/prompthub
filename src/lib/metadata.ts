import { Metadata } from "next";

const url = process.env.NEXT_PUBLIC_APP_URL!;
const appName = process.env.NEXT_PUBLIC_APP_NAME!;
const keywords = process.env.NEXT_PUBLIC_APP_KEYWORDS!;
const description = process.env.NEXT_PUBLIC_APP_DESCRIPTION!;

export const baseMetadata: Metadata = {
    metadataBase: new URL(url),
    title: {
        default: appName,
        template: `%s - ${appName}`,
    },
    description,
    keywords: keywords.split(", "),
    authors: [{ name: appName }],
    creator: appName,
    publisher: appName,
    icons: "/favicon.ico",
    openGraph: {
        type: "website",
        url,
        title: appName,
        description,
        siteName: appName,
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: appName,
        description,
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};
