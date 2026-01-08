import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

import { geistSans } from "@/lib/fonts";
import { baseMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    geistSans.className,
                    "dark min-h-screen bg-background font-sans antialiased text-foreground",
                )}
            >
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
