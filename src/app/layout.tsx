import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { geistMono, geistSans } from "@/lib/fonts";
import { baseMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
                {children}
            </body>
        </html>
    );
}
