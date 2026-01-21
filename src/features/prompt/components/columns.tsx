import { ColumnDef } from "@tanstack/react-table";
import { Eye, Lock, MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PromptWithAuthor } from "@/features/prompt/schema";
import { cn } from "@/lib/utils";

export const promptColumns: ColumnDef<PromptWithAuthor>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const prompt = row.original;

            return (
                <div className="flex items-center justify-between gap-4 py-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* ✅ Icon changes based on isPublic */}
                        <div
                            className={cn(
                                "flex items-center justify-center h-8 w-8 rounded-md border shadow-sm bg-muted/50 border-border/50",
                            )}
                        >
                            {prompt.isPublic ? (
                                <Eye className="h-4 w-4 text-emerald-500" />
                            ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground text-sm truncate max-w-50">
                                    {prompt.title}
                                </h3>
                            </div>

                            {/* ✅ Text overflow with ellipsis */}
                            {prompt.description && (
                                <span
                                    className="text-xs text-muted-foreground block truncate max-w-62.5"
                                    title={prompt.description} // ✅ Tooltip on hover
                                >
                                    {prompt.description}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "isPublic",
        header: "isPublic",
        cell: ({ row }) => row.getValue("isPublic"),
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const prompt = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(prompt.id)}>
                            Copy prompt ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Update Prompt</DropdownMenuItem>
                        <DropdownMenuItem>Delete Prompt</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
