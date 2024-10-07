'use client';

import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login');
        }
    }, [isLoggedIn]);

    return (
        <div>
            <h1>Management Page</h1>
        </div>
    );
}
