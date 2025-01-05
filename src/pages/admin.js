import { BookingManagement } from '../components/BookingManagement';
import { useSession } from 'next-auth/react';

export default function Admin() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== 'admin') {
    return <div>Access denied</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <BookingManagement />
      {session && (
        <p className="text-lg font-medium mt-4">
          Welcome, {session.user.name}!
        </p>
      )}
    </div>
  );
}
