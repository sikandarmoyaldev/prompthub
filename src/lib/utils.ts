import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function wait(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function getInitials(name: string) {
    if (!name) return "";

    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0][0]?.toUpperCase() || "";
    }

    return (words[0][0] || "").toUpperCase() + (words[1][0] || "").toUpperCase();
}
