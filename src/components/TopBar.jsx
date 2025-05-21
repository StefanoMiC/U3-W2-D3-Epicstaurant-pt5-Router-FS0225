import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TopBar = props => (
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Epicstaurant {props.claim}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/menu" className="nav-link">
            Menu
          </NavLink>
          <NavLink to="/prenota-tavolo" className="nav-link">
            Prenota Tavolo
          </NavLink>
          <NavLink to="/prenotazioni" className="nav-link">
            Prenotazioni
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default TopBar;
