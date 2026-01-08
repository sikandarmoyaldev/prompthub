import type { PropsWithChildren } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
