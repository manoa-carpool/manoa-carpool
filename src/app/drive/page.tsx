'use client';

import { useState, type FormEvent } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';

type SeatRequest = {
  id: number;
  name: string;
  rating: number;
  status: 'pending' | 'accepted' | 'declined';
};

type Ride = {
  id: number;
  from: string;
  to: string;
  days: string;
  time: string;
  seats: number;
  requests: SeatRequest[];
};

const initialRides: Ride[] = [
  {
    id: 1,
    from: 'Mililani',
    to: 'UH Manoa Campus',
    days: 'Mon, Wed, Fri',
    time: '07:15',
    seats: 3,
    requests: [
      { id: 1, name: 'Sara K.', rating: 5.0, status: 'pending' },
      { id: 2, name: 'Devin P.', rating: 4.7, status: 'pending' },
    ],
  },
];

const green = '#024731';

const formatTime = (time: string) => new Date(
  `2000-01-01T${time}:00`,
).toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

const DrivePage = () => {
  const [rides, setRides] = useState<Ride[]>(initialRides);
  const [from, setFrom] = useState('Mililani');
  const [to, setTo] = useState('UH Manoa Campus');
  const [days, setDays] = useState('Mon, Wed, Fri');
  const [time, setTime] = useState('07:15');
  const [seats, setSeats] = useState(3);
  const [message, setMessage] = useState('');

  const postRide = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRide: Ride = {
      id: Date.now(),
      from: from.trim(),
      to: to.trim(),
      days: days.trim(),
      time,
      seats,
      requests: [],
    };

    setRides((previous) => [newRide, ...previous]);
    setMessage('Your ride has been posted!');
  };

  const handleRequest = (
    rideId: number,
    requestId: number,
    action: 'accepted' | 'declined',
  ) => {
    setRides((previous) => previous.map((ride) => {
      if (ride.id !== rideId) return ride;

      const request = ride.requests.find(
        (item) => item.id === requestId,
      );

      if (!request || request.status !== 'pending') return ride;
      if (action === 'accepted' && ride.seats < 1) return ride;

      return {
        ...ride,
        seats: action === 'accepted' ? ride.seats - 1 : ride.seats,
        requests: ride.requests.map((item) => (
          item.id === requestId
            ? { ...item, status: action }
            : item
        )),
      };
    }));
  };

  return (
    <main style={{ background: '#f5f8f5', minHeight: '100vh' }}>
      <Container className="py-4">
        <h1 className="fw-bold mb-4">Drive</h1>

        {/* Driver profile */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4 className="fw-bold mb-3">Driver Profile</h4>
            <Row className="g-3">
              <Col md={4}>
                <h5 className="fw-bold">Robert K.</h5>
                <p className="text-muted mb-1">Verified UH Driver</p>
                <Badge bg="success">Active Driver</Badge>
              </Col>
              <Col md={4}>
                <p className="mb-1"><strong>Car:</strong> Lamborghini Revuelto</p>
                <p className="mb-1"><strong>Seats:</strong> 3</p>
                <p className="mb-1"><strong>Home Area:</strong> Ewa Beach</p>
              </Col>
              <Col md={4}>
                <p className="mb-1"><strong>Rating:</strong> ⭐ 4.9 / 5.0</p>
                <p className="mb-1"><strong>Points:</strong> 320</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          {/* Post ride form */}
          <Col lg={5}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Post a Ride</h4>

                <Form onSubmit={postRide}>
                  <Form.Group className="mb-3" controlId="rideFrom">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      required
                      value={from}
                      onChange={(event) => setFrom(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="rideTo">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                      required
                      value={to}
                      onChange={(event) => setTo(event.target.value)}
                    />
                  </Form.Group>

                  <Row>
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="rideDays">
                        <Form.Label>Days</Form.Label>
                        <Form.Control
                          required
                          placeholder="Mon, Wed, Fri"
                          value={days}
                          onChange={(event) => setDays(event.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="rideTime">
                        <Form.Label>Leaves at</Form.Label>
                        <Form.Control
                          required
                          type="time"
                          value={time}
                          onChange={(event) => setTime(event.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="rideSeats">
                    <Form.Label>Open Seats</Form.Label>
                    <Form.Select
                      value={seats}
                      onChange={(event) => setSeats(Number(event.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6].map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100"
                    style={{ backgroundColor: green, borderColor: green }}
                  >
                    Post Ride
                  </Button>
                </Form>

                {message && (
                  <p className="text-success mt-3 mb-0" role="status">
                    {message}
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Stats and posted rides */}
          <Col lg={7}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4">Your Stats</h4>
                <Row className="text-center">
                  {[
                    { value: 320, label: 'Points' },
                    { value: 18, label: 'Students Driven' },
                    { value: 412, label: 'Miles' },
                  ].map((stat) => (
                    <Col key={stat.label} xs={4}>
                      <h2 className="fw-bold" style={{ color: '#bf5b20' }}>
                        {stat.value}
                      </h2>
                      <span>{stat.label}</span>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Your Posted Rides</h4>

                {rides.length === 0 && <p>No rides posted yet.</p>}

                {rides.map((ride) => (
                  <Card key={ride.id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                          <h5 className="fw-bold">
                            {ride.from} → {ride.to}
                          </h5>
                          <p className="text-muted mb-2">
                            {ride.days} | {formatTime(ride.time)}
                          </p>
                        </div>
                        <Badge bg={ride.seats > 0 ? 'success' : 'secondary'}>
                          {ride.seats} open seats
                        </Badge>
                      </div>

                      <hr />
                      <h6 className="fw-bold">Seat Requests</h6>

                      {ride.requests.length === 0 && (
                        <p className="text-muted mb-0">
                          No seat requests yet.
                        </p>
                      )}

                      {ride.requests.map((request) => (
                        <div
                          key={request.id}
                          className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom py-2"
                        >
                          <div>
                            <strong>{request.name}</strong>
                            <div className="small text-muted">
                              ⭐ {request.rating.toFixed(1)}
                            </div>
                          </div>

                          {request.status === 'pending' ? (
                            <div className="d-flex gap-2">
                              <Button
                                size="sm"
                                variant="success"
                                disabled={ride.seats === 0}
                                onClick={() => handleRequest(
                                  ride.id, request.id, 'accepted',
                                )}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => handleRequest(
                                  ride.id, request.id, 'declined',
                                )}
                              >
                                Decline
                              </Button>
                            </div>
                          ) : (
                            <Badge bg={
                              request.status === 'accepted'
                                ? 'success'
                                : 'secondary'
                            }>
                              {request.status}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default DrivePage;
