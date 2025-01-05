import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const booking = await prisma.booking.create({
      data: {
        ...req.body,
        userId: session.user.id
      }
    });
    return res.status(201).json(booking);
  }

  if (req.method === 'GET') {
    const bookings = await prisma.booking.findMany({
      where: session.user.role === 'admin' ? {} : {
        userId: session.user.id
      }
    });
    return res.json(bookings);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await prisma.booking.delete({
      where: { id }
    });
    return res.status(204).end();
  }
}