import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllVehicles, updateVehicle } from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET': {
            const vehicles = getAllVehicles();
            return res.status(200).json({ success: true, data: vehicles });
        }

        case 'PUT': {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'ID required' });
            }
            const updated = updateVehicle(id as string, req.body);
            if (!updated) {
                return res.status(404).json({ error: 'Vehicle not found' });
            }
            return res.status(200).json({ success: true, data: updated });
        }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
