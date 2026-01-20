"use client";

import { signOut } from "firebase/auth";
import { LogOut, Monitor, Moon, Plus, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { auth } from "@/lib/firebase";
import { getInitials } from "@/lib/utils";
import { useAuth } from "../hooks/use-auth";

export function UserButton({ children }: PropsWithChildren) {
    const router = useRouter();
    const { setTheme } = useTheme();
    const { user, loading } = useAuth({ redirectIfUnauthenticated: false });

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/");
        router.refresh();
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 animate-pulse">
                <div className="w-6 h-6 bg-muted-foreground/30 rounded-full" />
            </div>
        );
    }

    // No user → show children
    if (!user) {
        return children;
    }

    const displayName = user.displayName || user.email?.split("@")[0] || "User";
    const email = user.email || "";
    const avatarUrl = user.photoURL || "";
    const initials = getInitials(displayName);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
                >
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={avatarUrl} alt={displayName} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={avatarUrl} alt={displayName} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{displayName}</span>
                            <span className="truncate text-xs text-muted-foreground">{email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Profile & Actions */}
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center w-full">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="/prompts/new" className="flex items-center w-full">
                            <Plus className="h-4 w-4" />
                            <span>New Prompt</span>
                            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                {/* Theme Submenu */}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Sun className="h-4 w-4" />
                        <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="h-4 w-4" />
                            <span>Light</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="h-4 w-4" />
                            <span>Dark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Monitor className="h-4 w-4" />
                            <span>System</span>
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Sign Out */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                    <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded-md font-mono">
                        Esc
                    </kbd>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
