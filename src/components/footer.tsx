import { Logo } from "./logo";

export function Footer() {
    return (
        <footer className="border-t border-border mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between flex-col md:flex-row gap-4">
                <Logo />

                <p className="text-muted-foreground text-sm">
                    A community for sharing and discovering AI prompts.
                </p>
            </div>
        </footer>
    );
}
