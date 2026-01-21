"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
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

import { auth, db } from "@/lib/firebase";
import { wait } from "@/lib/utils";

const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username must not exceed 20 characters.")
        .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, underscores, and hyphens allowed."),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters.")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain uppercase, lowercase letter, and number.",
        ),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
    const router = useRouter();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
        },
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (data: SignUpFormValues) => {
        const body = document.querySelector("body");
        body?.classList.add("pointer-events-none", "opacity-50");

        try {
            await wait(5);

            const username = data.username.toLowerCase().trim();

            // 1. Check username availability
            const usernameRef = doc(db, "usernames", username);
            const usernameSnap = await getDoc(usernameRef);
            if (usernameSnap.exists()) {
                form.setError("username", { message: "This username is already taken." });
                return;
            }

            // 2. Create auth user
            const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = result.user;

            // 3. Batch write - atomic
            await Promise.all([
                // Claim username
                setDoc(usernameRef, {
                    uid: user.uid,
                }),
            ]);

            // 4. Update display name
            await updateProfile(user, { displayName: data.username });

            toast.success("Account created successfully!");
            router.push("/dashboard");
        } catch (error) {
            console.error("Failed to create account: ", error);

            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    form.setError("email", { message: "This email is already registered." });
                } else if (error.code === "auth/invalid-email") {
                    form.setError("email", { message: "Invalid email format." });
                } else {
                    toast.error("An unexpected error occurred.");
                }
            } else {
                toast.error("An unknown error occurred.");
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="sh-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </form>
        </Form>
    );
}
