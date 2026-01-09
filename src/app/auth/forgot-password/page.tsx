import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { ForgotPasswordForm } from "./form";

export const metadata: Metadata = {
    title: "Forgot Password",
};

export default function ForgotPassword() {
    return (
        <main className="px-4 flex justify-center items-center h-screen w-full">
            <Card className="sm:w-md w-full p-8 border border-border">
                <div className="space-y-6">
                    <ForgotPasswordForm />
                </div>
            </Card>
        </main>
    );
}
