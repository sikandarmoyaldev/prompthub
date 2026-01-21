"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { auth } from "@/lib/firebase";
import { wait } from "@/lib/utils";

const signInSchema = z.object({
    email: z.string().min(1, "Email is required.").email("Please enter a email required."),
    password: z.string().min(1, "Password is required."),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
    const router = useRouter();

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (data: SignInFormValues) => {
        const body = document.querySelector("body");
        body?.classList.add("pointer-events-none", "opacity-50");

        try {
            await wait(5);

            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Signed in successfully!");
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.error("Signin error:", error);

            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        form.setError("password", { message: "Invalid email or password" });
                        break;
                    case "auth/invalid-email":
                        form.setError("email", { message: "Invalid email" });
                        break;
                    case "auth/too-many-requests":
                        toast.error("Too many attempts. Try again later.");
                        break;
                    default:
                        toast.error("Invalid username or password.");
                }
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            body?.classList.remove("pointer-events-none", "opacity-50");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel>Password</FormLabel>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <FormControl>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full group hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
        </Form>
    );
}
