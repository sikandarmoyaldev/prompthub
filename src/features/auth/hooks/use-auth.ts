"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase";

export function useAuth({ redirectIfUnauthenticated = true } = {}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
            if (!firebaseUser && redirectIfUnauthenticated) {
                router.push("/auth/sign-in");
            }
        });

        return () => unsubscribe();
    }, [redirectIfUnauthenticated, router]);

    return { user, loading };
}
