"use client";

import { Copy, Share2, Star } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { PromptWithAuthor } from "../schema";

interface PromptCardProps {
    prompt: PromptWithAuthor;
}

export function PromptCard({ prompt }: PromptCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [stars, setStars] = useState(0);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(prompt.content);
            toast.success("✅ Prompt copied!");
        } catch {
            toast.error("Failed to copy prompt");
        }
    }, [prompt.content]);

    const handleShareUrl = useCallback(async () => {
        const promptUrl = `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/prompts/${prompt.id}`;

        try {
            await navigator.clipboard.writeText(promptUrl);
            toast.success("🔗 Prompt link copied!");
        } catch {
            toast.error("Failed to copy link");
        }
    }, [prompt.id]);

    const handleStar = useCallback(() => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        setStars(newLikedState ? stars + 1 : stars - 1);

        toast(newLikedState ? "⭐ Prompt starred!" : "⭐ Prompt unstarred");
    }, [isLiked, stars]);

    return (
        <Card className="p-6 border border-border hover:border-primary transition-all duration-200 group">
            <div className="space-y-4">
                <div>
                    <Link
                        href={`/prompts/${prompt.id}`}
                        className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2"
                    >
                        {prompt.title}
                    </Link>
                    {prompt.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {prompt.description}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>{prompt.author.username[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">
                        @{prompt.author.username}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground font-mono">⭐ {stars}</span>
                    <div className="flex gap-1">
                        {/* Star Button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleStar}
                            className={
                                isLiked
                                    ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10 shadow-md"
                                    : "hover:bg-muted/50"
                            }
                        >
                            <Star
                                className={`w-4 h-4 transition-all ${isLiked ? "fill-current shadow-sm" : ""}`}
                            />
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleCopy}
                            className="hover:bg-accent hover:text-primary group/copy"
                            title="Copy prompt content"
                        >
                            <Copy className="w-4 h-4 group-hover/copy:scale-110 transition-transform" />
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleShareUrl}
                            className="hover:bg-accent hover:text-primary group/share"
                            title="Copy prompt link"
                        >
                            <Share2 className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
