import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuList = ({ menu }) => {
  return (
    <Container className="mt-5">
      {menu.map(plate => (
        <Row className="justify-content-center mb-3" key={`plate-${plate.id}`}>
          <Col md={5}>
            <Card>
              <Card.Img variant="top" src={plate.image} />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {plate.name}
                  <Badge bg="success" style={{ fontSize: "12px" }}>
                    {plate.price}€
                  </Badge>
                </Card.Title>
                <Card.Text>{plate.description}</Card.Text>
                <Link to={"/menu/dettagli/" + plate.id} className="btn btn-dark d-block w-100">
                  Vai a {plate.name}
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default MenuList;
