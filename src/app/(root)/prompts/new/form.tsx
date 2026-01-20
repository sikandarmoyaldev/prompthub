"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { FormValues, PromptForm } from "@/features/prompt/components/prompt-form";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { createPrompt } from "@/features/prompt/actions";

export const Form: React.FC = () => {
    const { user, loading: authLoading } = useAuth({ redirectIfUnauthenticated: true });
    const router = useRouter();

    const handleSubmit = async (data: FormValues) => {
        console.log(user);
        if (!user) {
            toast.error("Please sign in to create prompts.");
            return;
        }

        try {
            const result = await createPrompt({ ...data, userId: user.uid });

            if (result.success) {
                toast.success("🎉 Prompt created successfully!");
                router.push("/");
            } else {
                toast.error(result.error || "Failed to create prompt");
            }
        } catch (error) {
            console.error("Failed to create prompt:", error);
            toast.error("Failed to create prompt. Please try again.");
        }
    };

    // Show loading while auth is checking
    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return <PromptForm onSubmit={handleSubmit} />;
};
