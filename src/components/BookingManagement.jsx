import React from "react";

export const BookingManagement = () => {
  // This component is for admin/management to view and manage bookings
  const bookings = [
    { id: 1, name: "John Doe", date: "2025-01-10", time: "18:30", guests: 2 },
    { id: 2, name: "Jane Smith", date: "2025-01-12", time: "20:00", guests: 4 },
  ];

  return (
    <div>
      <h2>Booking Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.guests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
