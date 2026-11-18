'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ArrowLeft, CarFrontFill, Clock, GeoAltFill, PeopleFill, StarFill } from 'react-bootstrap-icons';

const RideRouteMap = dynamic(() => import('@/components/RideRouteMap'), {
  ssr: false,
  loading: () => <div className="p-4 text-muted">Loading route map...</div>,
});

const green = '#07583b';

// Demo ride for issue #100. Coordinates are [latitude, longitude].
const ride = {
  driver: 'Robert K.',
  car: 'Lamborghini Revuelto',
  rating: 4.9,
  from: 'Mililani Town Center',
  to: 'UH Mānoa Campus',
  pickup: [21.4537, -158.0057] as [number, number],
  destination: [21.2969, -157.8171] as [number, number],
  departure: '7:15 AM',
  days: 'Monday, Wednesday, Friday',
  seats: 3,
  notes: 'Please arrive 5 minutes early. Pickup near the main entrance. Small bags are welcome.',
};

export default function RideDetailPage() {
  return (
    <main className="flex-grow-1" style={{ backgroundColor: '#f7f8f7' }}>
      <Container className="py-4 py-md-5">
        <Link href="/find-a-ride" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3" style={{ color: green }}>
          <ArrowLeft aria-hidden="true" /> Back to rides
        </Link>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
          <h1 className="fw-bold mb-0" style={{ color: green }}>Ride Details</h1>
          <Badge bg="success" className="fs-6">{ride.seats} seats available</Badge>
        </div>
        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h2 className="h4 fw-bold mb-4" style={{ color: green }}>Trip Information</h2>
                <Row className="g-3">
                  <Col sm={6}>
                    <div className="text-muted small mb-1"><GeoAltFill aria-hidden="true" /> From</div>
                    <h3 className="h5 fw-semibold">{ride.from}</h3>
                  </Col>
                  <Col sm={6}>
                    <div className="text-muted small mb-1"><GeoAltFill aria-hidden="true" /> To</div>
                    <h3 className="h5 fw-semibold">{ride.to}</h3>
                  </Col>
                  <Col sm={6}>
                    <div className="text-muted small mb-1"><Clock aria-hidden="true" /> Departure</div>
                    <p className="mb-0 fw-semibold">{ride.departure}</p>
                    <p className="text-muted small mb-0">{ride.days}</p>
                  </Col>
                  <Col sm={6}>
                    <div className="text-muted small mb-1"><PeopleFill aria-hidden="true" /> Seats left</div>
                    <p className="mb-0 fw-semibold">{ride.seats}</p>
                  </Col>
                </Row>
                <hr />
                <h3 className="h6 fw-bold">Driver Notes</h3>
                <p className="mb-0">{ride.notes}</p>
              </Card.Body>
            </Card>
            <Card className="border-0 shadow-sm overflow-hidden">
              <Card.Body className="p-4 pb-2">
                <h2 className="h4 fw-bold mb-1" style={{ color: green }}>Route Map</h2>
                <p className="text-muted small mb-0">Demo driving route from pickup to campus</p>
              </Card.Body>
              <RideRouteMap pickup={ride.pickup} destination={ride.destination} from={ride.from} to={ride.to} />
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="h4 fw-bold mb-3" style={{ color: green }}>Your Driver</h2>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ background: '#dceee3', color: green, width: 56, height: 56 }}>
                    <CarFrontFill size={28} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="h5 fw-bold mb-1">{ride.driver}</h3>
                    <div><StarFill color="#e5ac21" aria-hidden="true" /> {ride.rating} / 5.0</div>
                  </div>
                </div>
                <p className="mb-2"><strong>Car:</strong> {ride.car}</p>
                <Badge bg="success" className="mb-4">Verified UH driver (sample)</Badge>
                <Button className="w-100 fw-bold rounded-pill" style={{ backgroundColor: green, borderColor: green }} disabled>
                  Request Seat
                </Button>
                <p className="text-muted small text-center mt-2 mb-0">Seat requests are not available in this demo yet.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
