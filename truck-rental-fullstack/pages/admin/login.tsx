import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { showToast } from '@/components/Toast';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                showToast(data.error || 'Invalid credentials', 'error');
                return;
            }

            localStorage.setItem('admin_token', data.token);
            showToast(`Welcome, ${data.user.name}!`, 'success');
            router.push('/admin');
        } catch (err) {
            showToast('Login failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Admin Login | Enterprise Truck Rental">
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                            🔐
                        </div>
                        <h1 className="text-2xl font-extrabold text-dark">Admin Portal</h1>
                        <p className="text-gray-500 text-sm mt-2">Sign in to manage reservations, vehicles, and locations</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="label">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@truckrental.com"
                                className="input"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="input"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full justify-center py-3 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Demo Credentials</div>
                        <div className="text-sm text-gray-600 space-y-1">
                            <div><span className="font-mono text-primary">admin@truckrental.com</span> / <span className="font-mono">admin123</span></div>
                            <div><span className="font-mono text-primary">manager@truckrental.com</span> / <span className="font-mono">manager123</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
