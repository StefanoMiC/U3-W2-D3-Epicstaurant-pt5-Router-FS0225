import { useState } from "react";
import { Alert, Badge, Button, Carousel, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import PastaComments from "./PastaComments";

const Home = ({ menu }) => {
  // state = {
  //   selectedPasta: null
  // };

  const [selectedPasta, setSelectedPasta] = useState(null);
  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col xs={10} md={6} className="text-center">
          <Carousel
            onSlid={index => {
              // onSlid è una prop collegata all'evento di FINE TRANSIZIONE SLIDE
              // ci chiamerà la nostra funzione ogni volta che una slide viene cambiata: in automatico o manualmente
              // console.log("index", index);
              // console.log("pasta", menu[index]);
              // this.setState({ selectedPasta: menu[index] });
              setSelectedPasta(menu[index]);
            }}
            // interval={null}
          >
            {/* il nostro obiettivo è generare tanti Carousel.Item quanti sono gli elementi del nostro array menu 
            sfruttiamo il metodo map per fare questo: trasformare gli oggetti dell'array in elementi JSX, tanti quanti erano gli elementi di partenza nell'array
            */}
            {menu.map(plate => (
              // ricordasi la prop key sul primo elemento ritornato del map è molto importante, pena:
              // la rigenerazione complessiva della lista, invece della gestione dei singoli elementi da modificare/eliminare
              <Carousel.Item key={`slide-${plate.id}`}>
                <Image src={plate.image} className="object-fit-cover" height={500} width="100%" onClick={() => setSelectedPasta(plate)} />
                <Carousel.Caption>
                  <h3>{plate.name}</h3>
                  <p>
                    {plate.description} <Badge bg="dark">{plate.price}€</Badge>
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* TERNARY OPERATOR - serve per renderizzare un blocco o l'altro in maniera esclusiva, 
        in base al controllo precedente al ? 
        in questo modo proteggiamo il codice da una prima esecuzione che produrrebbe errori nel leggere 
        troppo presto un this.state.selectedPasta.name o this.state.selectedPasta.comments quando 
        this.state.selectedPasta è ancora null */}
      {selectedPasta ? (
        // se il controllo risulta positivo (truthy) finiamo a renderizzare il primo blocco
        <Row className="justify-content-center mt-4">
          <h4 className="text-center">Recensioni per: {selectedPasta.name}</h4>
          <Col xs={10} md={6}>
            <PastaComments pasta={selectedPasta} />
          </Col>
        </Row>
      ) : (
        // se il controllo risulta negativo (falsy) finiamo a renderizzare il secondo
        <Row className="justify-content-center mt-4">
          <Col xs={10} md={6}>
            <Alert variant="warning">Clicca un'immagine per leggere le recensioni del piatto 👆</Alert>
          </Col>
        </Row>
      )}

      {/* SHORT CIRCUIT OPERATOR - questo è un controllo separato e autonomo rispetto al precedente, ci permette di renderizzare un bottone solo 
        quando si è già selezionata una pasta per resettare lo stato alla sua condizione iniziale, di fatto riportando anche 
        l'interfaccia ad una condizione iniziale */}
      {selectedPasta && (
        <div className="d-flex justify-content-center mt-4">
          <Button variant="danger" onClick={() => setSelectedPasta(null)}>
            Reset
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Home;
