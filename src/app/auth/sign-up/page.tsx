import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default function SignUp() {
    return (
        <main className="px-4 flex justify-center items-center h-screen w-full">
            <Card className="sm:w-md w-full p-8 border border-border">
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <div className="flex justify-center mb-4">
                            <Logo />
                        </div>
                        <h1 className="text-2xl font-bold">Create Account</h1>
                        <p className="text-muted-foreground">Join the PromptHub community</p>
                    </div>

                    <SignUpForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-muted-foreground">
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent" disabled>
                        Sign up with GitHub
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/auth/sign-in"
                            className="text-primary hover:underline font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </main>
    );
}
