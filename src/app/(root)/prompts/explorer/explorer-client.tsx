"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PromptCard } from "@/features/prompt/components/prompt-card";

import { fetchPrompts } from "@/features/prompt/actions";
import { PromptWithAuthor } from "@/features/prompt/schema";

export function ExplorerClient() {
    const [searchTerm, setSearchTerm] = useState("");
    const [prompts, setPrompts] = useState<PromptWithAuthor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ Fetch prompts on mount
    useEffect(() => {
        async function loadPrompts() {
            try {
                setLoading(true);
                setError(null);
                const result = await fetchPrompts();

                if (result.success) {
                    setPrompts(result.prompts);
                } else {
                    setError(result.error!);
                }
            } catch {
                setError("Failed to load prompts.");
            } finally {
                setLoading(false);
            }
        }

        loadPrompts();
    }, []);

    // ✅ Debounced search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            // Here you could refetch with search params
            console.log("Searching for:", searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // ✅ Optimized filtering
    const filteredPrompts = useMemo(() => {
        return prompts.filter((prompt) => {
            const matchesSearch =
                !searchTerm ||
                prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prompt.description?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                prompt.content.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesSearch;
        });
    }, [prompts, searchTerm]);

    return (
        <>
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-2 w-5 h-5 text-muted-foreground" />
                <Input
                    placeholder="Search prompts by title, description, content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Error State */}
            {error && (
                <Card className="p-6 border-destructive/20">
                    <p className="text-destructive">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-2"
                        variant="outline"
                    >
                        Retry
                    </Button>
                </Card>
            )}

            {/* Results */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <Card key={i} className="p-6 animate-pulse">
                                <div className="h-4 bg-muted rounded mb-4"></div>
                                <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                                <div className="h-20 bg-muted rounded"></div>
                            </Card>
                        ))}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            {filteredPrompts.length} prompts found
                        </h2>
                    </div>

                    {filteredPrompts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPrompts.map((prompt) => (
                                <PromptCard key={prompt.id} prompt={prompt} />
                            ))}
                        </div>
                    ) : (
                        <Card className="p-12 text-center border border-border">
                            <p className="text-muted-foreground">
                                {searchTerm
                                    ? "No prompts found matching your search."
                                    : "No prompts available yet."}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                {searchTerm
                                    ? "Try adjusting your search terms."
                                    : "Check back later for new prompts."}
                            </p>
                        </Card>
                    )}
                </div>
            )}
        </>
    );
}
