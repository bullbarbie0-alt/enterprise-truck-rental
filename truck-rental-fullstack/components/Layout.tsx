import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function Layout({ children, title = 'Enterprise Truck Rental' }: LayoutProps) {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [auth, setAuth] = useState<{ name: string; role: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            try {
                const payload = JSON.parse(Buffer.from(token, 'base64').toString());
                setAuth(payload);
            } catch {
                localStorage.removeItem('admin_token');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        setAuth(null);
        router.push('/');
    };

    const isAdmin = router.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={title} />

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                                E
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-xl font-bold text-primary leading-tight">Enterprise</div>
                                <div className="text-xs text-gray-500 -mt-1">Truck Rental</div>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {!isAdmin ? (
                                <>
                                    <NavLink href="/" active={router.pathname === '/'}>Home</NavLink>
                                    <NavLink href="/fleet" active={router.pathname === '/fleet'}>Fleet</NavLink>
                                    <NavLink href="/locations" active={router.pathname === '/locations'}>Locations</NavLink>
                                    <NavLink href="/contact" active={router.pathname === '/contact'}>Contact</NavLink>
                                    <NavLink href="/track" active={router.pathname === '/track'}>🔍 Track Order</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink href="/admin" active={router.pathname === '/admin'}>Dashboard</NavLink>
                                    <NavLink href="/admin/reservations" active={router.pathname === '/admin/reservations'}>Reservations</NavLink>
                                    <NavLink href="/admin/vehicles" active={router.pathname === '/admin/vehicles'}>Vehicles</NavLink>
                                    <NavLink href="/admin/locations" active={router.pathname === '/admin/locations'}>Locations</NavLink>
                                </>
                            )}
                        </nav>

                        {/* Auth */}
                        <div className="hidden md:flex items-center gap-3">
                            {auth ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">{auth.name}</span>
                                    <span className="px-2 py-1 bg-primary-light text-primary text-xs font-bold rounded-full">
                                        {auth.role}
                                    </span>
                                    <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {!isAdmin && (
                                        <Link href="/admin/login" className="btn btn-outline text-sm">
                                            🔐 Admin
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button 
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
                        {!isAdmin ? (
                            <>
                                <MobileNavLink href="/" active={router.pathname === '/'}>🏠 Home</MobileNavLink>
                                <MobileNavLink href="/fleet" active={router.pathname === '/fleet'}>🚛 Fleet</MobileNavLink>
                                <MobileNavLink href="/locations" active={router.pathname === '/locations'}>📍 Locations</MobileNavLink>
                                <MobileNavLink href="/contact" active={router.pathname === '/contact'}>✉️ Contact</MobileNavLink>
                                <MobileNavLink href="/track" active={router.pathname === '/track'}>🔍 Track Order</MobileNavLink>
                                <MobileNavLink href="/admin/login">🔐 Admin Login</MobileNavLink>
                            </>
                        ) : (
                            <>
                                <MobileNavLink href="/admin" active={router.pathname === '/admin'}>📊 Dashboard</MobileNavLink>
                                <MobileNavLink href="/admin/reservations" active={router.pathname === '/admin/reservations'}>📋 Reservations</MobileNavLink>
                                <MobileNavLink href="/admin/vehicles" active={router.pathname === '/admin/vehicles'}>🚛 Vehicles</MobileNavLink>
                                <MobileNavLink href="/admin/locations" active={router.pathname === '/admin/locations'}>📍 Locations</MobileNavLink>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-3 rounded-lg text-red-500 font-medium hover:bg-red-50">
                                    🚪 Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            {!isAdmin && (
                <footer className="bg-dark text-white py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            <div className="md:col-span-2">
                                <div className="text-xl font-bold mb-4">Enterprise Truck Rental</div>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                                    Your trusted partner for moving trucks, van rentals, and commercial vehicle solutions across North America.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                                <div className="space-y-2">
                                    <Link href="/fleet" className="block text-gray-400 hover:text-white text-sm transition-colors">Our Fleet</Link>
                                    <Link href="/locations" className="block text-gray-400 hover:text-white text-sm transition-colors">Locations</Link>
                                    <Link href="/track" className="block text-gray-400 hover:text-white text-sm transition-colors">Track Order</Link>
                                    <Link href="/admin/login" className="block text-gray-400 hover:text-white text-sm transition-colors">Admin Portal</Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
                                <div className="space-y-2">
                                    <Link href="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link>
                                    <span className="block text-gray-400 text-sm">📞 1-800-555-0123</span>
                                    <span className="block text-gray-400 text-sm">🆘 1-800-555-0199</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-gray-500 text-sm">© 2026 Enterprise Truck Rental. All rights reserved.</div>
                            <div className="flex gap-6 text-sm text-gray-500">
                                <span>Privacy</span>
                                <span>Terms</span>
                                <span>Cookies</span>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}

function Head({ title }: { title: string }) {
    return (
        <head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Enterprise Truck Rental - Moving trucks, van rentals and commercial vehicles" />
        </head>
    );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
    return (
        <Link 
            href={href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                active 
                    ? 'bg-primary-light text-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
    return (
        <Link 
            href={href}
            className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                active 
                    ? 'bg-primary-light text-primary' 
                    : 'text-gray-700 hover:bg-gray-50'
            }`}
        >
            {children}
        </Link>
    );
}
