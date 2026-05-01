import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { showToast } from '@/components/Toast';

interface Vehicle {
    id: string;
    name: string;
    category: string;
    description: string;
    pricePerDay: number;
    image: string;
    available: boolean;
    tag: string;
}

export default function AdminVehicles() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        fetchVehicles();
    }, [router]);

    const fetchVehicles = async () => {
        try {
            const res = await fetch('/api/vehicles');
            const data = await res.json();
            if (data.success) setVehicles(data.data);
        } catch {
            showToast('Failed to load vehicles', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAvailability = async (vehicle: Vehicle) => {
        try {
            const res = await fetch(`/api/vehicles?id=${vehicle.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ available: !vehicle.available }),
            });
            if (res.ok) {
                showToast(`${vehicle.name} is now ${!vehicle.available ? 'available' : 'unavailable'}`, 'success');
                fetchVehicles();
            }
        } catch {
            showToast('Update failed', 'error');
        }
    };

    const handleEditPrice = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setModalOpen(true);
    };

    const handleSavePrice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingVehicle) return;

        const form = e.target as HTMLFormElement;
        const price = parseFloat((form.elements.namedItem('price') as HTMLInputElement).value);

        try {
            const res = await fetch(`/api/vehicles?id=${editingVehicle.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pricePerDay: price }),
            });
            if (res.ok) {
                showToast('Price updated', 'success');
                setModalOpen(false);
                fetchVehicles();
            }
        } catch {
            showToast('Update failed', 'error');
        }
    };

    if (loading) {
        return (
            <Layout title="Vehicles">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Fleet Management | Admin">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-dark">Fleet Management</h1>
                    <p className="text-gray-500">Manage vehicle availability and pricing</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 relative">
                                <img src={vehicle.image} alt={vehicle.name} className="max-h-full max-w-full object-contain" />
                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                                    vehicle.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {vehicle.available ? '✅ Available' : '❌ Unavailable'}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-dark mb-1">{vehicle.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{vehicle.description}</p>

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase">Price/Day</div>
                                        <div className="text-2xl font-extrabold text-primary">${vehicle.pricePerDay}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase">Category</div>
                                        <div className="font-medium text-dark capitalize">{vehicle.category}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleToggleAvailability(vehicle)}
                                        className={`flex-1 btn text-sm ${vehicle.available ? 'btn-danger' : 'btn-success'}`}
                                    >
                                        {vehicle.available ? 'Mark Unavailable' : 'Mark Available'}
                                    </button>
                                    <button 
                                        onClick={() => handleEditPrice(vehicle)}
                                        className="btn btn-outline text-sm"
                                    >
                                        💰 Edit Price
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit Price" size="sm">
                <form onSubmit={handleSavePrice} className="space-y-4">
                    <div>
                        <label className="label">Daily Rate ($)</label>
                        <input 
                            type="number" 
                            name="price"
                            defaultValue={editingVehicle?.pricePerDay}
                            min="1"
                            className="input" 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full justify-center">
                        Save Price
                    </button>
                </form>
            </Modal>
        </Layout>
    );
}
