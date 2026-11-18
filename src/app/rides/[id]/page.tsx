'use client';

import Link from 'next/link';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import {
  ArrowLeft,
  ArrowRight,
  Calendar3,
  CarFrontFill,
  Clock,
  GeoAltFill,
  Map,
  PeopleFill,
  PersonCircle,
  StarFill,
} from 'react-bootstrap-icons';

const green = '#07543a';
const mint = '#38a56a';
const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const pickupAddress = 'Mililani Town Center, Mililani, HI';
const destinationAddress = 'University of Hawaii at Manoa, Honolulu, HI';
const embedUrl = googleMapsKey
  ? `https://www.google.com/maps/embed/v1/directions?key=${encodeURIComponent(googleMapsKey)}&origin=${encodeURIComponent(pickupAddress)}&destination=${encodeURIComponent(destinationAddress)}&mode=driving`
  : null;

const sampleRide = {
  driver: {
    name: 'Robert K.',
    car: 'Lamborghini Revuelto',
    rating: 4.9,
    verified: true,
  },
  from: 'Mililani Town Center',
  to: 'UH Mānoa Campus',
  days: 'Monday, Wednesday, Friday',
  departureTime: '7:15 AM',
  seatsLeft: 3,
  notes: 'Meet near the Mililani Town Center entrance. Please arrive five minutes early and bring your UH ID.',
};

const directionsUrl = 'https://www.google.com/maps/dir/?api=1&origin=Mililani+Town+Center%2C+Mililani%2C+HI&destination=University+of+Hawaii+at+Manoa%2C+Honolulu%2C+HI&travelmode=driving';

export default function RideDetailPage() {
  const ride = sampleRide;

  return (
    <main className="flex-grow-1" style={{ backgroundColor: '#f5f8f5' }}>
      <Container className="py-4 py-md-5" style={{ maxWidth: 1120 }}>
        <Link href="/#available-rides" className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none" style={{ color: green }}>
          <ArrowLeft aria-hidden="true" /> Back to Available Rides
        </Link>

        <div className="mb-4">
          <Badge className="mb-2" style={{ backgroundColor: green }}>Sample Ride</Badge>
          <h1 className="fw-bold mb-1" style={{ color: green }}>Ride Details</h1>
          <p className="text-muted mb-0">See the trip, pickup location, and driver before requesting a seat.</p>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4 overflow-hidden">
              <Card.Body className="p-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                  <h2 className="h4 fw-bold mb-0" style={{ color: green }}>Route Map</h2>
                  <Badge pill style={{ color: green, backgroundColor: '#e3f4e9' }}>Mililani to Mānoa</Badge>
                </div>
                <div className="rounded-3 overflow-hidden border position-relative" style={{ height: 340, backgroundColor: '#e6eee9' }}>
                  {embedUrl ? (
                    <iframe
                      title="Google Maps driving route from Mililani Town Center to UH Mānoa"
                      src={embedUrl}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ border: 0, width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                      <Map size={40} color={green} aria-hidden="true" />
                      <strong className="mt-3" style={{ color: green }}>Google Maps route preview</strong>
                      <p className="small text-muted mt-2 mb-3">
                        Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to display the driving route here.
                      </p>
                      <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success rounded-pill">
                        Open route in Google Maps <ArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 px-1" aria-label="Trip stops from Mililani Town Center to UH Mānoa Campus">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex flex-column align-items-center align-self-stretch" aria-hidden="true" style={{ width: 25 }}>
                      <span className="rounded-circle border border-3 border-success bg-white" style={{ width: 18, height: 18 }} />
                      <span style={{ flex: 1, minHeight: 52, borderLeft: `3px dashed ${mint}` }} />
                      <GeoAltFill color={green} size={23} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="pb-4">
                        <div className="small text-muted">Pickup</div>
                        <strong>{ride.from}</strong>
                      </div>
                      <div>
                        <div className="small text-muted">Drop-off</div>
                        <strong>{ride.to}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3 pt-3 border-top">
                    <span className="small text-muted">Trip stop order shown below. The map above shows driving directions when configured.</span>
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="fw-semibold text-decoration-none" style={{ color: green }}>
                      View driving directions <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h2 className="h4 fw-bold mb-4" style={{ color: green }}>Trip Information</h2>
                <Row className="g-4">
                  <Col sm={6}>
                    <div className="d-flex align-items-start gap-3">
                      <Calendar3 className="mt-1 flex-shrink-0" style={{ color: green }} aria-hidden="true" />
                      <div><div className="text-muted small">Ride Days</div><div className="fw-semibold">{ride.days}</div></div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-start gap-3">
                      <Clock className="mt-1 flex-shrink-0" style={{ color: green }} aria-hidden="true" />
                      <div><div className="text-muted small">Departure Time</div><div className="fw-semibold">{ride.departureTime}</div></div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-start gap-3">
                      <PeopleFill className="mt-1 flex-shrink-0" style={{ color: green }} aria-hidden="true" />
                      <div><div className="text-muted small">Seats Left</div><div className="fw-semibold">{ride.seatsLeft} available</div></div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="h4 fw-bold mb-3" style={{ color: green }}>Driver Notes</h2>
                <p className="mb-0">{ride.notes}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="h4 fw-bold mb-3" style={{ color: green }}>Your Driver</h2>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <PersonCircle size={48} color={green} aria-hidden="true" />
                  <div>
                    <div className="fw-bold">{ride.driver.name}</div>
                    {ride.driver.verified && <Badge bg="success">Verified UH Driver</Badge>}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <CarFrontFill style={{ color: green }} aria-hidden="true" />
                  <span>{ride.driver.car}</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <StarFill className="text-warning" aria-hidden="true" />
                  <span><strong>{ride.driver.rating.toFixed(1)}</strong> / 5.0 rating</span>
                </div>
                <Button
                  type="button"
                  className="w-100 rounded-pill fw-semibold"
                  style={{ backgroundColor: green, borderColor: green }}
                  aria-describedby="request-note"
                  disabled
                >
                  Request Seat
                </Button>
                <p id="request-note" className="small text-muted text-center mt-2 mb-0">
                  Demo only. Seat requests are not available yet.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
