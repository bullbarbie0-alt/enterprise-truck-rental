import type { NextApiRequest, NextApiResponse } from 'next';
import {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationByOrderNumber,
} from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET': {
            const { id, orderNumber, search } = req.query;

            if (orderNumber) {
                const reservation = getReservationByOrderNumber(orderNumber as string);
                if (!reservation) {
                    return res.status(404).json({ error: 'Reservation not found' });
                }
                return res.status(200).json({ success: true, data: reservation });
            }

            if (id) {
                const reservation = getReservationById(id as string);
                if (!reservation) {
                    return res.status(404).json({ error: 'Reservation not found' });
                }
                return res.status(200).json({ success: true, data: reservation });
            }

            let reservations = getAllReservations();

            if (search) {
                const term = (search as string).toLowerCase();
                reservations = reservations.filter(r =>
                    r.customerName.toLowerCase().includes(term) ||
                    r.orderNumber.toLowerCase().includes(term) ||
                    r.vehicleName.toLowerCase().includes(term)
                );
            }

            return res.status(200).json({ success: true, data: reservations });
        }

        case 'POST': {
            const reservation = createReservation(req.body);
            return res.status(201).json({ success: true, data: reservation });
        }

        case 'PUT': {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'ID required' });
            }
            const updated = updateReservation(id as string, req.body);
            if (!updated) {
                return res.status(404).json({ error: 'Reservation not found' });
            }
            return res.status(200).json({ success: true, data: updated });
        }

        case 'DELETE': {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'ID required' });
            }
            const deleted = deleteReservation(id as string);
            if (!deleted) {
                return res.status(404).json({ error: 'Reservation not found' });
            }
            return res.status(200).json({ success: true });
        }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
