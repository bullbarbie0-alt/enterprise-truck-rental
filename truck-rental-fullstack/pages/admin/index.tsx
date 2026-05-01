import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { showToast } from '@/components/Toast';

interface Stats {
    totalReservations: number;
    pending: number;
    active: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
    totalVehicles: number;
    totalLocations: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        fetchStats();
        fetchRecentOrders();
    }, [router]);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/stats');
            const data = await res.json();
            if (data.success) setStats(data.data);
        } catch {
            showToast('Failed to load stats', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentOrders = async () => {
        try {
            const res = await fetch('/api/reservations');
            const data = await res.json();
            if (data.success) setRecentOrders(data.data.slice(0, 5));
        } catch {
            console.error('Failed to load recent orders');
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-blue-100 text-blue-700',
            active: 'bg-primary-light text-primary',
            completed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
        };
        return colors[status] || 'bg-gray-100';
    };

    if (loading) {
        return (
            <Layout title="Admin Dashboard">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Admin Dashboard | Enterprise Truck Rental">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-dark">Dashboard</h1>
                        <p className="text-gray-500">Overview of your truck rental operations</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/admin/reservations/new" className="btn btn-primary">
                            + New Reservation
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Revenue', value: `$${stats?.totalRevenue.toLocaleString() || 0}`, icon: '💰', color: 'bg-green-50 text-green-600' },
                        { label: 'Reservations', value: stats?.totalReservations || 0, icon: '📋', color: 'bg-blue-50 text-blue-600' },
                        { label: 'Active Rentals', value: stats?.active || 0, icon: '🚚', color: 'bg-primary-light text-primary' },
                        { label: 'Pending', value: stats?.pending || 0, icon: '⏳', color: 'bg-yellow-50 text-yellow-600' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">{stat.icon}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.color}`}>
                                    {i === 0 ? 'This Month' : 'Live'}
                                </span>
                            </div>
                            <div className="text-2xl font-extrabold text-dark">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Status Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-dark mb-4">Reservation Status Breakdown</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Confirmed', count: stats?.confirmed || 0, total: stats?.totalReservations || 1, color: 'bg-blue-500' },
                                { label: 'Active', count: stats?.active || 0, total: stats?.totalReservations || 1, color: 'bg-primary' },
                                { label: 'Completed', count: stats?.completed || 0, total: stats?.totalReservations || 1, color: 'bg-green-500' },
                                { label: 'Pending', count: stats?.pending || 0, total: stats?.totalReservations || 1, color: 'bg-yellow-500' },
                                { label: 'Cancelled', count: stats?.cancelled || 0, total: stats?.totalReservations || 1, color: 'bg-red-500' },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">{item.label}</span>
                                        <span className="font-bold text-dark">{item.count}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                                            style={{ width: `${(item.count / item.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-dark mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link href="/admin/reservations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">📋</span>
                                <div>
                                    <div className="font-semibold text-sm text-dark">Manage Reservations</div>
                                    <div className="text-xs text-gray-500">View, edit, cancel orders</div>
                                </div>
                            </Link>
                            <Link href="/admin/vehicles" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary">🚛</span>
                                <div>
                                    <div className="font-semibold text-sm text-dark">Fleet Management</div>
                                    <div className="text-xs text-gray-500">Update availability & pricing</div>
                                </div>
                            </Link>
                            <Link href="/admin/locations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">📍</span>
                                <div>
                                    <div className="font-semibold text-sm text-dark">Locations</div>
                                    <div className="text-xs text-gray-500">Manage branches & hours</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-dark">Recent Orders</h3>
                        <Link href="/admin/reservations" className="text-primary text-sm font-semibold hover:underline">
                            View All →
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order #</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-bold text-dark">{order.orderNumber}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-dark">{order.customerName}</div>
                                            <div className="text-xs text-gray-500">{order.customerEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{order.vehicleName}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-primary">${order.totalPrice}</td>
                                        <td className="px-6 py-4">
                                            <Link 
                                                href={`/admin/reservations?id=${order.id}`}
                                                className="text-primary text-sm font-semibold hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
