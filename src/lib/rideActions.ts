'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { AREAS } from '@/lib/areas';
import { prisma } from '@/lib/prisma';
import { RideSchema } from '@/lib/validationSchemas';

type CreateRideInput = {
  origin: string;
  destination: string;
  departureTime: Date;
  seats: number;
  notes?: string;
  driverEmail: string;
};

export async function createRide(ride: CreateRideInput) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email || email !== ride.driverEmail) {
    throw new Error('You must be signed in as the driver to post a ride.');
  }

  // Client-side validation is not a security check. Validate again on the server.
  const validated = await RideSchema.validate(ride, { abortEarly: false, stripUnknown: true });
  const validAreaIds = new Set(AREAS.map((area) => area.id));
  if (!validAreaIds.has(validated.origin) || !validAreaIds.has(validated.destination)) {
    throw new Error('Choose a valid From and To area.');
  }

  const driver = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!driver) throw new Error('Driver account was not found.');

  const created = await prisma.ride.create({
    data: {
      driverId: driver.id,
      origin: validated.origin,
      destination: validated.destination,
      departureTime: validated.departureTime,
      seats: validated.seats,
      notes: validated.notes ?? '',
      status: 'OPEN',
    },
    select: { id: true },
  });
  revalidatePath('/drive');
  revalidatePath('/my-rides');
  return created.id;
}

/** Cancel an existing ride, but only when it belongs to the signed-in driver. */
export async function cancelRide(rideId: number, driverEmail: string) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email || email !== driverEmail) {
    throw new Error('You must be signed in as the driver to cancel this ride.');
  }
  if (!Number.isInteger(rideId) || rideId < 1) throw new Error('Invalid ride ID.');

  // The owner restriction is part of the database update, not just a UI check.
  const updated = await prisma.ride.updateMany({
    where: {
      id: rideId,
      driver: { email },
      status: { in: ['OPEN', 'FULL'] },
    },
    data: { status: 'CANCELLED' },
  });
  if (updated.count !== 1) {
    throw new Error('Ride not found, already completed/cancelled, or you are not its driver.');
  }
  revalidatePath('/drive');
  revalidatePath('/my-rides');
}
