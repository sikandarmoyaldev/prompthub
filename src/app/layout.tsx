import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
                    "min-h-screen bg-linear-to-br from-background to-secondary flex items-center justify-center bg-background font-sans antialiased text-foreground",
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="w-full">{children}</div>
                </ThemeProvider>

                <Toaster />
            </body>
        </html>
    );
}
