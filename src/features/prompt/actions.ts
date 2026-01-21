import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    DocumentReference,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { z } from "zod";

import { formPromptSchema, type NewPrompt, promptWithAuthorSchema } from "./schema";
import { docToPromptWithAuthor } from "./utils";

export const promptCollection = collection(db, "prompts");

// ✅ NEW: Fetch prompts by specific userId (My Prompts page)
export async function fetchPromptsByUserId(userId: string) {
    try {
        const q = query(promptCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const promptsWithAuthorPromises = querySnapshot.docs.map(docToPromptWithAuthor);
        const promptsWithAuthor = await Promise.all(promptsWithAuthorPromises);
        console.log(promptsWithAuthor);

        const validatedPrompts = z.array(promptWithAuthorSchema).parse(promptsWithAuthor);
        console.log(`✅ Fetched ${validatedPrompts.length} prompts for user: ${userId}`);

        return {
            success: true,
            prompts: validatedPrompts,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("❌ Validation error:", error.message);
            return {
                success: false,
                error: "Invalid prompt data format.",
                prompts: [],
            };
        }

        console.error("❌ Firestore fetch error:", error);
        return {
            success: false,
            error: "Failed to fetch your prompts. Please try again.",
            prompts: [],
        };
    }
}

// ✅ UPDATED: fetchPrompts() now ONLY fetches public prompts
export async function fetchPrompts() {
    try {
        const q = query(
            promptCollection,
            where("isPublic", "==", true), // ✅ ONLY public prompts
            orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);

        const promptsWithAuthorPromises = querySnapshot.docs.map(docToPromptWithAuthor);
        const promptsWithAuthor = await Promise.all(promptsWithAuthorPromises);

        const validatedPrompts = z.array(promptWithAuthorSchema).parse(promptsWithAuthor);
        console.log(`✅ Fetched ${validatedPrompts.length} public prompts`);

        return {
            success: true,
            prompts: validatedPrompts,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("❌ Validation error:", error.message);
            return {
                success: false,
                error: "Invalid prompt data format.",
                prompts: [],
            };
        }

        console.error("❌ Firestore fetch error:", error);
        return {
            success: false,
            error: "Failed to fetch public prompts. Please try again.",
            prompts: [],
        };
    }
}

export async function createPrompt(data: NewPrompt) {
    try {
        const validatedData = formPromptSchema.parse(data);

        const docRef: DocumentReference = await addDoc(promptCollection, {
            ...validatedData,
            isPublic: validatedData.isPublic ?? false, // ✅ Ensure boolean
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        console.log("✅ Prompt created with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("❌ Validation error:", error.message);
            return {
                success: false,
                error: "Please check your input data and try again.",
            };
        }

        console.error("❌ Firestore error:", error);
        return {
            success: false,
            error: "Failed to save prompt. Please try again.",
        };
    }
}
