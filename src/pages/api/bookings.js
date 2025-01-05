import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  // Check if the user is authenticated
  const session = await getSession({ req });
  
  // If there is no session, respond with Unauthorized error
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Handle POST method - Create a new booking
  if (req.method === 'POST') {
    try {
      const booking = await prisma.booking.create({
        data: {
          ...req.body,  // Data for booking comes from the request body
          userId: session.user.id  // Add userId from the session to link the booking to the user
        }
      });
      return res.status(201).json(booking);  // Respond with the created booking and a 201 status
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create booking' });  // Handle errors
    }
  }

  // Handle GET method - Retrieve bookings
  if (req.method === 'GET') {
    try {
      const bookings = await prisma.booking.findMany({
        where: session.user.role === 'admin' ? {} : {
          userId: session.user.id  // If user is not admin, filter bookings by userId
        }
      });
      return res.json(bookings);  // Return the list of bookings
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch bookings' });  // Handle errors
    }
  }

  // Handle DELETE method - Delete a booking by ID
  if (req.method === 'DELETE') {
    const { id } = req.query;  // Extract booking ID from query parameters
    try {
      await prisma.booking.delete({
        where: { id }  // Delete booking based on the provided ID
      });
      return res.status(204).end();  // Respond with a 204 status (no content)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete booking' });  // Handle errors
    }
  }

  // If the method is not recognized, return a 405 Method Not Allowed
  return res.status(405).json({ error: 'Method Not Allowed' });
}
