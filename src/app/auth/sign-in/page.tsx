import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignInForm } from "./form";

export const metadata: Metadata = {
    title: "Sign In",
};

export default function SignUp() {
    return (
        <main className="px-4 flex justify-center items-center h-screen w-full">
            <Card className="sm:w-md w-full p-8 border border-border">
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <div className="flex justify-center mb-4">
                            <Logo showTitle={false} />
                        </div>
                        <h1 className="text-2xl font-bold">Sign In</h1>
                        <p className="text-muted-foreground">Welcome back to PromptHub</p>
                    </div>

                    <SignInForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-muted-foreground">
                                Or sign in with
                            </span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent" disabled>
                        Sign in with GitHub
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don{"'"}t have an account?{" "}
                        <Link
                            href="/auth/sign-up"
                            className="text-primary hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </main>
    );
}
