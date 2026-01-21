"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function Header() {
    const { user, loading } = useAuth({ redirectIfUnauthenticated: true });

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-8 bg-muted rounded-lg w-64 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-48 animate-pulse" />
                </div>
                <div className="w-32 h-10 bg-muted rounded-lg animate-pulse" />
            </div>
        );
    }

    // Show user-specific greeting
    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back, <span className="text-primary">{displayName}</span>
                </h1>
                <p className="text-muted-foreground mt-1">
                    Here{"'"}s an overview of your prompt activity
                </p>
            </div>
            <Link href="/prompts/new">
                <Button>
                    <Plus className="w-4 h-4" />
                    New Prompt
                </Button>
            </Link>
        </div>
    );
}
