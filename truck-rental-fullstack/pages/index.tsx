import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { vehicles } from '@/lib/data';

export default function HomePage() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setAnimated(true);
    }, []);

    return (
        <Layout title="Enterprise Truck Rental | Moving Trucks & Commercial Vehicles">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-dark to-dark-light text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 leading-tight transition-all duration-1000 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Moving Trucks, Van Rentals &<br />Commercial Vehicles
                    </h1>
                    <p className={`text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Reliable trucks for every job — from local moves to commercial fleets. 
                        Reserve online in minutes and track your order in real-time.
                    </p>
                    <div className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-400 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Link href="/reserve" className="btn btn-primary text-base px-8 py-4">
                            🚚 Reserve Now
                        </Link>
                        <Link href="/track" className="px-8 py-4 bg-white text-dark font-bold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            🔍 Track Order
                        </Link>
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="px-4 -mt-8 relative z-20">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                        🚚 Reserve Your Truck
                    </h2>
                    <form className="space-y-5">
                        <div className="flex gap-4 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full bg-primary-light text-primary font-semibold text-sm">
                                <input type="radio" name="country" defaultChecked className="accent-primary" />
                                🇺🇸 USA
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-100 text-gray-600 font-semibold text-sm transition-colors">
                                <input type="radio" name="country" className="accent-primary" />
                                🇨🇦 Canada
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="label">Pick-Up Location *</label>
                                <input type="text" placeholder="City or Zip Code" className="input" required />
                            </div>
                            <div>
                                <label className="label">Pick-Up Date *</label>
                                <input type="date" className="input" required />
                            </div>
                            <div>
                                <label className="label">Pick-Up Time *</label>
                                <select className="input" required>
                                    <option>Select Time</option>
                                    {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="label">Return Date *</label>
                                <input type="date" className="input" required />
                            </div>
                            <div>
                                <label className="label">Return Time *</label>
                                <select className="input" required>
                                    <option>Select Time</option>
                                    {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">Vehicle Type</label>
                                <select className="input">
                                    <option>All Vehicles</option>
                                    {vehicles.map(v => <option key={v.id}>{v.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <Link href="/reserve" className="btn btn-primary btn-large text-center justify-center block">
                            Check Availability & Rates →
                        </Link>
                    </form>
                </div>
            </section>

            {/* Fleet Preview */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Our Fleet</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        From light-duty pickups to heavy commercial trucks, we have the right vehicle for your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {vehicles.map((vehicle, i) => (
                        <div 
                            key={vehicle.id} 
                            className="card card-hover cursor-pointer"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
                                <img 
                                    src={vehicle.image} 
                                    alt={vehicle.name}
                                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-dark mb-2">{vehicle.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{vehicle.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full">
                                        {vehicle.tag}
                                    </span>
                                    <span className="text-primary font-extrabold text-lg">
                                        ${vehicle.pricePerDay}<span className="text-gray-400 text-sm font-normal">/day</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/fleet" className="btn btn-outline text-base px-8 py-3">
                        View Full Fleet →
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="bg-dark text-white py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Why Choose Enterprise Truck Rental</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: '📍', title: '250+ Locations', desc: 'Convenient pickup and return across USA and Canada' },
                            { icon: '🔄', title: 'Flexible Rentals', desc: 'Daily, weekly, monthly options. Extend anytime.' },
                            { icon: '🛡️', title: 'Full Coverage', desc: 'Comprehensive protection plans for peace of mind' },
                            { icon: '⚡', title: '24/7 Roadside', desc: 'Round-the-clock assistance on every rental' },
                        ].map((feature, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-primary/30">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Business Benefits */}
            <section className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/30 rounded-full" />
                    <h3 className="text-2xl font-extrabold text-amber-700 mb-4">🚀 Business Account Benefits</h3>
                    <p className="text-gray-700 mb-6">
                        Reserve up to <span className="bg-amber-500 text-white px-2 py-0.5 rounded font-bold text-sm">5 vehicles at a time</span> when booking 24+ hours in advance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            'Multiple vehicle types per reservation',
                            'Same pickup/return for all vehicles',
                            'Dedicated account manager',
                            'Volume pricing & custom billing',
                            'Priority vehicle allocation',
                            'Monthly reporting & analytics',
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                                <span className="text-primary font-bold text-lg">✓</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Track Order CTA */}
            <section className="bg-primary-light py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-dark mb-4">Already Have a Reservation?</h2>
                    <p className="text-gray-600 mb-8">
                        Track your truck rental in real-time. Just enter your order number to see status updates, pickup details, and more.
                    </p>
                    <Link href="/track" className="btn btn-primary text-base px-10 py-4 inline-flex">
                        🔍 Track Your Order
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
