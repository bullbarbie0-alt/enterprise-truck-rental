import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

interface Location {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    hours: string;
}

export default function AdminLocations() {
    const router = useRouter();
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        fetchLocations();
    }, [router]);

    const fetchLocations = async () => {
        try {
            const res = await fetch('/api/locations');
            const data = await res.json();
            if (data.success) setLocations(data.data);
        } catch {
            console.error('Failed to load locations');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout title="Locations">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Locations | Admin">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-dark">Locations</h1>
                    <p className="text-gray-500">Manage rental branches across North America</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((loc) => (
                        <div key={loc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-dark mb-2">{loc.name}</h3>
                            <div className="text-gray-600 text-sm mb-4">
                                {loc.address}<br />
                                {loc.city}, {loc.state} {loc.zip}
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-primary font-semibold">
                                    📞 {loc.phone}
                                </div>
                                <div className="text-gray-500">
                                    <span className="font-semibold text-gray-700">Hours:</span><br />
                                    {loc.hours}
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                                    {loc.state}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                                    Active
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
