import { db } from "@/lib/firebase";
import { QueryDocumentSnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { type PromptWithAuthor } from "./schema";

// ✅ FIXED: usernames/{username} -> { uid: "..." }
export async function getUsernameByUserId(userId: string): Promise<string> {
    try {
        const usernamesCollection = collection(db, "usernames");

        // Query ALL username documents to find matching userId
        const q = query(usernamesCollection, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        // ✅ Return DOCUMENT ID (sikandarmoyal) when userId matches
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id; // sikandarmoyal ✅
        }

        return "Unknown User";
    } catch (error) {
        console.error(`❌ Failed to fetch username for userId: ${userId}`, error);
        return "Unknown User";
    }
}

// ✅ Transform Firestore document + fetch username from document ID
export async function docToPromptWithAuthor(doc: QueryDocumentSnapshot): Promise<PromptWithAuthor> {
    const data = doc.data();
    const username = await getUsernameByUserId(data.userId);

    return {
        id: doc.id,
        title: data.title,
        userId: data.userId,
        author: { username },
        content: data.content,
        isPublic: data.isPublic,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        description: data.description,
    };
}
