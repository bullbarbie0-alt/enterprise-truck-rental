import type { NextApiRequest, NextApiResponse } from 'next';
import { getDashboardStats } from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const stats = getDashboardStats();
    return res.status(200).json({ success: true, data: stats });
}
