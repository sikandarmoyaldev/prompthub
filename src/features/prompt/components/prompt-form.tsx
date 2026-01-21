"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Loader2Icon, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { wait } from "@/lib/utils";
import { formPromptSchema } from "../schema";

// ✅ Updated schema with isPublic field
export const formSchema = formPromptSchema.partial({
    userId: true,
    isPublic: true, // ✅ Added isPublic
});
export type FormValues = z.infer<typeof formSchema>;

type PromptFormProps = {
    defaultValues?: Partial<FormValues>;
    onSubmit: (data: FormValues) => void;
};

export function PromptForm({ defaultValues = {}, onSubmit }: PromptFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            description: "",
            isPublic: false,
            ...defaultValues,
        },
    });

    const { reset } = form;
    const { isSubmitting } = form.formState;

    const handleSubmit = async (data: FormValues) => {
        const body = document.querySelector("body");
        body?.classList.add("pointer-events-none", "opacity-50");

        await wait(5);

        onSubmit(data);
        reset();

        body?.classList.remove("pointer-events-none", "opacity-50");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit, (error) => console.error(error))}
                className="flex flex-col gap-6"
            >
                {/* Title Field */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prompt Title</FormLabel>
                            <FormDescription>
                                Give your prompt a clear, descriptive title.
                            </FormDescription>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Next.js Project Generator, AI Content Writer..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Prompt Description <Badge variant="outline">Optional</Badge>
                            </FormLabel>
                            <FormDescription>
                                Provide more details about what this prompt does.
                            </FormDescription>
                            <FormControl>
                                <Input
                                    placeholder="Describe the purpose and usage of this prompt..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visibility</FormLabel>
                            <FormDescription>
                                Choose whether this prompt is visible to everyone or private.
                            </FormDescription>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value?.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="w-full">
                                    <SelectItem value="false">
                                        <div className="flex items-center gap-2">
                                            <Lock className="h-4 w-4" />
                                            Private (Only you)
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="true">
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-4 w-4 text-emerald-500" />
                                            Public (Everyone)
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Content Field */}
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prompt Content</FormLabel>
                            <FormDescription>
                                Enter the actual prompt text that will be used with AI models.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your prompt here..."
                                    className="min-h-37.5 font-mono"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                        <>
                            <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
                            Creating Prompt...
                        </>
                    ) : (
                        "Create Prompt"
                    )}
                </Button>
            </form>
        </Form>
    );
}
