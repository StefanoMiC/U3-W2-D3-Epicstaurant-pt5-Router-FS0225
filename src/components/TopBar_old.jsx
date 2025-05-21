import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const TopBar = props => {
  // utilizzare un hook in un componente equivale a SOTTOSCRIVERSI ai cambi di valore connessi a quel hook
  // di fatto ci dà la possibilità di avere nuove renderizzazioni, ogni volta che il dato associato al hook sarà cambiato
  const location = useLocation();
  // useLocation ci ritorna un OGGETTO con dentro proprietà corrispondenti alla posizione relativa della "pagina"
  // qui dentro possiamo trovare il pathname ed eventuali parametri di ricerca

  const checkPath = path => `nav-link ${location.pathname === path ? "active" : ""}`;

  console.log("LOCATION", location);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Epicstaurant {props.claim}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className={checkPath("/")}>
              Home
            </Link>
            <Link to="/prenota-tavolo" className={checkPath("/prenota-tavolo")}>
              Prenota Tavolo
            </Link>
            <Link to="/prenotazioni" className={checkPath("/prenotazioni")}>
              Prenotazioni
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
