import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { showToast } from '@/components/Toast';

interface TrackingEvent {
    id: string;
    timestamp: string;
    status: string;
    location: string;
    description: string;
    icon: string;
}

interface Reservation {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
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
    trackingHistory: TrackingEvent[];
}

export default function TrackPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) {
            setError('Please enter an order number');
            return;
        }

        setLoading(true);
        setError('');
        setReservation(null);

        try {
            const res = await fetch(`/api/reservations?orderNumber=${encodeURIComponent(orderNumber.trim())}`);
            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || 'Reservation not found. Please check your order number.');
                showToast('Order not found', 'error');
                return;
            }

            setReservation(data.data);
            showToast('Reservation found!', 'success');
        } catch (err) {
            setError('Network error. Please try again.');
            showToast('Network error', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
            confirmed: 'bg-blue-100 text-blue-700 border-blue-300',
            active: 'bg-primary-light text-primary border-primary',
            completed: 'bg-green-100 text-green-700 border-green-300',
            cancelled: 'bg-red-100 text-red-700 border-red-300',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusIcon = (status: string) => {
        const icons: Record<string, string> = {
            pending: '⏳',
            confirmed: '✅',
            active: '🚚',
            completed: '🏁',
            cancelled: '❌',
        };
        return icons[status] || '📋';
    };

    return (
        <Layout title="Track Your Order | Enterprise Truck Rental">
            {/* Hero */}
            <section className="bg-gradient-to-br from-dark to-dark-light text-white py-16 px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Track Your Reservation</h1>
                <p className="text-white/80 text-lg max-w-xl mx-auto">
                    Enter your order number to see real-time updates on your truck rental status.
                </p>
            </section>

            {/* Search Form */}
            <section className="px-4 -mt-8 relative z-10">
                <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleTrack} className="space-y-4">
                        <div>
                            <label className="label">Order Number</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                                    placeholder="e.g. TRK-A1B2C3"
                                    className="input flex-1 uppercase"
                                    style={{ textTransform: 'uppercase' }}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary px-8 whitespace-nowrap disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Tracking...
                                        </span>
                                    ) : (
                                        '🔍 Track'
                                    )}
                                </button>
                            </div>
                            <p className="text-gray-400 text-xs mt-2">
                                Your order number was emailed to you after booking. Format: TRK-XXXXXX
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                ❌ {error}
                            </div>
                        )}
                    </form>
                </div>
            </section>

            {/* Results */}
            {reservation && (
                <section className="max-w-4xl mx-auto px-4 py-12">
                    {/* Order Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Order Number</div>
                                <div className="text-2xl font-extrabold text-dark tracking-wider">{reservation.orderNumber}</div>
                            </div>
                            <div className={`px-6 py-3 rounded-full border-2 font-bold text-sm flex items-center gap-2 ${getStatusColor(reservation.status)}`}>
                                {getStatusIcon(reservation.status)}
                                {reservation.status.toUpperCase()}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Customer</div>
                                <div className="font-bold text-dark">{reservation.customerName}</div>
                                <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                                <div className="text-sm text-gray-500">{reservation.customerPhone}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Vehicle</div>
                                <div className="font-bold text-dark">{reservation.vehicleName}</div>
                                <div className="text-sm text-gray-500">{reservation.days} day(s)</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Price</div>
                                <div className="text-3xl font-extrabold text-primary">${reservation.totalPrice}</div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                        <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                            📋 Tracking History
                        </h3>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                            <div className="space-y-8">
                                {reservation.trackingHistory.map((event, index) => (
                                    <div key={event.id} className="relative flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                                        {/* Dot */}
                                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                                            index === 0 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {event.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pt-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                                                <span className="font-bold text-dark">{event.status}</span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(event.timestamp).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                            <div className="text-sm text-primary font-medium mb-1">📍 {event.location}</div>
                                            <p className="text-gray-600 text-sm">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                                🚀 Pick-Up Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Location</span>
                                    <span className="font-medium text-dark text-right">{reservation.pickupLocation}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-medium text-dark">{reservation.pickupDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Time</span>
                                    <span className="font-medium text-dark">{reservation.pickupTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                                🏁 Return Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Location</span>
                                    <span className="font-medium text-dark text-right">{reservation.returnLocation}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-medium text-dark">{reservation.returnDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Time</span>
                                    <span className="font-medium text-dark">{reservation.returnTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {reservation.notes && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
                            <div className="flex items-start gap-3">
                                <span className="text-amber-500 text-xl">📝</span>
                                <div>
                                    <div className="font-bold text-amber-800 text-sm mb-1">Special Instructions</div>
                                    <p className="text-amber-700 text-sm">{reservation.notes}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <button 
                            onClick={() => window.print()}
                            className="btn btn-outline"
                        >
                            🖨️ Print Receipt
                        </button>
                        <a 
                            href={`mailto:support@enterprisetruck.com?subject=Question about order ${reservation.orderNumber}`}
                            className="btn btn-primary"
                        >
                            ✉️ Contact Support
                        </a>
                    </div>
                </section>
            )}

            {/* Demo hint */}
            {!reservation && !loading && (
                <section className="max-w-xl mx-auto px-4 py-12 text-center">
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h3 className="font-bold text-dark mb-2">🎯 Try a Demo Order</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Use one of these order numbers to see how tracking works:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {['TRK-A1B2C3', 'TRK-X9Y8Z7', 'TRK-M4N5O6', 'TRK-P7Q8R9'].map(num => (
                                <button
                                    key={num}
                                    onClick={() => {
                                        setOrderNumber(num);
                                        setTimeout(() => {
                                            const form = document.querySelector('form');
                                            form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                        }, 100);
                                    }}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono hover:border-primary hover:text-primary transition-colors"
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
