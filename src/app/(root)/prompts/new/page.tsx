import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Form } from "./form";

export const metadata: Metadata = {
    title: "Create New Prompt",
    description: "Create and organize AI prompts for your projects",
};

export default function NewPrompt() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold">Create New Prompt</h2>
                    <p className="text-muted-foreground">
                        Organize your AI prompts with titles, descriptions, content, and tags.
                    </p>
                </div>
                <Separator className="mb-6" />

                <Form />
            </div>
        </main>
    );
}
