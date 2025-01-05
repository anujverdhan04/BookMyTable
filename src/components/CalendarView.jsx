import React from "react";

export const CalendarView = () => {
  // Example static data
  const bookings = [
    { date: "2025-01-10", count: 2 },
    { date: "2025-01-12", count: 4 },
  ];

  return (
    <div>
      <h2>Calendar View</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {booking.date}: {booking.count} bookings
          </li>
        ))}
      </ul>
    </div>
  );
};
