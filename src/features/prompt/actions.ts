import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    DocumentReference,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { z } from "zod";

import { formPromptSchema, type NewPrompt, promptWithAuthorSchema } from "./schema";
import { docToPromptWithAuthor } from "./utils";

export const promptCollection = collection(db, "prompts");

export async function createPrompt(data: NewPrompt) {
    try {
        // Validate input data
        const validatedData = formPromptSchema.parse(data);

        const docRef: DocumentReference = await addDoc(promptCollection, {
            ...validatedData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        console.log("✅ Prompt created with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        // Zod validation error
        if (error instanceof z.ZodError) {
            console.error("❌ Validation error:", error.message);
            return {
                success: false,
                error: "Please check your input data and try again.",
            };
        }

        // Firestore error
        console.error("❌ Firestore error:", error);
        return {
            success: false,
            error: "Failed to save prompt. Please try again.",
        };
    }
}

export async function fetchPrompts() {
    try {
        const q = query(promptCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        // Fetch all prompts with usernames (parallel)
        const promptsWithAuthorPromises = querySnapshot.docs.map(docToPromptWithAuthor);
        const promptsWithAuthor = await Promise.all(promptsWithAuthorPromises);

        // Validate all prompts
        const validatedPrompts = z.array(promptWithAuthorSchema).parse(promptsWithAuthor);
        console.log(`✅ Fetched ${validatedPrompts.length} prompts with authors`);
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
            error: "Failed to fetch prompts. Please try again.",
            prompts: [],
        };
    }
}
