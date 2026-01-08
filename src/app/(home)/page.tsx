import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Home",
};

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Prompts",
        description: "Discover carefully crafted prompts optimized for various AI models",
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Share your best prompts and learn from the community",
    },
    {
        icon: Zap,
        title: "Easy to Use",
        description: "Simple search, filtering, and organization for your prompts",
    },
];

export default function Home() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center space-y-6">
                    <div className="inline-block px-4 py-2 bg-accent border border-accent rounded-full">
                        <span className="text-foreground text-sm font-medium">
                            🎉 Welcome to the Prompt Marketplace
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-pretty">
                        Share and Discover
                        <span className="block text-primary">AI Prompts</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Build a library of powerful prompts, collaborate with the community, and
                        discover the best practices for AI-powered workflows.
                    </p>
                    <div className="flex flex-col px-4 sm:flex-row gap-4 justify-center pt-4 w-full sm:w-auto sm:items-center">
                        <Link href="/auth/sign-up" className="w-full sm:w-auto">
                            <Button size="lg" className="gap-2 w-full sm:w-auto">
                                Start Creating <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/explore" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Explore Prompts
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={i} className="p-6 border border-border">
                                <Icon className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        Join thousands of AI enthusiasts who are already sharing and discovering
                        powerful prompts.
                    </p>
                    <Link href="/auth/sign-up">
                        <Button size="lg" variant="secondary" className="cursor-pointer">
                            Create Your Account Today
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
