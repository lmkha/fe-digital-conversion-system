'use client';

import { useAuth } from "@/contexts/authContext";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Page() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <h1>DTI Digital Conversion System</h1>
    </div>
  );
}
