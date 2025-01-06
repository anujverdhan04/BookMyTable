import React from "react";

export const CalendarView = () => {
  // Example static data
  const bookings = [
    { date: "2025-01-10 -", count: 2 },
    { date: "2025-01-12 -", count: 4 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar View</h2>
      <ul className="space-y-2">
        {bookings.map((booking, index) => (
          <li key={index} className="flex justify-between p-2 bg-gray-100 rounded-md">
            <span>{booking.date}</span>
            <span>{booking.count} bookings</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
