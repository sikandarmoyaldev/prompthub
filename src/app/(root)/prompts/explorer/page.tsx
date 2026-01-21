import type { Metadata } from "next";

import { ExplorerClient } from "./explorer-client";

export const metadata: Metadata = {
    title: "Explorer",
};

export default function Explorer() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Explore Prompts</h1>
                <p className="text-muted-foreground mt-1">
                    Discover and learn from the community{"'"}s best prompts
                </p>
            </div>
            <ExplorerClient />
        </main>
    );
}
