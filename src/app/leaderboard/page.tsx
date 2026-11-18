'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Badge, Button, Card, Container, Form, Table } from 'react-bootstrap';

type Period = 'fall-2026' | 'spring-2026' | 'all-time';
type SortKey = 'points' | 'miles' | 'studentsDriven' | 'rating';
type Stats = Record<SortKey, number>;

// SAMPLE DATA for the M1 mockup (not real users). In M2 replace this array
// with the result of the getLeaderboard(period) query. Each driver has one
// set of stats per period.
const leaderboard: { name: string; email: string; stats: Record<Period, Stats> }[] = [
  {
    name: 'Robert K.',
    email: 'robert@foo.com',
    stats: {
      'fall-2026': { points: 320, studentsDriven: 18, miles: 412, rating: 4.9 },
      'spring-2026': { points: 410, studentsDriven: 24, miles: 530, rating: 4.9 },
      'all-time': { points: 730, studentsDriven: 42, miles: 942, rating: 4.9 },
    },
  },
  {
    name: 'Sara K.',
    email: 'sara@foo.com',
    stats: {
      'fall-2026': { points: 285, studentsDriven: 15, miles: 366, rating: 5.0 },
      'spring-2026': { points: 300, studentsDriven: 17, miles: 390, rating: 4.9 },
      'all-time': { points: 585, studentsDriven: 32, miles: 756, rating: 4.95 },
    },
  },
  {
    name: 'John Doe',
    email: 'john@foo.com',
    stats: {
      'fall-2026': { points: 240, studentsDriven: 12, miles: 298, rating: 4.8 },
      'spring-2026': { points: 120, studentsDriven: 7, miles: 150, rating: 4.7 },
      'all-time': { points: 360, studentsDriven: 19, miles: 448, rating: 4.75 },
    },
  },
  {
    name: 'Devin P.',
    email: 'devin@foo.com',
    stats: {
      'fall-2026': { points: 190, studentsDriven: 10, miles: 245, rating: 4.7 },
      'spring-2026': { points: 350, studentsDriven: 20, miles: 610, rating: 4.6 },
      'all-time': { points: 540, studentsDriven: 30, miles: 855, rating: 4.65 },
    },
  },
  {
    name: 'Mia T.',
    email: 'mia@foo.com',
    stats: {
      'fall-2026': { points: 145, studentsDriven: 8, miles: 180, rating: 4.6 },
      'spring-2026': { points: 220, studentsDriven: 13, miles: 270, rating: 4.8 },
      'all-time': { points: 365, studentsDriven: 21, miles: 450, rating: 4.7 },
    },
  },
  {
    name: 'Kai L.',
    email: 'kai@foo.com',
    stats: {
      'fall-2026': { points: 90, studentsDriven: 5, miles: 120, rating: 4.5 },
      'spring-2026': { points: 60, studentsDriven: 3, miles: 70, rating: 4.4 },
      'all-time': { points: 150, studentsDriven: 8, miles: 190, rating: 4.45 },
    },
  },
];

const periods: { value: Period; label: string }[] = [
  { value: 'fall-2026', label: 'Fall 2026' },
  { value: 'spring-2026', label: 'Spring 2026' },
  { value: 'all-time', label: 'All time' },
];

const sorts: { key: SortKey; label: string; heading: string }[] = [
  { key: 'points', label: 'Points', heading: 'points' },
  { key: 'miles', label: 'Miles', heading: 'miles' },
  { key: 'studentsDriven', label: 'Students driven', heading: 'students driven' },
  { key: 'rating', label: 'Rating', heading: 'rating' },
];

const green = '#024731';
const orange = '#a84c17';
const ringColors = { 1: '#e0a82e', 2: '#a8afb5', 3: '#b9824f' };

// Podium intro: blocks rise 3rd, 2nd, 1st; then the avatar and name fade in.
// Plays once on page load. Skip it with the button, or it ends by itself;
// either way animating becomes false, which removes the animation classes.
const podiumCss = `
@keyframes podium-rise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes podium-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.podium-anim .podium-block { transform-origin: bottom; animation: podium-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.podium-anim .podium-fade { animation: podium-fade 400ms ease-out backwards; }
@media (prefers-reduced-motion: reduce) {
  .podium-anim .podium-block, .podium-anim .podium-fade { animation: none; }
}
`;

const initials = (name: string) => name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2);

const formatValue = (key: SortKey, value: number) => {
  if (key === 'rating') return `⭐ ${value.toFixed(2)}`;
  if (key === 'points') return `${value} pts`;
  if (key === 'miles') return `${value} mi`;
  return `${value} students`;
};

// podium order: 2nd, 1st, 3rd (left to right) with block height, color and animation delay
const podiumSlots = [
  { place: 2, height: 110, background: '#7fae96', numeral: '#ffffff', delay: 250 },
  { place: 1, height: 160, background: green, numeral: '#ffffff', delay: 500 },
  { place: 3, height: 80, background: '#cfe3d6', numeral: green, delay: 0 },
] as const;

const LeaderboardPage = () => {
  const { data: session } = useSession();
  const currentEmail = session?.user?.email;
  const [period, setPeriod] = useState<Period>('fall-2026');
  const [sortKey, setSortKey] = useState<SortKey>('points');
  const [animating, setAnimating] = useState(true);

  // ties are broken by points, then name; tied drivers share a rank ("T-2")
  const sorted = leaderboard
    .map((driver) => ({ ...driver, ...driver.stats[period] }))
    .sort((a, b) => b[sortKey] - a[sortKey]
      || b.points - a.points
      || a.name.localeCompare(b.name));
  const ranked = sorted.map((driver) => {
    const firstIndex = sorted.findIndex((other) => other[sortKey] === driver[sortKey]);
    const tied = sorted.filter((other) => other[sortKey] === driver[sortKey]).length > 1;
    return { ...driver, rank: firstIndex + 1, tied };
  });

  const podium = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const sortInfo = sorts.find((item) => item.key === sortKey) ?? sorts[0];
  const periodLabel = periods.find((item) => item.value === period)?.label ?? '';
  const activeCell = (key: SortKey) => (key === sortKey ? { backgroundColor: '#eef6f0', fontWeight: 600 } : undefined);

  return (
    <main style={{ background: '#f5f8f5', minHeight: '100vh' }}>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-3">
          <div>
            <h1 className="fw-bold mb-1">Leaderboard</h1>
            <p className="text-muted mb-0" aria-live="polite">
              Top drivers by {sortInfo.heading}, {periodLabel}. Sample data for the mockup.
            </p>
          </div>
          <Form.Group controlId="leaderboardPeriod">
            <Form.Label className="small text-muted mb-1">Period</Form.Label>
            <Form.Select
              value={period}
              onChange={(event) => setPeriod(event.target.value as Period)}
            >
              {periods.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2 mb-4" role="group" aria-label="Sort drivers by">
          <span className="small text-muted me-1">Sort by</span>
          {sorts.map((item) => (
            <Button
              key={item.key}
              size="sm"
              variant={sortKey === item.key ? 'success' : 'outline-secondary'}
              style={sortKey === item.key ? { backgroundColor: green, borderColor: green } : undefined}
              aria-pressed={sortKey === item.key}
              onClick={() => setSortKey(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Podium */}
        <Card className="shadow-sm mb-4" style={{ background: 'linear-gradient(#eef6f0, #ffffff)' }}>
          <Card.Body className="px-3 pt-4 pb-0">
            <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
              <h2 className="h5 fw-bold mb-0">Top by {sortInfo.heading}</h2>
              {animating && (
                <Button size="sm" variant="link" className="p-0" onClick={() => setAnimating(false)}>
                  Skip animation
                </Button>
              )}
            </div>
            <style>{podiumCss}</style>
            <ol
              aria-label="Top three drivers"
              className={`list-unstyled d-flex align-items-end justify-content-center gap-2 gap-md-3 mb-0${animating ? ' podium-anim' : ''}`}
              data-testid="podium"
            >
              {podiumSlots.map((slot) => {
                const driver = podium[slot.place - 1];
                if (!driver) return null;
                const isYou = driver.email === currentEmail;
                const size = slot.place === 1 ? 72 : 56;
                return (
                  <li
                    key={slot.place}
                    className="d-flex flex-column align-items-center"
                    style={{ flex: '1 1 0', minWidth: 0, maxWidth: 170 }}
                  >
                    <div
                      className="podium-fade d-flex flex-column align-items-center"
                      style={{ animationDelay: `${slot.delay + 600}ms` }}
                      onAnimationEnd={slot.place === 1 ? () => setAnimating(false) : undefined}
                    >
                      <div
                        aria-hidden="true"
                        className="d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          width: size,
                          height: size,
                          borderRadius: '50%',
                          background: '#dcebe1',
                          color: green,
                          border: `3px solid ${ringColors[slot.place]}`,
                          outline: isYou ? `2px solid ${green}` : undefined,
                          outlineOffset: 2,
                        }}
                      >
                        {initials(driver.name)}
                      </div>
                      <div className="fw-semibold mt-2 text-center">
                        <span className="visually-hidden">
                          {driver.tied ? `Tied rank ${driver.rank}` : `Rank ${driver.rank}`}
                          ,{' '}
                        </span>
                        {driver.name}
                        {isYou && <Badge className="ms-1" style={{ backgroundColor: green }}>You</Badge>}
                      </div>
                      <div className="fw-bold fs-5 mb-2" style={{ color: orange }}>
                        {formatValue(sortKey, driver[sortKey])}
                      </div>
                    </div>
                    <div className="w-100 position-relative" style={{ height: slot.height }} aria-hidden="true">
                      <div
                        className="podium-block position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background: slot.background,
                          borderRadius: '10px 10px 0 0',
                          animationDelay: `${slot.delay}ms`,
                        }}
                      />
                      <div
                        className="podium-fade position-relative text-center fw-bold fs-3 pt-2"
                        style={{ color: slot.numeral, animationDelay: `${slot.delay + 350}ms` }}
                      >
                        {driver.tied ? `T-${driver.rank}` : driver.rank}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card.Body>
        </Card>

        {/* Rest of the drivers */}
        <h2 className="h5 fw-bold mb-3">Rankings</h2>
        <Card className="shadow-sm">
          <Card.Body className="p-2 p-md-4">
            <Table responsive hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Driver</th>
                  <th style={activeCell('points')} aria-sort={sortKey === 'points' ? 'descending' : undefined}>Points</th>
                  <th style={activeCell('studentsDriven')} aria-sort={sortKey === 'studentsDriven' ? 'descending' : undefined}>Students Driven</th>
                  <th style={activeCell('miles')} aria-sort={sortKey === 'miles' ? 'descending' : undefined}>Miles</th>
                  <th style={activeCell('rating')} aria-sort={sortKey === 'rating' ? 'descending' : undefined}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((driver) => {
                  const isYou = driver.email === currentEmail;
                  return (
                    <tr
                      key={driver.email}
                      data-testid={isYou ? 'leaderboard-you' : undefined}
                      style={isYou ? { fontWeight: 600 } : undefined}
                    >
                      <td style={isYou ? { backgroundColor: '#cfe3d6' } : undefined}>
                        {driver.tied ? `T-${driver.rank}` : driver.rank}
                      </td>
                      <td style={isYou ? { backgroundColor: '#cfe3d6' } : undefined}>
                        {driver.name}
                        {isYou && (
                          <Badge className="ms-2" style={{ backgroundColor: green }}>You</Badge>
                        )}
                      </td>
                      {(['points', 'studentsDriven', 'miles', 'rating'] as SortKey[]).map((key) => (
                        <td
                          key={key}
                          style={{
                            ...(isYou ? { backgroundColor: '#cfe3d6' } : activeCell(key)),
                            color: key === sortKey ? orange : undefined,
                          }}
                        >
                          {key === 'rating' ? `⭐ ${driver.rating.toFixed(2)}` : driver[key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default LeaderboardPage;
