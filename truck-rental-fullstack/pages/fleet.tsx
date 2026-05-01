import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { vehicles } from '@/lib/data';

type FilterCategory = 'all' | 'light' | 'medium' | 'heavy' | 'specialty';

export default function FleetPage() {
    const [filter, setFilter] = useState<FilterCategory>('all');

    const filtered = filter === 'all' 
        ? vehicles 
        : vehicles.filter(v => v.category === filter);

    const filters: { key: FilterCategory; label: string }[] = [
        { key: 'all', label: 'All Vehicles' },
        { key: 'light', label: 'Light Duty' },
        { key: 'medium', label: 'Medium Duty' },
        { key: 'heavy', label: 'Heavy Duty' },
        { key: 'specialty', label: 'Specialty' },
    ];

    return (
        <Layout title="Our Fleet | Enterprise Truck Rental">
            {/* Hero */}
            <section className="bg-gradient-to-br from-dark to-dark-light text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Complete Fleet</h1>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                    Explore our full range of commercial vehicles, from compact cargo vans to heavy-duty flatbeds.
                </p>
            </section>

            {/* Filters */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-3 justify-center">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                filter === f.key 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vehicle Details */}
            <section className="max-w-6xl mx-auto px-4 pb-20">
                <div className="space-y-8">
                    {filtered.map((vehicle, i) => (
                        <div 
                            key={vehicle.id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="h-64 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
                                    <img 
                                        src={vehicle.image} 
                                        alt={vehicle.name}
                                        className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full">
                                            {vehicle.tag}
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full capitalize">
                                            {vehicle.category} Duty
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-dark mb-3">{vehicle.name}</h3>
                                    <p className="text-gray-500 mb-6 leading-relaxed">{vehicle.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {Object.entries(vehicle.specs).map(([key, value]) => (
                                            <div key={key} className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary text-lg">
                                                    {key.includes('payload') || key.includes('gvwr') || key.includes('weight') ? '⚖️' :
                                                     key.includes('drive') ? '🛞' :
                                                     key.includes('seat') ? '👥' :
                                                     key.includes('bed') || key.includes('length') || key.includes('body') ? '📏' :
                                                     key.includes('cargo') || key.includes('volume') ? '📦' :
                                                     key.includes('lift') ? '🔌' :
                                                     key.includes('compartment') ? '🧰' :
                                                     key.includes('temp') ? '🌡️' : '✓'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-dark text-sm">{value}</div>
                                                    <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div>
                                            <div className="text-xs text-gray-400">Starting at</div>
                                            <div className="text-3xl font-extrabold text-primary">
                                                ${vehicle.pricePerDay}<span className="text-base text-gray-400 font-normal">/day</span>
                                            </div>
                                        </div>
                                        <Link href="/reserve" className="btn btn-primary px-8 py-3">
                                            Reserve Now →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
