
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The Manoa Carpool home page. */
const Home = () => (
  <main style={{ backgroundColor: '#f7faf8', color: '#26352e' }}>

    {/* Hero Section */}
    <section
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,45,30,0.88), rgba(0,45,30,0.25)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Container className="py-5">
        <Row>
          <Col lg={7}>
            <Badge bg="success" className="mb-3 px-3 py-2">
              MADE FOR UH MĀNOA STUDENTS
            </Badge>

            <h1 className="display-2 fw-bold mb-3">
              Manoa Carpool
            </h1>

            <h2 className="h3 fw-semibold mb-3">
              Share rides. Build community.
            </h2>

            <p className="fs-5 mb-4" style={{ maxWidth: '520px' }}>
              Get around UH Mānoa together. Find classmates heading your way,
              save money, and make every ride count.
            </p>

            <Button
              href="#find-a-ride"
              size="lg"
              className="rounded-pill px-5 py-3 fw-bold border-0"
              style={{ backgroundColor: '#28a66a' }}
            >
              Find a Ride &nbsp; →
            </Button>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Benefits Section */}
    <Container fluid className="py-4 bg-white">
      <Container>
        <Row className="text-center g-4">
          <Col md={3}>
            <div className="fs-1 mb-2">🚗</div>
            <h5 className="fw-bold mb-1">Save Money</h5>
            <p className="text-secondary mb-0">Split the cost of your ride</p>
          </Col>

          <Col md={3}>
            <div className="fs-1 mb-2">🌱</div>
            <h5 className="fw-bold mb-1">Go Green</h5>
            <p className="text-secondary mb-0">Reduce your carbon footprint</p>
          </Col>

          <Col md={3}>
            <div className="fs-1 mb-2">🤙</div>
            <h5 className="fw-bold mb-1">Meet Fellow ʻOhana</h5>
            <p className="text-secondary mb-0">Connect with UH students</p>
          </Col>

          <Col md={3}>
            <div className="fs-1 mb-2">📍</div>
            <h5 className="fw-bold mb-1">Easy & Convenient</h5>
            <p className="text-secondary mb-0">Find rides near campus</p>
          </Col>
        </Row>
      </Container>
    </Container>

    {/* Find a Ride and Available Rides */}
    <Container id="find-a-ride" className="py-5">
      <Row className="g-4">

        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4" className="p-4">
              <h2 className="fw-bold mb-3">Find a Ride</h2>

              <Form>
                <Row className="g-3">
                  <Col md={5}>
                    <Form.Label className="fw-semibold">Pickup Location</Form.Label>
                    <Form.Control
                      size="lg"
                      placeholder="e.g. Sinclair Library"
                      className="rounded-3"
                    />
                  </Col>

                  <Col md={5}>
                    <Form.Label className="fw-semibold">Destination</Form.Label>
                    <Form.Control
                      size="lg"
                      placeholder="e.g. Ala Moana"
                      className="rounded-3"
                    />
                  </Col>

                  <Col md={2}>
                    <Form.Label className="fw-semibold">Date</Form.Label>
                    <Form.Control
                      type="date"
                      size="lg"
                      className="rounded-3"
                    />
                  </Col>

                  <Col xs={12} className="text-end">
                    <Button
                      type="button"
                      className="rounded-pill px-4 fw-bold border-0"
                      style={{ backgroundColor: '#07583b' }}
                    >
                      Search Rides →
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div className="card-body p-4">
          </Card>

          {/* Available Rides */}
          <Card className="border-0 shadow-sm rounded-4">
            <div className="card-body p-4" className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold mb-0">Available Rides</h2>
                <a href="/find-ride" className="text-success fw-bold text-decoration-none">
                  View All →
                </a>
              </div>

              {[
                {
                  name: 'AlohaAlex',
                  route: 'Sinclair Library → Ala Moana Center',
                  time: '10:30 AM',
                  seats: '2 seats',
                },
                {
                  name: 'UHDrive808',
                  route: 'Campus Center → Waikiki',
                  time: '11:00 AM',
                  seats: '3 seats',
                },
                {
                  name: 'MānoaRider',
                  route: 'Hamilton Library → Kahala Mall',
                  time: '12:00 PM',
                  seats: '1 seat',
                },
              ].map((ride) => (
                <div
                  key={ride.name}
                  className="d-flex flex-wrap align-items-center justify-content-between gap-3 py-3 border-bottom"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#dcebe3',
                        fontSize: '24px',
                      }}
                    >
                      👤
                    </div>

                    <div>
                      <h6 className="fw-bold mb-1">{ride.name}</h6>
                      <small className="text-secondary">{ride.route}</small>
                    </div>
                  </div>

                  <div>
                    <span className="fw-semibold">{ride.time}</span>
                    <div className="text-secondary small">{ride.seats} available</div>
                  </div>

                  <Button
                    href="/find-ride"
                    size="sm"
                    className="rounded-pill px-3 border-0"
                    style={{ backgroundColor: '#07583b' }}
                  >
                    Request Ride
                  </Button>
                </div>
              ))}
              <p className="text-secondary small mt-3 mb-0">
                Sample rides shown for demonstration purposes.
              </p>
            </div className="card-body p-4">
          </Card>
        </Col>

        {/* Campus Map */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden">
            <div className="card-body p-4" className="p-0">
              <div
                className="position-relative d-flex align-items-center justify-content-center"
                style={{
                  minHeight: '440px',
                  height: '100%',
                  backgroundColor: '#dcebd2',
                  backgroundImage:
                    'linear-gradient(35deg, transparent 46%, #ffffff 47%, #ffffff 49%, transparent 50%), linear-gradient(125deg, transparent 46%, #ffffff 47%, #ffffff 49%, transparent 50%)',
                  backgroundSize: '110px 110px',
                }}
              >
                <div className="position-absolute top-0 start-0 p-3">
                  <Badge bg="success" className="px-3 py-2">
                    UH MĀNOA AREA
                  </Badge>
                </div>

                <div
                  className="position-absolute rounded-circle shadow d-flex align-items-center justify-content-center"
                  style={{
                    top: '25%',
                    left: '20%',
                    width: '45px',
                    height: '45px',
                    backgroundColor: '#07583b',
                    color: 'white',
                    fontSize: '22px',
                  }}
                >
                  🚗
                </div>

                <div
                  className="position-absolute rounded-circle shadow d-flex align-items-center justify-content-center"
                  style={{
                    top: '40%',
                    right: '20%',
                    width: '45px',
                    height: '45px',
                    backgroundColor: '#07583b',
                    color: 'white',
                    fontSize: '22px',
                  }}
                >
                  🚗
                </div>

                <div
                  className="position-absolute rounded-circle shadow d-flex align-items-center justify-content-center"
                  style={{
                    bottom: '20%',
                    left: '35%',
                    width: '45px',
                    height: '45px',
                    backgroundColor: '#07583b',
                    color: 'white',
                    fontSize: '22px',
                  }}
                >
                  🚗
                </div>

                <div className="text-center p-3 rounded-4 shadow-sm bg-white">
                  <h5 className="fw-bold mb-1">University of Hawaiʻi</h5>
                  <p className="mb-0 text-secondary">at Mānoa</p>
                </div>

                <div className="position-absolute bottom-0 start-0 p-3">
                  <small className="text-secondary fw-semibold">
                    Illustrative campus map
                  </small>
                </div>
              </div>
            </div className="card-body p-4">
          </Card>
        </Col>

      </Row>
    </Container>

    {/* Call to Action */}
    <section className="py-5 text-center text-white" style={{ backgroundColor: '#07583b' }}>
      <Container>
        <h2 className="fw-bold mb-3">Your campus. Your community. Your ride.</h2>
        <p className="fs-5 mb-4">
          Make getting to UH Mānoa easier by sharing the journey.
        </p>
        <Button
          href="/auth/signup"
          size="lg"
          variant="light"
          className="rounded-pill px-5 fw-bold"
        >
          Join Manoa Carpool
        </Button>
      </Container>
    </section>

  </main>
);

export default Home;
