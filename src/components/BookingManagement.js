import React from "react";

export const BookingManagement = () => {
  // This component is for admin/management to view and manage bookings
  const bookings = [
    { id: 1, name: "John Doe", date: "2025-01-10", time: "18:30", guests: 2 },
    { id: 2, name: "Jane Smith", date: "2025-01-12", time: "20:00", guests: 4 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Time</th>
            <th className="py-2 px-4 text-left">Guests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{booking.name}</td>
              <td className="py-2 px-4">{booking.date}</td>
              <td className="py-2 px-4">{booking.time}</td>
              <td className="py-2 px-4">{booking.guests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
