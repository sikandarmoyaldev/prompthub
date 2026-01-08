import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                    {process.env.NEXT_PUBLIC_APP_NAME![0]}
                </span>
            </div>
            <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </Link>
    );
}
