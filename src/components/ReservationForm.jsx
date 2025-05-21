import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
// https://striveschool-api.herokuapp.com/api/reservation/
// proprietà che il server si aspetta di ricevere da noi per ogni prenotazione inviata:

// modello dell'oggetto:

// name <-- string
// phone <-- string
// numberOfPeople <-- string || number
// smoking <-- boolean
// dateTime <-- string || date
// specialRequests <-- string

const ReservationForm = () => {
  // state = {
  // reservation: {
  //   name: "",
  //   phone: "",
  //   numberOfPeople: "1",
  //   smoking: false,
  //   dateTime: "",
  //   specialRequests: ""
  // },
  // alert: {
  //   isVisible: false,
  //   variant: "",
  //   title: "",
  //   content: ""
  // },
  //   hasError: false
  // };

  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    numberOfPeople: "1",
    smoking: false,
    dateTime: "",
    specialRequests: ""
  });

  const [alert, setAlert] = useState({
    isVisible: false,
    variant: "",
    title: "",
    content: ""
  });

  const [hasError, setHasError] = useState(false);

  // i metodi delle classi vanno creati con arrow function
  // così da mantenere il valore del this che corrisponda a quello dell'istanza del componente
  const handleSubmit = e => {
    e.preventDefault();

    fetch("https://striveschool-api.herokuapp.com/api/reservation/", {
      method: "POST",
      body: JSON.stringify(reservation),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (resp.ok) {
          handleReset();
          return resp.json();
        } else {
          throw new Error("Invio fallito");
        }
      })
      .then(savedReservation => {
        console.log("reservation saved", savedReservation);

        // visualizziamo un feedback di avvenuta operazione tramite alert di react-bootstrap
        // this.setState({
        // alert: {
        //   isVisible: true,
        //   variant: "success",
        //   title: "Prenotazione confermata",
        //   content: `${savedReservation.name}, non vediamo l'ora di ${savedReservation.numberOfPeople > 1 ? "vedervi" : "vederti"}`
        // }
        // });

        setAlert({
          isVisible: true,
          variant: "success",
          title: "Prenotazione confermata",
          content: `${savedReservation.name}, non vediamo l'ora di ${savedReservation.numberOfPeople > 1 ? "vedervi" : "vederti"}`
        });

        // impostiamo un timer che chiuda in automatico l'alert se l'utente non lo fa entro 5 secondi
        setTimeout(
          () =>
            // this.setState({
            // alert: {
            //   isVisible: false,
            //   variant: "",
            //   title: "",
            //   content: ""
            // }
            // }),
            setAlert({
              isVisible: false,
              variant: "",
              title: "",
              content: ""
            }),
          5000
        );
      })
      .catch(err => {
        console.log("catch", err);

        // this.setState({
        //   hasError: true,
        // alert: {
        //   isVisible: true,
        //   variant: "danger",
        //   title: "Errore nella prenotazione",
        //   content: err.message
        // }
        // });

        setHasError(true);
        setAlert({
          isVisible: true,
          variant: "danger",
          title: "Errore nella prenotazione",
          content: err.message
        });
      });
  };

  const handleChange = (propertyName, propertyValue) => {
    // this.setState({ reservation: { ...this.state.reservation, [propertyName]: propertyValue } });
    setReservation({ ...reservation, [propertyName]: propertyValue });
  };

  const handleReset = () => {
    // this.setState({
    //   reservation: {
    //     name: "",
    //     phone: "",
    //     numberOfPeople: "1",
    //     smoking: false,
    //     dateTime: "",
    //     specialRequests: ""
    //   }
    // });
    setReservation({
      name: "",
      phone: "",
      numberOfPeople: "1",
      smoking: false,
      dateTime: "",
      specialRequests: ""
    });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col xs={10} md={6}>
          <h2>Prenota Tavolo</h2>
          <Alert
            show={alert.isVisible}
            variant={alert.variant}
            onClose={() => {
              // this.setState({
              //   alert: {
              //     isVisible: false,
              //     variant: "",
              //     title: "",
              //     content: ""
              //   }
              // });

              setAlert({
                isVisible: false,
                variant: "",
                title: "",
                content: ""
              });
            }}
            dismissible
          >
            <Alert.Heading>{alert.title}</Alert.Heading>
            <p>{alert.content}</p>
          </Alert>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci un nome"
                value={reservation.name}
                // onChange={e => {
                //   this.setState({ reservation: { ...this.state.reservation, name: e.target.value } });
                // }}
                onChange={e => handleChange("name", e.target.value)}
                required
              />
              {(reservation.name.toLowerCase() === "arnaldo" || reservation.name.toLowerCase() === "asdrubale") && (
                <Form.Text className="text-danger">Che brutto nome!</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="+393******"
                value={reservation.phone}
                onChange={e => {
                  handleChange("phone", e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="numberOfPeople">
              <Form.Label>Coperti</Form.Label>
              <Form.Select
                aria-label="numberOfPeople"
                value={reservation.numberOfPeople}
                onChange={e => {
                  handleChange("numberOfPeople", e.target.value);
                }}
                required
              >
                <option value="1">Uno</option>
                <option value="2">Due</option>
                <option value="3">Tre</option>
                <option value="4">Quattro</option>
                <option value="5">Cinque</option>
                <option value="6">Sei</option>
                <option value="7">Sette</option>
                <option value="8">Otto</option>
                <option value="9">Nove</option>
                <option value="10">Dieci</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="smoking">
              <Form.Check
                type="checkbox"
                label="Fumatori"
                value={reservation.smoking}
                onChange={e => {
                  console.log("event checkbox", e);
                  handleChange("smoking", e.target.checked);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateTime">
              <Form.Label>Data e ora</Form.Label>
              <Form.Control
                type="datetime-local"
                value={reservation.dateTime}
                onChange={e => {
                  handleChange("dateTime", e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="specialRequests">
              <Form.Label>Richieste particolari</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Facci sapere se hai allergie, intolleranze, ecc.."
                value={reservation.specialRequests}
                onChange={e => {
                  handleChange("specialRequests", e.target.value);
                }}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="info" type="submit">
                Prenota
              </Button>

              {hasError && (
                <Badge bg="danger" className="d-flex align-items-center">
                  ERRORE ❌
                </Badge>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;
