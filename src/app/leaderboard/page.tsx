'use client';

import { useSession } from 'next-auth/react';
import { Badge, Card, Container, Table } from 'react-bootstrap';

// SAMPLE DATA for the M1 mockup (not real users). In M2 replace this array
// with the result of the getLeaderboard query.
const leaderboard = [
  { name: 'Robert K.', email: 'robert@foo.com', points: 320, studentsDriven: 18, miles: 412, rating: 4.9 },
  { name: 'Sara K.', email: 'sara@foo.com', points: 285, studentsDriven: 15, miles: 366, rating: 5.0 },
  { name: 'John Doe', email: 'john@foo.com', points: 240, studentsDriven: 12, miles: 298, rating: 4.8 },
  { name: 'Devin P.', email: 'devin@foo.com', points: 190, studentsDriven: 10, miles: 245, rating: 4.7 },
  { name: 'Mia T.', email: 'mia@foo.com', points: 145, studentsDriven: 8, miles: 180, rating: 4.6 },
  { name: 'Kai L.', email: 'kai@foo.com', points: 90, studentsDriven: 5, miles: 120, rating: 4.5 },
];

const green = '#024731';

const LeaderboardPage = () => {
  const { data: session } = useSession();
  const currentEmail = session?.user?.email;

  return (
    <main style={{ background: '#f5f8f5', minHeight: '100vh' }}>
      <Container className="py-4">
        <h1 className="fw-bold mb-2">Leaderboard</h1>
        <p className="text-muted mb-4">
          Top drivers ranked by points. Sample data for the mockup.
        </p>

        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <h4 className="fw-bold mb-3">Top Drivers</h4>
            <Table responsive hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Driver</th>
                  <th>Points</th>
                  <th>Students Driven</th>
                  <th>Miles</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((driver, index) => {
                  const isYou = driver.email === currentEmail;
                  return (
                    <tr
                      key={driver.email}
                      data-testid={isYou ? 'leaderboard-you' : undefined}
                      style={isYou ? { backgroundColor: '#e3f1e8', fontWeight: 600 } : undefined}
                    >
                      <td>{index + 1}</td>
                      <td>
                        {driver.name}
                        {isYou && (
                          <Badge className="ms-2" style={{ backgroundColor: green }}>You</Badge>
                        )}
                      </td>
                      <td style={{ color: '#bf5b20' }}>{driver.points}</td>
                      <td>{driver.studentsDriven}</td>
                      <td>{driver.miles}</td>
                      <td>⭐ {driver.rating.toFixed(1)}</td>
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
