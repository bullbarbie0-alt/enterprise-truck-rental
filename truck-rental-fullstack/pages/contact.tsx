import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { showToast } from '@/components/Toast';

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: 'What do I need to rent a truck?',
        answer: 'You need a valid driver's license, be at least 21 years old (25 for some larger vehicles), and a major credit card in your name. For commercial accounts, additional documentation may be required.',
    },
    {
        question: 'Can I rent a truck one-way?',
        answer: 'Yes! One-way rentals are available between most of our 250+ locations across the USA and Canada. Additional fees may apply depending on the distance and vehicle type.',
    },
    {
        question: 'Is insurance included in the rental price?',
        answer: 'Basic liability coverage is included. We also offer optional protection plans including collision damage waiver, personal accident insurance, and cargo protection for added peace of mind.',
    },
    {
        question: 'Do you offer discounts for long-term rentals?',
        answer: 'Absolutely. Weekly and monthly rates offer significant savings over daily rates. Business accounts also receive volume discounts and custom fleet pricing. Contact our fleet team for a quote.',
    },
    {
        question: 'What happens if I return the truck late?',
        answer: 'A grace period of 29 minutes is provided. After that, additional hourly or daily charges apply based on your rental agreement. We recommend calling ahead if you anticipate a late return.',
    },
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formLoading, setFormLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);

        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));

        showToast('Message sent! We'll get back to you within 24 hours.', 'success');
        setFormLoading(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <Layout title="Contact Us | Enterprise Truck Rental">
            <section className="bg-gradient-to-br from-dark to-dark-light text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get in Touch</h1>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                    Have questions about rentals, fleet services, or need help with a reservation? We're here to help.
                </p>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-extrabold text-dark mb-4">Contact Information</h2>
                        <p className="text-gray-500 mb-8">
                            Our team is available to assist you with any inquiries. Reach out via phone, email, or visit one of our locations.
                        </p>

                        {[
                            { icon: '📞', title: 'Phone Support', lines: ['24/7 Customer Service', '1-800-555-0123'] },
                            { icon: '✉️', title: 'Email Us', lines: ['General Inquiries', 'support@enterprisetruck.com'] },
                            { icon: '🏢', title: 'Corporate Office', lines: ['600 Corporate Park Drive', 'St. Louis, MO 63105'] },
                            { icon: '🆘', title: 'Roadside Assistance', lines: ['Emergency breakdown support', '1-800-555-0199'] },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 mb-6">
                                <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark">{item.title}</h4>
                                    {item.lines.map((line, j) => (
                                        <p key={j} className={`text-sm ${j === 0 ? 'text-gray-500' : 'text-primary font-semibold'}`}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-dark mb-2">Send a Message</h3>
                        <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll respond within 24 hours.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">First Name *</label>
                                    <input type="text" className="input" required />
                                </div>
                                <div>
                                    <label className="label">Last Name *</label>
                                    <input type="text" className="input" required />
                                </div>
                            </div>
                            <div>
                                <label className="label">Email Address *</label>
                                <input type="email" className="input" required />
                            </div>
                            <div>
                                <label className="label">Phone Number</label>
                                <input type="tel" className="input" />
                            </div>
                            <div>
                                <label className="label">Subject *</label>
                                <select className="input" required>
                                    <option value="">Select a topic</option>
                                    <option>Reservation Inquiry</option>
                                    <option>Fleet Services</option>
                                    <option>Billing Question</option>
                                    <option>Roadside Assistance</option>
                                    <option>Feedback</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">Message *</label>
                                <textarea className="input min-h-[120px]" placeholder="How can we help you today?" required />
                            </div>
                            <button 
                                type="submit" 
                                disabled={formLoading}
                                className="btn btn-primary w-full justify-center py-3 disabled:opacity-50"
                            >
                                {formLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-extrabold text-dark text-center mb-10">Frequently Asked Questions</h2>
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-bold text-dark pr-4">{faq.question}</span>
                                <span className={`text-2xl text-gray-400 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>
                            <div 
                                className={`px-6 overflow-hidden transition-all duration-300 ${
                                    openFaq === i ? 'max-h-48 pb-4' : 'max-h-0'
                                }`}
                            >
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
