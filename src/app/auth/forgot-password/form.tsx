"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { auth } from "@/lib/firebase";
import { wait } from "@/lib/utils";

const forgotPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        const body = document.querySelector("body");
        body?.classList.add("pointer-events-none", "opacity-50");
        setIsLoading(true);

        try {
            await wait(5);
            await sendPasswordResetEmail(auth, data.email);
            setSubmitted(true);
            toast.success("Reset link sent successfully!");
        } catch (error) {
            console.error("Forgot password error:", error);

            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/user-not-found":
                        form.setError("email", { message: "No account found with this email." });
                        break;
                    case "auth/invalid-email":
                        form.setError("email", { message: "Invalid email address." });
                        break;
                    case "auth/too-many-requests":
                        toast.error("Too many attempts. Please try again later.");
                        break;
                    default:
                        toast.error("Something went wrong. Please try again.");
                }
            } else {
                toast.error("Failed to send reset email.");
            }
        } finally {
            setIsLoading(false);
            body?.classList.remove("pointer-events-none", "opacity-50");
        }
    };

    const handleTryAgain = () => {
        setSubmitted(false);
        form.reset();
    };

    return (
        <>
            <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">P</span>
                    </div>
                </div>
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-muted-foreground">
                    {submitted
                        ? "Check your email for reset instructions"
                        : "Enter your email to reset your password"}
                </p>
            </div>

            {!submitted ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormDescription>
                                        We{"'"}ll send a password reset link to this email address.
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="h-12"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 group hover:shadow-xl transition-all duration-300"
                            disabled={isLoading || form.formState.isSubmitting}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Remembered your password?{" "}
                            <Link
                                href="/auth/sign-in"
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </Form>
            ) : (
                <div className="bg-accent/10 border border-accent rounded-md p-6 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-green-900">
                        <span className="text-2xl font-bold text-accent-foreground">✓</span>
                    </div>
                    <p className="text-sm text-foreground">
                        We{"'"}ve sent a password reset link to{" "}
                        <strong>{form.getValues("email")}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Check your inbox and click the link to reset your password. If you don{"'"}t
                        see it, check your spam folder.
                    </p>
                    <Button
                        variant="outline"
                        className="w-full h-12 bg-transparent"
                        onClick={handleTryAgain}
                        disabled={isLoading}
                    >
                        Didn{"'"}t receive it? Try again
                    </Button>
                </div>
            )}
        </>
    );
}
