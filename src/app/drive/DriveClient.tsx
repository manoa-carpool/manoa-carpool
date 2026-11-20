'use client';

import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AREAS } from '@/lib/areas';
import { cancelRide, createRide } from '@/lib/rideActions';
import { RideSchema, type RideFormValues } from '@/lib/validationSchemas';

type PostedRide = {
  id: number;
  from: string;
  to: string;
  departureTime: string;
  seats: number;
  notes: string;
  status: string;
  requestCount: number;
  acceptedCount: number;
};

type DriveClientProps = {
  driverEmail: string;
  profile: { name: string; homeArea: string; car: string; seats: number; points: number };
  rides: PostedRide[];
};

const green = '#024731';

const DriveClient = ({ driverEmail, profile, rides }: DriveClientProps) => {
  const [cancelling, setCancelling] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RideFormValues>({
    resolver: yupResolver(RideSchema),
    defaultValues: { origin: '', destination: '', seats: 3, notes: '' },
  });

  const postRide = async (values: RideFormValues) => {
    try {
      await createRide({ ...values, driverEmail });
      await Swal.fire({ icon: 'success', title: 'Ride posted!', text: 'Your ride is saved.' });
      window.location.reload();
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Could not post ride',
        text: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const handleCancel = async (rideId: number) => {
    const confirmation = await Swal.fire({
      icon: 'warning',
      title: 'Cancel this ride?',
      showCancelButton: true,
      confirmButtonText: 'Cancel ride',
    });
    if (!confirmation.isConfirmed) return;
    setCancelling(rideId);
    try {
      await cancelRide(rideId, driverEmail);
      await Swal.fire({ icon: 'success', title: 'Ride cancelled' });
      window.location.reload();
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Could not cancel ride',
        text: error instanceof Error ? error.message : 'Please try again.',
      });
    } finally {
      setCancelling(null);
    }
  };

  return (
    <main style={{ background: '#f5f8f5', minHeight: '100vh' }}>
      <Container className="py-4">
        <h1 className="fw-bold mb-4">Drive</h1>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4 className="fw-bold mb-3">Driver Profile</h4>
            <Row className="g-3">
              <Col md={4}>
                <h5 className="fw-bold">{profile.name}</h5>
                <p className="text-muted mb-1">{driverEmail}</p>
                <Badge bg="success">Signed-in Driver</Badge>
              </Col>
              <Col md={4}>
                <p className="mb-1"><strong>Car:</strong> {profile.car}</p>
                <p className="mb-1"><strong>Seats:</strong> {profile.seats}</p>
                <p className="mb-1"><strong>Home Area:</strong> {profile.homeArea}</p>
              </Col>
              <Col md={4}>
                <p className="mb-1"><strong>Points:</strong> {profile.points}</p>
                <p className="text-muted mb-0">Rides posted: {rides.length}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          <Col lg={5}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Post a Ride</h4>
                <Form noValidate onSubmit={handleSubmit(postRide)}>
                  <Form.Group className="mb-3" controlId="rideFrom">
                    <Form.Label>From</Form.Label>
                    <Form.Select aria-invalid={!!errors.origin} isInvalid={!!errors.origin} {...register('origin')}>
                      <option value="">Choose starting area</option>
                      {AREAS.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.origin?.message}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="rideTo">
                    <Form.Label>Destination</Form.Label>
                    <Form.Select aria-invalid={!!errors.destination} isInvalid={!!errors.destination} {...register('destination')}>
                      <option value="">Choose destination</option>
                      {AREAS.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.destination?.message}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="rideDepartureTime">
                    <Form.Label>Departure date and time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      aria-invalid={!!errors.departureTime}
                      isInvalid={!!errors.departureTime}
                      {...register('departureTime', { valueAsDate: true })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.departureTime?.message}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="rideSeats">
                    <Form.Label>Open Seats</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={7}
                      step={1}
                      aria-invalid={!!errors.seats}
                      isInvalid={!!errors.seats}
                      {...register('seats', { valueAsNumber: true })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.seats?.message}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="rideNotes">
                    <Form.Label>Notes (optional)</Form.Label>
                    <Form.Control as="textarea" rows={3} maxLength={1000} isInvalid={!!errors.notes} {...register('notes')} />
                    <Form.Control.Feedback type="invalid">{errors.notes?.message}</Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100"
                    style={{ backgroundColor: green, borderColor: green }}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Ride'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Your Stats</h4>
                <Row className="text-center">
                  {[
                    { value: profile.points, label: 'Points' },
                    { value: rides.length, label: 'Rides Posted' },
                    { value: rides.filter((ride) => ride.status === 'OPEN' || ride.status === 'FULL').length, label: 'Active Rides' },
                  ].map((stat) => (
                    <Col key={stat.label} xs={4}>
                      <h2 className="fw-bold" style={{ color: '#bf5b20' }}>{stat.value}</h2>
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
                          <h5 className="fw-bold">{ride.from} → {ride.to}</h5>
                          <p className="text-muted mb-2">
                            {new Date(ride.departureTime).toLocaleString('en-US', {
                              timeZone: 'Pacific/Honolulu', dateStyle: 'medium', timeStyle: 'short',
                            })}
                          </p>
                        </div>
                        <Badge bg={ride.status === 'CANCELLED' ? 'secondary' : 'success'}>
                          {ride.status === 'CANCELLED' ? 'Cancelled' : `${ride.seats - ride.acceptedCount} open seats`}
                        </Badge>
                      </div>
                      {ride.notes && <p className="mb-2">{ride.notes}</p>}
                      <p className="text-muted mb-2">Seat requests: {ride.requestCount}</p>
                      {(ride.status === 'OPEN' || ride.status === 'FULL') && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          disabled={cancelling === ride.id}
                          onClick={() => handleCancel(ride.id)}
                        >
                          {cancelling === ride.id ? 'Cancelling...' : 'Cancel Ride'}
                        </Button>
                      )}
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

export default DriveClient;
