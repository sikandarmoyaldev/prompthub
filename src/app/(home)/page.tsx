import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

export default function Home() {
    return (
        <main className="p-8">
            <h1 className="text-3xl font-semibold underline">Home</h1>
        </main>
    );
}
