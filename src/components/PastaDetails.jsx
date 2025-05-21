import { useEffect, useState } from "react";
import { Alert, Badge, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import PastaComments from "./PastaComments";

const PastaDetails = ({ menu }) => {
  const [pasta, setPasta] = useState(null);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  // useNavigate, quando eseguito, ritorna la funzione che permette il cambio di pagina PROGRAMMATICO con
  // una stringa di link associato verso cui mandare l'utente

  const params = useParams();
  // useParams, quando eseguito, ritorna un oggetto con tutti i parametri specificati nella rotta dinamica in App.jsx
  // params diventa quindi un oggetto con coppie chiave-valore, dove la chiave avrà lo stesso nome dato alla sezione dinamica del path in App.jsx
  console.log("PARAMS", params);

  // con il dato contenuto nel parametro noi andremo a ricostruire il dato che ci interessa ==> l'oggetto pasta
  // metteremo insieme il suo id con la collezione (array) di piatti
  // con un find riusciamo a trovare tra tanti oggetti, ognuno con il proprio id, quello che corrisponde al nostro parametro di id

  //   prepariamoci a fare una finta fetch (perché in questo caso il dato è locale, ma normalmente farete delle fetch per ricostruire l'oggetto)
  //   quindi "componentDidMount()": useEffect con array di dipendenze vuoto
  useEffect(() => {
    // qui mettiamo la logica per "ricostruire" il dato a partire dall'id che abbiamo nel parametro
    console.log(params.pastaId);
    // ecco la nostra finta fetch (metodo find su array menu) che ricava l'oggetto pasta:
    const pastaObj = menu.find(plate => plate.id === params.pastaId);
    console.log("Pasta Object", pastaObj);

    // aggiungiamo un timeout per replicare il tempo di attesa di una fetch
    if (pastaObj) {
      setTimeout(() => {
        setPasta(pastaObj);
      }, 1000);
    } else {
      // in caso di errore: id non trovato e di conseguenza nemmeno l'oggetto esiste. (pastaObj è undefined)

      setTimeout(() => {
        //   attiviamo il messaggio di errore
        setHasError(true);

        // dopo ulteriori 5 secondi, se l'utente non ha reagito, lo dirottiamo noi al menu per scegliersi un altro piatto
        setTimeout(() => {
          navigate("/menu");
        }, 5000);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        {pasta ? (
          <Col md={8}>
            <Image src={pasta.image} className="img-fluid" />
            <h1 className="display-3 text-primary">{pasta.name}</h1>
            <p className="lead">{pasta.description}</p>
            <Badge bg="success" className="fs-4 fw-lighter">
              {pasta.price}€
            </Badge>

            <PastaComments pasta={pasta} className="mt-4" />
          </Col>
        ) : hasError ? (
          <Col>
            <Alert variant="danger" className="d-flex justify-content-between align-items-center">
              Pasta non trovata
              <Link to="/menu" className="btn btn-dark">
                Scegli un altro piatto
              </Link>
            </Alert>
          </Col>
        ) : (
          <Col className="text-center">
            <Spinner animation="grow" variant="info" />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PastaDetails;
