import { Component } from "react";
import withRouter from "../helpers/withRouter";
import { Button } from "react-bootstrap";

class ClassComponent extends Component {
  render() {
    return (
      <div>
        <h2> Sono un class component!</h2>

        <p>il mio parametro dinamico è: {this.props.router.params.dynamicParam}</p>
        <p>l'attuale pathname di location è: {this.props.router.location.pathname}</p>
        <Button onClick={() => this.props.router.navigate("/prenotazioni")}> Vai a prenotazioni</Button>
      </div>
    );
  }
}

export default withRouter(ClassComponent);
