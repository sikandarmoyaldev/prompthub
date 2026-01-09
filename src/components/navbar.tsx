import { Menu } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";

import { cn } from "@/lib/utils";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex gap-6">
                    {/* Logo */}
                    <Link href="/">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            href="/explorer"
                            className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 text-sm font-medium"
                        >
                            Explorer
                        </Link>
                    </div>
                </div>

                <div className="hidden md:flex gap-2">
                    <Link href="/auth/sign-in" className={buttonVariants({ variant: "ghost" })}>
                        Sign In
                    </Link>

                    <Link href="/auth/sign-up">
                        <Button className="cursor-pointer">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile Hamburger Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden w-10 h-10 p-0 hover:bg-accent hover:bg-opacity-50"
                        >
                            <Menu className="w-6 h-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="p-0 w-[320px] sm:w-95">
                        <SheetHeader className="p-6 border-b border-border/50">
                            <SheetTitle className="flex items-center gap-3">
                                <Logo />
                                Menu
                            </SheetTitle>
                        </SheetHeader>

                        {/* Mobile Menu Links */}
                        <div className="p-4 space-y-4">
                            <Link
                                href="/explorer"
                                className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 text-sm font-medium"
                            >
                                Explorer
                            </Link>

                            <div className="space-x-2 pt-4 border-t border-border/50">
                                <Link
                                    href="/auth/sign-in"
                                    className={buttonVariants({ variant: "ghost" })}
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/auth/sign-up"
                                    className={cn(buttonVariants(), "cursor-pointer")}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
