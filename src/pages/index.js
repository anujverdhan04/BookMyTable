import { BookingForm } from '../components/BookingForm';
import { CalendarView } from '../components/CalendarView';


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurant Booking</h1>
      <CalendarView />
      <BookingForm />
    </div>
  );
}