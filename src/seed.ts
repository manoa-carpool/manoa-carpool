import { Role, RideStatus, RequestStatus } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from './lib/prisma';
import * as config from '../config/settings.development.json';

// sample data shapes in config/settings.development.json (all accounts are fake @foo.com users)
type Account = {
  email: string;
  password: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  homeArea?: string;
  carDescription?: string;
  seatsAvailable?: number;
  sameGenderOnly?: boolean;
  gender?: string;
  points?: number;
};
type SampleRide = {
  key: string;
  driver: string;
  origin: string;
  destination: string;
  daysFromNow: number;
  time: string;
  seats: number;
  notes?: string;
  status?: string;
};
type SampleRequest = {
  ride: string;
  rider: string;
  status?: string;
  driverConfirmed?: boolean;
  riderConfirmed?: boolean;
  pointsAwarded?: boolean;
};

// rides are given as "N days from today at HH:MM Hawaii time" so the sample rides never go stale
function departure(daysFromNow: number, time: string): Date {
  const day = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
  const ymd = day.toLocaleDateString('en-CA', { timeZone: 'Pacific/Honolulu' });
  return new Date(`${ymd}T${time}:00-10:00`);
}

async function seedUsers(): Promise<Map<string, number>> {
  const password = await hash('changeme', 10);
  const ids = new Map<string, number>();
  // wait for each user so the connection isn't closed while inserts are still running
  for (const account of config.defaultAccounts as Account[]) {
    const role = (account.role as Role) || Role.USER;
    const profile = {
      firstName: account.firstName ?? '',
      lastName: account.lastName ?? '',
      homeArea: account.homeArea ?? null,
      carDescription: account.carDescription ?? null,
      seatsAvailable: account.seatsAvailable ?? 0,
      sameGenderOnly: account.sameGenderOnly ?? false,
      gender: account.gender ?? null,
      points: account.points ?? 0,
    };
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    const user = await prisma.user.upsert({
      where: { email: account.email },
      // existing sample users (like admin@foo.com from the template) get the profile too; passwords are left alone
      update: profile,
      create: { email: account.email, password, role, ...profile },
    });
    ids.set(account.email, user.id);
  }
  return ids;
}

async function seedRides(userIds: Map<string, number>): Promise<Map<string, number>> {
  const rideIds = new Map<string, number>();
  // rides have no natural unique key, so only add the samples to an empty table (seeding twice is safe)
  if (await prisma.ride.count() > 0) {
    console.log('  Rides already exist, skipping sample rides and requests');
    return rideIds;
  }
  for (const r of config.defaultRides as SampleRide[]) {
    const driverId = userIds.get(r.driver);
    if (driverId === undefined) throw new Error(`Sample ride ${r.key}: no user ${r.driver}`);
    console.log(`  Creating ride: ${r.key} (${r.origin} -> ${r.destination})`);
    const ride = await prisma.ride.create({
      data: {
        driverId,
        origin: r.origin,
        destination: r.destination,
        departureTime: departure(r.daysFromNow, r.time),
        seats: r.seats,
        notes: r.notes ?? '',
        status: (r.status as RideStatus) || RideStatus.OPEN,
      },
    });
    rideIds.set(r.key, ride.id);
  }
  return rideIds;
}

async function seedRequests(userIds: Map<string, number>, rideIds: Map<string, number>) {
  if (rideIds.size === 0) return;
  for (const q of config.defaultRequests as SampleRequest[]) {
    const rideId = rideIds.get(q.ride);
    const riderId = userIds.get(q.rider);
    if (rideId === undefined || riderId === undefined) throw new Error(`Sample request ${q.ride}/${q.rider}: unknown ride or rider`);
    console.log(`  Creating request: ${q.rider} on ${q.ride} (${q.status ?? 'PENDING'})`);
    await prisma.rideRequest.create({
      data: {
        rideId,
        riderId,
        status: (q.status as RequestStatus) || RequestStatus.PENDING,
        driverConfirmed: q.driverConfirmed ?? false,
        riderConfirmed: q.riderConfirmed ?? false,
        pointsAwarded: q.pointsAwarded ?? false,
      },
    });
  }
}

async function main() {
  console.log('Seeding the database');
  const userIds = await seedUsers();
  const rideIds = await seedRides(userIds);
  await seedRequests(userIds, rideIds);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
