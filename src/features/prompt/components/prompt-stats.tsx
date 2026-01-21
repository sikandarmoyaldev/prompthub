"use client";

import { BookOpen, Eye, Lock, Star } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";

const statsConfig = [
    {
        label: "Total Prompts",
        value: "15",
        icon: BookOpen,
        change: "+3 this week",
        key: "totalPrompts",
    },
    {
        label: "Public Prompts",
        value: "12",
        icon: Eye,
        change: "+2 this week",
        key: "publicPrompts",
    },
    {
        label: "Private Prompts",
        value: "3",
        icon: Lock,
        change: "+1 today",
        key: "privatePrompts",
    },
    {
        label: "Starred Prompts",
        value: "7",
        icon: Star,
        change: "+2 this week",
        key: "starredPrompts",
    },
];

export function PromptStats() {
    const { loading: authLoading } = useAuth();
    const [stats] = useState({
        publicPrompts: "0",
        privatePrompts: "0",
        starredPrompts: "0",
    });

    if (authLoading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <Card key={i} className="p-6 border border-border animate-pulse">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-muted rounded w-24" />
                                    <div className="h-8 bg-muted rounded w-20" />
                                    <div className="h-3 bg-muted rounded w-16" />
                                </div>
                                <div className="w-10 h-10 bg-muted rounded-lg" />
                            </div>
                        </Card>
                    ))}
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsConfig.map((stat) => {
                const Icon = stat.icon;
                const value =
                    stat.key === "publicPrompts"
                        ? stats.publicPrompts
                        : stat.key === "privatePrompts"
                          ? stats.privatePrompts
                          : stat.key === "starredPrompts"
                            ? stats.starredPrompts
                            : stat.value;

                return (
                    <Card
                        key={stat.key}
                        className="p-6 border border-border hover:border-primary/50 transition-all group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                                <p className="text-3xl font-bold mt-2 text-foreground group-hover:text-primary transition-colors">
                                    {value}
                                </p>
                                <p className="text-sm text-muted-foreground mt-3">{stat.change}</p>
                            </div>
                            <Icon className="w-10 h-10 text-primary/20 mt-1 group-hover:scale-110 transition-all duration-200" />
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
