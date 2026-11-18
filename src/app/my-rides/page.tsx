import type { ReactNode } from 'react';
import Link from 'next/link';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { ArrowRight, CarFrontFill, HouseDoor, PersonFill, StarFill } from 'react-bootstrap-icons';
import { formatRideDate } from './formatRideDate';
import styles from './my-rides.module.css';

// M1 mockup: hardcoded sample data. Not real users. Issue #124 replaces this with database queries.
const profile = {
  initials: 'AM',
  name: 'Aaron M.',
  email: 'aaron@hawaii.edu',
  homeArea: 'Mililani',
  car: 'Silver Mazda 3',
  seats: 3,
  rating: 4.9,
  points: 320,
};

type Status = 'Confirmed' | 'Requested';
type Role = 'Driver' | 'Rider';

type Ride = { id: number; role: Role; start: Date; route: string; detail: string };

/** Sample start time: `days` from today at the given Hawaii time, so the demo always shows Today/Tomorrow/dates correctly. */
const sampleStart = (days: number, hour: number, minute = 0): Date => {
  const base = new Date();
  base.setUTCDate(base.getUTCDate() + days);
  const day = base.toLocaleDateString('en-CA', { timeZone: 'Pacific/Honolulu' });
  return new Date(`${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00-10:00`);
};

const upcomingRides: (Ride & { status: Status })[] = [
  { id: 1, role: 'Driver', start: sampleStart(1, 7, 15), route: 'Mililani → UH Mānoa', detail: '2 riders', status: 'Confirmed' },
  { id: 2, role: 'Rider', start: sampleStart(6, 10), route: 'UH dorms → Safeway Kapahulu', detail: 'With Malia N.', status: 'Requested' },
];

const pastRides: Ride[] = [
  { id: 3, role: 'Rider', start: sampleStart(-1, 16, 30), route: 'UH Mānoa → Mililani', detail: 'With Kai L.' },
  { id: 4, role: 'Driver', start: sampleStart(-12, 8), route: 'Mililani → UH Mānoa', detail: 'Gave Noah S. a ride' },
  { id: 5, role: 'Rider', start: new Date('2025-12-20T09:00:00-10:00'), route: 'UH Mānoa → Kaneohe', detail: 'With Leilani P.' },
];

const statusClass: Record<Status, string> = {
  Confirmed: styles.statusConfirmed,
  Requested: styles.statusRequested,
};

/** One ride row: role icon and tag, ride info with the Details link under it, and a status or action on the right. */
const RideRow = ({ ride, action }: { ride: Ride; action: ReactNode }) => {
  const roleClass = ride.role === 'Driver' ? styles.driver : styles.rider;
  const when = formatRideDate(ride.start);
  return (
    <div className={styles.rideRow}>
      <div className={styles.rideBody}>
        <div className={`${styles.roleIcon} ${roleClass}`} aria-hidden="true">
          {ride.role === 'Driver' ? <CarFrontFill size={22} /> : <PersonFill size={22} />}
        </div>
        <div className={styles.rideText}>
          <div className={styles.title}>
            <span className={`${styles.roleTag} ${roleClass}`}>{ride.role}</span>
            <strong>{when}</strong> {ride.route}
          </div>
          <div className={styles.detail}>{ride.detail}</div>
          {/* /rides/[id] is the Ride Details page from issue #100; it 404s until that is merged. */}
          <Link
            href={`/rides/${ride.id}`}
            className={styles.detailsLink}
            aria-label={`Details for ${ride.route}, ${when}`}
          >
            Details <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={styles.actions}>{action}</div>
    </div>
  );
};

/** My Rides page mockup: profile card plus upcoming and past rides. */
const MyRidesPage = () => (
  <main className={styles.page}>
    <Container id="my-rides-page">
      <Row className="g-3">
        <Col md={4}>
          <div className={`${styles.card} text-center`}>
            <div className={styles.avatar} aria-hidden="true">{profile.initials}</div>
            <h2 className="h4 mb-1">{profile.name}</h2>
            <p className={`${styles.detail} mb-3`}>{profile.email} · Verified UH</p>
            <hr />
            <p className="mb-2"><HouseDoor aria-hidden="true" /> Home area: {profile.homeArea}</p>
            <p className="mb-2"><CarFrontFill aria-hidden="true" /> {profile.car} · {profile.seats} seats</p>
            <p className="mb-2"><StarFill className="text-warning" aria-hidden="true" /> {profile.rating} rating</p>
            <Badge bg="none" className={styles.points}>{profile.points} points</Badge>
            <Button variant="outline-secondary" className="w-100 mt-3">Edit profile</Button>
          </div>
        </Col>
        <Col md={8}>
          <div className={`${styles.card} mb-3`}>
            <h2 className="h4 mb-3">Upcoming rides</h2>
            {upcomingRides.map((ride) => (
              <RideRow
                key={ride.id}
                ride={ride}
                action={(
                  <Badge bg="none" pill={false} className={`${styles.statusBadge} ${statusClass[ride.status]}`}>
                    {ride.status}
                  </Badge>
                )}
              />
            ))}
          </div>
          <div className={styles.card}>
            <h2 className="h4 mb-3">Past rides</h2>
            {pastRides.map((ride) => (
              <RideRow
                key={ride.id}
                ride={ride}
                action={<Button className={styles.rateButton}>{ride.role === 'Rider' ? 'Rate driver' : 'Rate rider'}</Button>}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default MyRidesPage;
