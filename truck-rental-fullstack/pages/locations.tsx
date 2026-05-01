import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { locations } from '@/lib/data';

export default function LocationsPage() {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState(locations);

    useEffect(() => {
        if (!search) {
            setFiltered(locations);
            return;
        }
        const term = search.toLowerCase();
        setFiltered(locations.filter(l => 
            l.city.toLowerCase().includes(term) ||
            l.state.toLowerCase().includes(term) ||
            l.zip.includes(term) ||
            l.name.toLowerCase().includes(term)
        ));
    }, [search]);

    return (
        <Layout title="Locations | Enterprise Truck Rental">
            <section className="bg-gradient-to-br from-dark to-dark-light text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find a Location Near You</h1>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                    With over 250 locations across the USA and Canada, we're never far away.
                </p>
            </section>

            <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white rounded-xl shadow-xl p-4 flex gap-3">
                    <input
                        type="text"
                        placeholder="Search by city, state, or zip code..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input flex-1"
                    />
                    <button className="btn btn-primary px-6">Search</button>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((loc) => (
                        <div key={loc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-bold text-dark mb-2">📍 {loc.name}</h3>
                            <div className="text-gray-500 text-sm mb-4 leading-relaxed">
                                {loc.address}<br />
                                {loc.city}, {loc.state} {loc.zip}
                            </div>
                            <a href={`tel:${loc.phone.replace(/\D/g, '')}`} className="text-primary font-bold text-sm block mb-3 hover:underline">
                                📞 {loc.phone}
                            </a>
                            <div className="text-xs text-gray-400 pt-3 border-t border-gray-100">
                                <span className="font-semibold text-gray-600">Hours:</span><br />
                                {loc.hours}
                            </div>
                        </div>
                    ))}
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No locations found matching your search.
                    </div>
                )}
            </section>
        </Layout>
    );
}
