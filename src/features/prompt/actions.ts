import { db } from "@/lib/firebase";
import { addDoc, collection, DocumentReference, serverTimestamp } from "firebase/firestore";
import { z } from "zod";

import { formPromptSchema, type NewPrompt } from "./schema";

export const promptCollection = collection(db, "prompts");

export async function createPrompt(data: NewPrompt) {
    console.log(data);
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
