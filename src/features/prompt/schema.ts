import { z } from "zod";

// Schema for database document (with ID)
export const promptSchema = z.object({
    id: z.string(),
    description: z.string(),
    title: z.string().min(2, "Prompt Title is required."),
    userId: z.string().min(2, "Prompt UserId is required."),
    content: z.string().min(1, "Prompt Content is required."),
});

export type Prompt = z.infer<typeof promptSchema>;

// Schema for form input (without ID)
export const formPromptSchema = promptSchema.omit({ id: true });
export type NewPrompt = z.infer<typeof formPromptSchema>;
