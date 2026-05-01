import React, { useState, useEffect } from 'react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const toast: Toast = { id: Math.random().toString(36), message, type };
    toasts = [...toasts, toast];
    toastListeners.forEach(listener => listener(toasts));

    setTimeout(() => {
        toasts = toasts.filter(t => t.id !== toast.id);
        toastListeners.forEach(listener => listener(toasts));
    }, 3000);
}

export default function ToastContainer() {
    const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toastListeners.push(setCurrentToasts);
        return () => {
            toastListeners = toastListeners.filter(l => l !== setCurrentToasts);
        };
    }, []);

    if (currentToasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] space-y-3">
            {currentToasts.map(toast => (
                <div
                    key={toast.id}
                    className={`px-5 py-3 rounded-xl shadow-lg text-white font-semibold text-sm animate-fade-in flex items-center gap-2 ${
                        toast.type === 'success' ? 'bg-primary' :
                        toast.type === 'error' ? 'bg-red-500' :
                        'bg-dark-light'
                    }`}
                >
                    {toast.type === 'success' && '✅'}
                    {toast.type === 'error' && '❌'}
                    {toast.type === 'info' && 'ℹ️'}
                    {toast.message}
                </div>
            ))}
        </div>
    );
}
