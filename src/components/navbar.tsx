import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Logo />

                <div className="flex items-center gap-4">
                    <Link href="/auth/sign-in">
                        <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/auth/sign-up">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
