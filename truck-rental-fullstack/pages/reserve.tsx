import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ReservePage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/#booking');
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
    );
}
