"use client";

import { signOut } from "firebase/auth";
import { LogOut, Monitor, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
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

    // Show loading skeleton FIRST if loading
    if (loading) {
        return (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 animate-pulse">
                <div className="w-6 h-6 bg-muted-foreground/30 rounded-full" />
            </div>
        );
    }

    // If no user (not signed in), show children (no fallback)
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
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={avatarUrl} alt={displayName} />
                            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{displayName}</span>
                            <span className="truncate text-xs">{email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Profile */}
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                {/* Theme Submenu - Fixed with next-themes */}
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
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center cursor-pointer"
                >
                    <LogOut size={18} />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
