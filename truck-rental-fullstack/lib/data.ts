// Simulated Database - In production, replace with Prisma + PostgreSQL
import { v4 as uuidv4 } from 'uuid';

export interface Vehicle {
    id: string;
    name: string;
    category: 'light' | 'medium' | 'heavy' | 'specialty';
    description: string;
    pricePerDay: number;
    image: string;
    specs: {
        payload?: string;
        drive?: string;
        seats?: string;
        bedLength?: string;
        cargoVolume?: string;
        interiorLength?: string;
        gvwr?: string;
        liftgate?: string;
        compartments?: string;
        tempRange?: string;
        bodyLength?: string;
    };
    tag: string;
    available: boolean;
}

export interface Reservation {
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
    status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
    totalPrice: number;
    days: number;
    notes: string;
    createdAt: string;
    updatedAt: string;
    trackingHistory: TrackingEvent[];
}

export interface TrackingEvent {
    id: string;
    timestamp: string;
    status: string;
    location: string;
    description: string;
    icon: string;
}

export interface AdminUser {
    id: string;
    email: string;
    password: string; // hashed in production
    name: string;
    role: 'admin' | 'superadmin';
}

export interface Location {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    hours: string;
    lat: number;
    lng: number;
}

// ===== INITIAL DATA =====

export const vehicles: Vehicle[] = [
    {
        id: 'v1',
        name: 'Pickup Trucks',
        category: 'light',
        description: '1/2-ton to 1-ton pickup trucks with 2WD and 4WD options. Perfect for light hauling, landscaping, and small moves.',
        pricePerDay: 49,
        image: 'https://www.enterprisetrucks.com/content/dam/truckrental/en_us/carouselimageswithouttext/vehicles/pickup-trucks/SPAR_22_Standard%20Pickup_AngularFront_US%20ENG.png',
        specs: { payload: '1/2 - 1 Ton', drive: '2WD / 4WD', seats: '3-6 Seats', bedLength: '6.5-8 ft' },
        tag: 'Most Popular',
        available: true,
    },
    {
        id: 'v2',
        name: 'Cargo Vans',
        category: 'light',
        description: 'Enclosed cargo vans for secure transport of goods, equipment, and deliveries. City-friendly size.',
        pricePerDay: 59,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/051/965/383/small_2x/large-white-cargo-van-side-view-on-transparent-background-png.png',
        specs: { cargoVolume: '250-350 cu ft', interiorLength: '130-148 in', seats: '2-3 Seats' },
        tag: 'City Friendly',
        available: true,
    },
    {
        id: 'v3',
        name: 'Box Trucks',
        category: 'medium',
        description: 'Enclosed box trucks from 16ft to 26ft. Ideal for moving homes, offices, and large freight.',
        pricePerDay: 89,
        image: 'https://img.freepik.com/free-psd/half-side-view-box-truck-isolated-background_1409-3691.jpg?semt=ais_hybrid&w=740&q=80',
        specs: { cargoVolume: '800-1,600 cu ft', gvwr: '12,500-26,000 lbs', seats: '2-3 Seats', liftgate: 'Available' },
        tag: 'Moving & Storage',
        available: true,
    },
    {
        id: 'v4',
        name: 'Stakebed Trucks',
        category: 'medium',
        description: 'Open flatbed trucks with removable wooden or metal side rails. Easy loading of bulky items.',
        pricePerDay: 95,
        image: 'https://media.gettyimages.com/id/172174909/photo/flatbed-truck-with-side-rails-isolated-on-white-background.jpg?s=1024x1024&w=gi&k=20&c=vQ-WSU2muvVsN8FrowITAmmN_6k8uD3FYe_VsVa1CI4=',
        specs: { bedLength: '12-16 ft', gvwr: '14,000-19,500 lbs', seats: '2-3 Seats' },
        tag: 'Heavy Duty',
        available: true,
    },
    {
        id: 'v5',
        name: 'Flatbed Trucks',
        category: 'heavy',
        description: 'Heavy-duty open flatbeds for hauling construction materials, machinery, and oversized loads.',
        pricePerDay: 99,
        image: 'https://cdn-ilejijg.nitrocdn.com/JCNqfwQgMyaILZidIUSEdWMZrniyKBVb/assets/images/optimized/rev-b03ecfa/www.cityrentatruck.com/wp-content/uploads/2025/12/11-F550-Flatbed-scaled.png',
        specs: { bedLength: '16-24 ft', gvwr: '19,500-33,000 lbs', seats: '2-5 Seats' },
        tag: 'Construction',
        available: true,
    },
    {
        id: 'v6',
        name: 'Service Body Trucks',
        category: 'specialty',
        description: 'Work trucks with built-in tool storage compartments. Designed for electricians, plumbers, and contractors.',
        pricePerDay: 79,
        image: 'https://commercial.monroetruck.com/wp-content/uploads/2021/08/ServiceProElite-08.jpg',
        specs: { compartments: 'Multiple Lockable', payload: '1/2-1 Ton', seats: '2-5 Seats' },
        tag: 'Trade Pros',
        available: true,
    },
    {
        id: 'v7',
        name: 'Refrigerated Trucks',
        category: 'specialty',
        description: 'Temperature-controlled transport for perishable goods, pharmaceuticals, and food service.',
        pricePerDay: 129,
        image: 'https://chillfreez.com/wp-content/uploads/2025/08/modern-refrigerated-truck-logistics.jpg.jpg',
        specs: { tempRange: '-20°F to 70°F', bodyLength: '14-26 ft' },
        tag: 'Cold Chain',
        available: true,
    },
];

export const locations: Location[] = [
    { id: 'l1', name: 'New York, NY - Midtown', address: '450 W 33rd St', city: 'New York', state: 'NY', zip: '10001', phone: '(212) 555-0100', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 40.7536, lng: -73.9973 },
    { id: 'l2', name: 'Los Angeles, CA - Downtown', address: '933 S Broadway', city: 'Los Angeles', state: 'CA', zip: '90015', phone: '(213) 555-0200', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 34.0407, lng: -118.2568 },
    { id: 'l3', name: 'Chicago, IL - Loop', address: '225 S Canal St', city: 'Chicago', state: 'IL', zip: '60606', phone: '(312) 555-0300', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 41.8781, lng: -87.6393 },
    { id: 'l4', name: 'Houston, TX - Galleria', address: '2800 Post Oak Blvd', city: 'Houston', state: 'TX', zip: '77056', phone: '(713) 555-0400', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 29.7393, lng: -95.4615 },
    { id: 'l5', name: 'Phoenix, AZ - Central', address: '202 E McDowell Rd', city: 'Phoenix', state: 'AZ', zip: '85004', phone: '(602) 555-0500', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 33.4734, lng: -112.0740 },
    { id: 'l6', name: 'Philadelphia, PA - Center City', address: '1500 Market St', city: 'Philadelphia', state: 'PA', zip: '19102', phone: '(215) 555-0600', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 39.9526, lng: -75.1652 },
    { id: 'l7', name: 'San Antonio, TX - Downtown', address: '400 E Houston St', city: 'San Antonio', state: 'TX', zip: '78205', phone: '(210) 555-0700', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 29.4241, lng: -98.4936 },
    { id: 'l8', name: 'San Diego, CA - Mission Valley', address: '1640 Camino Del Rio N', city: 'San Diego', state: 'CA', zip: '92108', phone: '(619) 555-0800', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 32.7678, lng: -117.1561 },
    { id: 'l9', name: 'Dallas, TX - Uptown', address: '2626 Howell St', city: 'Dallas', state: 'TX', zip: '75204', phone: '(214) 555-0900', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 32.7972, lng: -96.8028 },
    { id: 'l10', name: 'San Jose, CA - Downtown', address: '65 N Market St', city: 'San Jose', state: 'CA', zip: '95113', phone: '(408) 555-1000', hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM, Sun: 9AM-3PM', lat: 37.3382, lng: -121.8863 },
];

export const adminUsers: AdminUser[] = [
    { id: 'a1', email: 'admin@truckrental.com', password: 'admin123', name: 'System Admin', role: 'superadmin' },
    { id: 'a2', email: 'manager@truckrental.com', password: 'manager123', name: 'Fleet Manager', role: 'admin' },
];

// In-memory storage (replace with database in production)
let reservations: Reservation[] = [];

// Generate demo reservations
function generateOrderNumber(): string {
    return 'TRK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createTrackingHistory(status: Reservation['status'], location: string): TrackingEvent[] {
    const now = new Date();
    const events: TrackingEvent[] = [
        {
            id: uuidv4(),
            timestamp: new Date(now.getTime() - 86400000 * 2).toISOString(),
            status: 'Reservation Created',
            location: 'Online',
            description: 'Your reservation has been received and is being processed.',
            icon: '📝',
        },
    ];

    if (status !== 'pending') {
        events.push({
            id: uuidv4(),
            timestamp: new Date(now.getTime() - 86400000).toISOString(),
            status: 'Confirmed',
            location: location,
            description: 'Your reservation is confirmed. Vehicle is reserved for your pickup date.',
            icon: '✅',
        });
    }

    if (status === 'active' || status === 'completed') {
        events.push({
            id: uuidv4(),
            timestamp: now.toISOString(),
            status: 'Vehicle Picked Up',
            location: location,
            description: 'Vehicle has been picked up. Safe travels!',
            icon: '🚚',
        });
    }

    if (status === 'completed') {
        events.push({
            id: uuidv4(),
            timestamp: new Date(now.getTime() + 86400000).toISOString(),
            status: 'Returned',
            location: location,
            description: 'Vehicle returned successfully. Thank you for choosing us!',
            icon: '🏁',
        });
    }

    return events;
}

// Seed demo data
const demoReservations: Reservation[] = [
    {
        id: uuidv4(),
        orderNumber: 'TRK-A1B2C3',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '(555) 123-4567',
        vehicleId: 'v3',
        vehicleName: 'Box Trucks',
        pickupLocation: 'New York, NY - Midtown',
        returnLocation: 'New York, NY - Midtown',
        pickupDate: '2026-05-10',
        pickupTime: '10:00 AM',
        returnDate: '2026-05-12',
        returnTime: '4:00 PM',
        status: 'confirmed',
        totalPrice: 267,
        days: 3,
        notes: 'Moving apartment - need liftgate',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date().toISOString(),
        trackingHistory: createTrackingHistory('confirmed', 'New York, NY - Midtown'),
    },
    {
        id: uuidv4(),
        orderNumber: 'TRK-X9Y8Z7',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@company.com',
        customerPhone: '(555) 987-6543',
        vehicleId: 'v7',
        vehicleName: 'Refrigerated Trucks',
        pickupLocation: 'Los Angeles, CA - Downtown',
        returnLocation: 'San Diego, CA - Mission Valley',
        pickupDate: '2026-05-08',
        pickupTime: '8:00 AM',
        returnDate: '2026-05-09',
        returnTime: '5:00 PM',
        status: 'active',
        totalPrice: 258,
        days: 2,
        notes: 'Food delivery event - temp must stay at 35°F',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date().toISOString(),
        trackingHistory: createTrackingHistory('active', 'Los Angeles, CA - Downtown'),
    },
    {
        id: uuidv4(),
        orderNumber: 'TRK-M4N5O6',
        customerName: 'Mike Construction LLC',
        customerEmail: 'dispatch@mikeconstruction.com',
        customerPhone: '(555) 456-7890',
        vehicleId: 'v5',
        vehicleName: 'Flatbed Trucks',
        pickupLocation: 'Houston, TX - Galleria',
        returnLocation: 'Houston, TX - Galleria',
        pickupDate: '2026-05-05',
        pickupTime: '7:00 AM',
        returnDate: '2026-05-07',
        returnTime: '6:00 PM',
        status: 'completed',
        totalPrice: 297,
        days: 3,
        notes: 'Hauling steel beams - need gooseneck hitch',
        createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        trackingHistory: createTrackingHistory('completed', 'Houston, TX - Galleria'),
    },
    {
        id: uuidv4(),
        orderNumber: 'TRK-P7Q8R9',
        customerName: 'Emily Rodriguez',
        customerEmail: 'emily.r@email.com',
        customerPhone: '(555) 234-5678',
        vehicleId: 'v1',
        vehicleName: 'Pickup Trucks',
        pickupLocation: 'Chicago, IL - Loop',
        returnLocation: 'Chicago, IL - Loop',
        pickupDate: '2026-05-15',
        pickupTime: '9:00 AM',
        returnDate: '2026-05-15',
        returnTime: '6:00 PM',
        status: 'pending',
        totalPrice: 49,
        days: 1,
        notes: 'Need 4WD for weekend camping trip',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingHistory: createTrackingHistory('pending', 'Chicago, IL - Loop'),
    },
];

reservations = [...demoReservations];

// ===== DATABASE OPERATIONS =====

export function getAllReservations(): Reservation[] {
    return [...reservations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getReservationByOrderNumber(orderNumber: string): Reservation | undefined {
    return reservations.find(r => r.orderNumber.toLowerCase() === orderNumber.toLowerCase());
}

export function getReservationById(id: string): Reservation | undefined {
    return reservations.find(r => r.id === id);
}

export function createReservation(data: Omit<Reservation, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'trackingHistory'>): Reservation {
    const reservation: Reservation = {
        ...data,
        id: uuidv4(),
        orderNumber: generateOrderNumber(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingHistory: createTrackingHistory(data.status, data.pickupLocation),
    };
    reservations.push(reservation);
    return reservation;
}

export function updateReservation(id: string, updates: Partial<Reservation>): Reservation | undefined {
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) return undefined;

    const updated = {
        ...reservations[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    // Add tracking event if status changed
    if (updates.status && updates.status !== reservations[index].status) {
        updated.trackingHistory = [
            ...updated.trackingHistory,
            {
                id: uuidv4(),
                timestamp: new Date().toISOString(),
                status: getStatusLabel(updates.status),
                location: updates.pickupLocation || reservations[index].pickupLocation,
                description: `Status updated to ${getStatusLabel(updates.status)}`,
                icon: getStatusIcon(updates.status),
            },
        ];
    }

    reservations[index] = updated;
    return updated;
}

export function deleteReservation(id: string): boolean {
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) return false;
    reservations.splice(index, 1);
    return true;
}

export function getAllVehicles(): Vehicle[] {
    return [...vehicles];
}

export function updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | undefined {
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) return undefined;
    vehicles[index] = { ...vehicles[index], ...updates };
    return vehicles[index];
}

export function getAllLocations(): Location[] {
    return [...locations];
}

export function getDashboardStats() {
    const total = reservations.length;
    const pending = reservations.filter(r => r.status === 'pending').length;
    const active = reservations.filter(r => r.status === 'active').length;
    const confirmed = reservations.filter(r => r.status === 'confirmed').length;
    const completed = reservations.filter(r => r.status === 'completed').length;
    const cancelled = reservations.filter(r => r.status === 'cancelled').length;
    const revenue = reservations.reduce((sum, r) => sum + (r.status !== 'cancelled' ? r.totalPrice : 0), 0);

    return {
        totalReservations: total,
        pending,
        active,
        confirmed,
        completed,
        cancelled,
        totalRevenue: revenue,
        totalVehicles: vehicles.length,
        totalLocations: locations.length,
    };
}

function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        pending: 'Pending Review',
        confirmed: 'Confirmed',
        active: 'Active Rental',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };
    return labels[status] || status;
}

function getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
        pending: '⏳',
        confirmed: '✅',
        active: '🚚',
        completed: '🏁',
        cancelled: '❌',
    };
    return icons[status] || '📋';
}
