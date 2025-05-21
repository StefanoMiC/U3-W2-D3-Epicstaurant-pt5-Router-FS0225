import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Container>
    <Row className="justify-content-center text-center mt-5">
      <Col md={8}>
        <h1 className="display-2">Not Found</h1>
        <p>Non abbiamo trovato quello che cercavi</p>

        <Link to="/">Torna alla Homepage</Link>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
