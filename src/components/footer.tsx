import { Heart } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./logo";

export function Footer() {
    return (
        <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
                <Logo />

                <Link
                    href={process.env.NEXT_PUBLIC_SPONSOR_HANDLE!}
                    target="_blank"
                    className={buttonVariants({
                        variant: "outline",
                    })}
                >
                    <Heart className="h-4 w-4 text-red-600 fill-current" />
                    Sponsor
                </Link>
            </div>
        </footer>
    );
}
