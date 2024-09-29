'use client';
import auth from "@/api/Auth";

export default function Page() {

    return (
        <div>
            <button onClick={() => {
                auth.login(
                    'Kha',
                    'MinhKh@21',
                    '3d4df854-0cfe-4baf-bf3f-b566311c6d2e'
                )
            }}>Login</button>
        </div>
    );
}
