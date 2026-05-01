import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { showToast } from '@/components/Toast';

interface Reservation {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    vehicleId: string;
    vehicleName: string;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    status: string;
    totalPrice: number;
    days: number;
    notes: string;
    createdAt: string;
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];
const VEHICLE_OPTIONS = [
    { id: 'v1', name: 'Pickup Trucks', price: 49 },
    { id: 'v2', name: 'Cargo Vans', price: 59 },
    { id: 'v3', name: 'Box Trucks', price: 89 },
    { id: 'v4', name: 'Stakebed Trucks', price: 95 },
    { id: 'v5', name: 'Flatbed Trucks', price: 99 },
    { id: 'v6', name: 'Service Body Trucks', price: 79 },
    { id: 'v7', name: 'Refrigerated Trucks', price: 129 },
];

const LOCATIONS = [
    'New York, NY - Midtown',
    'Los Angeles, CA - Downtown',
    'Chicago, IL - Loop',
    'Houston, TX - Galleria',
    'Phoenix, AZ - Central',
    'Philadelphia, PA - Center City',
    'San Antonio, TX - Downtown',
    'San Diego, CA - Mission Valley',
    'Dallas, TX - Uptown',
    'San Jose, CA - Downtown',
];

export default function AdminReservations() {
    const router = useRouter();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        fetchReservations();
    }, [router]);

    const fetchReservations = async () => {
        try {
            const res = await fetch('/api/reservations');
            const data = await res.json();
            if (data.success) setReservations(data.data);
        } catch {
            showToast('Failed to load reservations', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this reservation?')) return;

        try {
            const res = await fetch(`/api/reservations?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Reservation deleted', 'success');
                fetchReservations();
            }
        } catch {
            showToast('Delete failed', 'error');
        }
    };

    const handleEdit = (reservation: Reservation) => {
        setEditingId(reservation.id);
        setFormData({ ...reservation });
        setModalOpen(true);
    };

    const handleNew = () => {
        setEditingId(null);
        setFormData({
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            vehicleId: 'v1',
            pickupLocation: LOCATIONS[0],
            returnLocation: LOCATIONS[0],
            pickupDate: '',
            pickupTime: '10:00 AM',
            returnDate: '',
            returnTime: '4:00 PM',
            status: 'pending',
            days: 1,
            notes: '',
        });
        setModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const vehicle = VEHICLE_OPTIONS.find(v => v.id === formData.vehicleId);
        const totalPrice = (vehicle?.price || 49) * (formData.days || 1);

        const payload = {
            ...formData,
            vehicleName: vehicle?.name || 'Pickup Trucks',
            totalPrice,
        };

        try {
            if (editingId) {
                const res = await fetch(`/api/reservations?id=${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    showToast('Reservation updated', 'success');
                }
            } else {
                const res = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    const data = await res.json();
                    showToast(`Created! Order: ${data.data.orderNumber}`, 'success');
                }
            }
            setModalOpen(false);
            fetchReservations();
        } catch {
            showToast('Save failed', 'error');
        }
    };

    const filtered = reservations.filter(r => {
        const matchesSearch = !search || 
            r.customerName.toLowerCase().includes(search.toLowerCase()) ||
            r.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            r.vehicleName.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

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
            <Layout title="Reservations">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Manage Reservations | Admin">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-dark">Reservations</h1>
                        <p className="text-gray-500">Manage all truck rental orders</p>
                    </div>
                    <button onClick={handleNew} className="btn btn-primary">
                        + New Reservation
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by name, order #, or vehicle..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input flex-1"
                    />
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="input md:w-48"
                    >
                        <option value="all">All Statuses</option>
                        {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Order #</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Vehicle</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dates</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono font-bold text-dark text-sm">{r.orderNumber}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-dark text-sm">{r.customerName}</div>
                                            <div className="text-xs text-gray-500">{r.customerEmail}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{r.vehicleName}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {r.pickupDate} → {r.returnDate}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(r.status)}`}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-bold text-primary text-sm">${r.totalPrice}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleEdit(r)}
                                                    className="text-primary text-sm font-semibold hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(r.id)}
                                                    className="text-red-500 text-sm font-semibold hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No reservations found matching your criteria.
                        </div>
                    )}
                </div>
            </div>

            {/* Edit/Create Modal */}
            <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)}
                title={editingId ? 'Edit Reservation' : 'New Reservation'}
                size="lg"
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Customer Name *</label>
                            <input 
                                type="text" 
                                value={formData.customerName || ''}
                                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                                className="input" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Email *</label>
                            <input 
                                type="email" 
                                value={formData.customerEmail || ''}
                                onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                                className="input" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Phone</label>
                            <input 
                                type="tel" 
                                value={formData.customerPhone || ''}
                                onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                                className="input" 
                            />
                        </div>
                        <div>
                            <label className="label">Vehicle *</label>
                            <select 
                                value={formData.vehicleId || 'v1'}
                                onChange={(e) => setFormData({...formData, vehicleId: e.target.value})}
                                className="input"
                            >
                                {VEHICLE_OPTIONS.map(v => (
                                    <option key={v.id} value={v.id}>{v.name} - ${v.price}/day</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Pick-Up Location *</label>
                            <select 
                                value={formData.pickupLocation || ''}
                                onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                                className="input"
                                required
                            >
                                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Return Location *</label>
                            <select 
                                value={formData.returnLocation || ''}
                                onChange={(e) => setFormData({...formData, returnLocation: e.target.value})}
                                className="input"
                                required
                            >
                                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Pick-Up Date *</label>
                            <input 
                                type="date" 
                                value={formData.pickupDate || ''}
                                onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                                className="input" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Pick-Up Time *</label>
                            <select 
                                value={formData.pickupTime || ''}
                                onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                                className="input"
                            >
                                {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Return Date *</label>
                            <input 
                                type="date" 
                                value={formData.returnDate || ''}
                                onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                                className="input" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Return Time *</label>
                            <select 
                                value={formData.returnTime || ''}
                                onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
                                className="input"
                            >
                                {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Days</label>
                            <input 
                                type="number" 
                                min="1"
                                value={formData.days || 1}
                                onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                                className="input" 
                            />
                        </div>
                        <div>
                            <label className="label">Status</label>
                            <select 
                                value={formData.status || 'pending'}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="input"
                            >
                                {STATUS_OPTIONS.map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="label">Notes</label>
                        <textarea 
                            value={formData.notes || ''}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="input min-h-[80px]"
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="btn btn-primary flex-1 justify-center">
                            {editingId ? '💾 Save Changes' : '✅ Create Reservation'}
                        </button>
                        <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
}
