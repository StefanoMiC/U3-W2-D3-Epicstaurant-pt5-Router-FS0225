import { Badge, ListGroup } from "react-bootstrap";

const PastaComments = ({ pasta, className }) => (
  <ListGroup className={className}>
    {pasta.comments.map(review => (
      <ListGroup.Item className="d-flex align-items-center" key={`item-${review.id}`}>
        <strong>{review.author}</strong> — {review.comment}
        <Badge bg="info" className="ms-auto">
          {review.rating}
        </Badge>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default PastaComments;
