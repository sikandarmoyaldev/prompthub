"use client";

import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { Eye, Lock, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { fetchPromptsByUserId } from "../actions";
import { PromptWithAuthor } from "../schema";
import { promptColumns } from "./columns";

export const PromptTable: React.FC = () => {
    const { user, loading: authLoading } = useAuth({ redirectIfUnauthenticated: false });

    const [prompts, setPrompts] = useState<PromptWithAuthor[]>([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: prompts,
        columns: promptColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    useEffect(() => {
        if (authLoading || !user?.uid) {
            return;
        }

        (async () => {
            try {
                setTableLoading(true);
                const result = await fetchPromptsByUserId(user.uid);
                if (result.success) {
                    setPrompts(result.prompts || []);
                } else {
                    console.error("❌ Fetch failed:", result.error);
                }
            } catch (e) {
                console.error("💥 Fetch error:", e);
            } finally {
                setTableLoading(false);
            }
        })();
    }, [user?.uid, authLoading]);

    const titleColumn = table.getColumn("title");
    const visibilityColumn = table.getColumn("isPublic");

    // ✅ Combined loading
    if (authLoading || tableLoading) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center opacity-75">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <div className="h-9 bg-muted rounded-md animate-pulse pl-12" />
                    </div>
                    <div className="w-full md:w-40 h-9 bg-muted rounded-md animate-pulse" />
                </div>

                <div className="rounded-md border animate-pulse">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="h-12 bg-muted/50" />
                                <TableHead className="h-12 bg-muted/50" />
                                <TableHead className="w-16 h-12 bg-muted/50" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, i) => (
                                <TableRow key={i} className="animate-pulse">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-muted rounded-md" />
                                            <div className="space-y-2">
                                                <div className="h-4 bg-muted w-32 rounded" />
                                                <div className="h-3 bg-muted/60 w-48 rounded" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-6 w-16 bg-muted rounded-full" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="h-8 w-8 bg-muted rounded-full mx-auto" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search your prompts..."
                        value={(titleColumn?.getFilterValue() as string) ?? ""}
                        onChange={(event) => titleColumn?.setFilterValue(event.target.value)}
                        className="pl-9 h-9 text-sm"
                        disabled={!prompts.length}
                    />
                </div>

                <Select
                    value={(visibilityColumn?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) => {
                        if (value === "all") {
                            visibilityColumn?.setFilterValue(undefined);
                        } else {
                            visibilityColumn?.setFilterValue(value === "public");
                        }
                    }}
                    disabled={!prompts.length}
                >
                    <SelectTrigger className="w-full md:w-40 h-9 text-sm">
                        <SelectValue placeholder="Filter by..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            <div className="flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                All My Prompts
                            </div>
                        </SelectItem>
                        <SelectItem value="public">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-emerald-500" />
                                Public
                            </div>
                        </SelectItem>
                        <SelectItem value="private">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Private
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-5">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={promptColumns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {user
                                        ? "No prompts found. Create your first prompt!"
                                        : "Please sign in to view prompts."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="text-xs text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} of {prompts.length} prompt(s)
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage() || !prompts.length}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage() || !prompts.length}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};
