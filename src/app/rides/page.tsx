'use client';

import Link from 'next/link';
import { type FormEvent, useMemo, useState } from 'react';
import {
  Calendar3,
  CarFrontFill,
  CheckCircleFill,
  Clock,
  GeoAltFill,
  PeopleFill,
  PersonFill,
} from 'react-bootstrap-icons';
import styles from '../page.module.css';
import { demoRides } from './demoRides';

/* Find a Ride: Samuel's search box, ride list, and map, moved here from the landing page (issue #10) */
const FindARide = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [search, setSearch] = useState({ from: '', to: '' });

  const visibleRides = useMemo(
    () =>
      demoRides.filter((ride) => {
        const matchesFrom = ride.from.toLowerCase().includes(search.from.toLowerCase());
        const matchesTo = ride.to.toLowerCase().includes(search.to.toLowerCase());
        return matchesFrom && matchesTo;
      }),
    [search],
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch({ from: from.trim(), to: to.trim() });
  };

  return (
    <main className={styles.home}>
      <section className={styles.rideContent} aria-label="Find available rides">
        <div className={styles.rideColumn}>
          <form id="find-a-ride" className={styles.searchCard} onSubmit={handleSearch}>
            <h1 className={styles.pageTitle}>Find a Ride</h1>
            <div className={styles.searchFields}>
              <label className={styles.textField}>
                <GeoAltFill aria-hidden="true" />
                <span className={styles.visuallyHidden}>Starting location</span>
                <input
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                  placeholder="From: e.g. Kapolei"
                />
              </label>
              <label className={styles.textField}>
                <GeoAltFill aria-hidden="true" />
                <span className={styles.visuallyHidden}>Destination</span>
                <input
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder="To: e.g. UH Mānoa"
                />
              </label>
              <label className={styles.selectField}>
                <Calendar3 aria-hidden="true" />
                <span className={styles.visuallyHidden}>Date</span>
                <input type="date" aria-label="Date" />
              </label>
              <label className={styles.selectField}>
                <Clock aria-hidden="true" />
                <span className={styles.visuallyHidden}>Time</span>
                <input type="time" aria-label="Time" />
              </label>
            </div>
            <button className={styles.searchButton} type="submit">Search Rides</button>
          </form>

          <section id="available-rides" className={styles.availableCard}>
            <div className={styles.ridesHeading}>
              <div>
                <h2>Available Rides</h2>
                <span className={styles.demoLabel}>Demo listings</span>
              </div>
            </div>
            {visibleRides.length ? (
              <div className={styles.rideList}>
                {visibleRides.map((ride) => (
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
            ) : (
              <p className={styles.emptyState}>No demo rides match those locations. Try another search.</p>
            )}
          </section>
        </div>

        <div className={styles.mapCard} aria-label="Map of University of Hawaiʻi at Mānoa">
          <iframe
            title="Map around University of Hawaiʻi at Mānoa"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-157.8290%2C21.2850%2C-157.7960%2C21.3130&layer=mapnik&marker=21.2990%2C-157.8170"
            loading="lazy"
          />
          <div className={styles.mapLabel}>University of<br />Hawaiʻi at Mānoa</div>
          <span className={`${styles.mapPin} ${styles.pinOne}`}><CarFrontFill aria-hidden="true" /></span>
          <span className={`${styles.mapPin} ${styles.pinTwo}`}><CarFrontFill aria-hidden="true" /></span>
          <span className={`${styles.mapPin} ${styles.pinThree}`}><CarFrontFill aria-hidden="true" /></span>
          <span className={`${styles.mapPin} ${styles.pinFour}`}><CarFrontFill aria-hidden="true" /></span>
          <div className={styles.mapControls} aria-hidden="true"><span>+</span><span>−</span></div>
        </div>
      </section>
      <div className={styles.visuallyHidden} aria-live="polite">
        Showing {visibleRides.length} demo rides
      </div>
    </main>
  );
};

export default FindARide;
