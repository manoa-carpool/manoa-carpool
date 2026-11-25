'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CarFrontFill,
  CheckCircleFill,
  GeoAltFill,
  LeafFill,
  PeopleFill,
  PersonFill,
} from 'react-bootstrap-icons';
import styles from './page.module.css';
import { demoRides } from './rides/demoRides';

const HomeActivityMap = dynamic(() => import('@/components/HomeActivityMap'), {
  ssr: false,
  loading: () => <div role="status">Loading demo activity map...</div>,
});

/* the landing page shows the next few rides with open seats; searching is on the Find a Ride page (/rides) */
const soonRides = demoRides.slice(0, 3);

const Home = () => (
  <main className={styles.home}>
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroContent}>
        <h1 id="hero-title">
          <Image className={styles.heroLogo} src="/logo.svg" alt="" width={72} height={72} priority />
          Manoa Carpool
        </h1>
        <p>
          Share rides. Build community.
          <br />
          Get around UH Mānoa together.
        </p>
        <Link className={styles.heroButton} href="/rides">
          Find a Ride <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.universityMark} aria-label="University of Hawaiʻi at Mānoa">
        <span className={styles.universityH}>H</span>
        <span>UNIVERSITY OF</span>
        <span>HAWAIʻI</span>
        <span>MĀNOA</span>
      </div>
    </section>

    <section className={styles.benefits} aria-label="Benefits of sharing rides">
      <div className={styles.benefit}>
        <CarFrontFill aria-hidden="true" />
        <div><strong>Save Money</strong><span>Split the cost</span></div>
      </div>
      <div className={styles.benefit}>
        <LeafFill aria-hidden="true" />
        <div><strong>Go Green</strong><span>Reduce your carbon footprint</span></div>
      </div>
      <div className={styles.benefit}>
        <PeopleFill aria-hidden="true" />
        <div><strong>Meet Fellow ʻOhana</strong><span>Ride with other UH students</span></div>
      </div>
      <div className={styles.benefit}>
        <GeoAltFill aria-hidden="true" />
        <div><strong>Easy &amp; Convenient</strong><span>Find rides near you</span></div>
      </div>
    </section>

    <section className={styles.soonContent} aria-label="Rides leaving soon">
      <div className={styles.availableCard}>
        <div className={styles.ridesHeading}>
          <div>
            <h2>Rides Leaving Soon</h2>
            <span className={styles.demoLabel}>Demo listings</span>
          </div>
          <Link href="/rides">See all rides <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className={styles.rideList}>
          {soonRides.map((ride) => (
            <article className={styles.ride} key={`${ride.driver}-${ride.time}`}>
              <div className={styles.avatar}><PersonFill aria-hidden="true" /></div>
              <div className={styles.driverInfo}>
                <strong>
                  {ride.driver}
                  {ride.verified && <CheckCircleFill className={styles.verified} aria-label="Verified driver" />}
                </strong>
                <span>{ride.from} <span aria-hidden="true">→</span> {ride.to}</span>
              </div>
              <span className={styles.rideTime}>{ride.day}, {ride.time}</span>
              <span className={styles.seats}><PeopleFill aria-hidden="true" /> {ride.seats} {ride.seats === 1 ? 'seat' : 'seats'} open</span>
              <Link className={styles.requestButton} href="/auth/signin">Request Ride</Link>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.soonContent} aria-labelledby="activity-title">
      <div className={styles.availableCard}>
        <div className={styles.ridesHeading}>
          <div>
            <h2 id="activity-title">Ride Activity Across Oʻahu</h2>
            <span className={styles.demoLabel}>Demo activity</span>
          </div>
        </div>
        <HomeActivityMap />
      </div>
    </section>
  </main>
);

export default Home;
