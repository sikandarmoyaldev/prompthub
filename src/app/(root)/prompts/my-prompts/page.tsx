import type { Metadata } from "next";

import { PromptStats } from "@/features/prompt/components/prompt-stats";
import { PromptTable } from "@/features/prompt/components/prompt-table";
import { Header } from "./header";

export const metadata: Metadata = {
    title: "My Prompts",
};

export default function MyPrompts() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
            <Header />
            <PromptStats />
            <PromptTable />
        </main>
    );
}
