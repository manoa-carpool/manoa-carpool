import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getArea } from '@/lib/areas';
import { prisma } from '@/lib/prisma';
import DriveClient from './DriveClient';

/** Server-rendered driver dashboard. The form itself lives in the client component. */
const DrivePage = async () => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect('/auth/signin');

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      firstName: true,
      lastName: true,
      homeArea: true,
      carDescription: true,
      seatsAvailable: true,
      points: true,
      ridesDriven: {
        orderBy: { departureTime: 'desc' },
        select: {
          id: true,
          origin: true,
          destination: true,
          departureTime: true,
          seats: true,
          notes: true,
          status: true,
          requests: { select: { id: true, status: true } },
        },
      },
    },
  });
  if (!user) redirect('/auth/signin');

  return (
    <DriveClient
      driverEmail={email}
      profile={{
        name: [user.firstName, user.lastName].filter(Boolean).join(' ') || email,
        homeArea: getArea(user.homeArea ?? '')?.name ?? 'Not set',
        car: user.carDescription || 'Not set',
        seats: user.seatsAvailable,
        points: user.points,
      }}
      rides={user.ridesDriven.map((ride) => ({
        id: ride.id,
        from: getArea(ride.origin)?.name ?? ride.origin,
        to: getArea(ride.destination)?.name ?? ride.destination,
        departureTime: ride.departureTime.toISOString(),
        seats: ride.seats,
        notes: ride.notes,
        status: ride.status,
        requestCount: ride.requests.length,
        acceptedCount: ride.requests.filter((request) => request.status === 'ACCEPTED').length,
      }))}
    />
  );
};

export default DrivePage;
