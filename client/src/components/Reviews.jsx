import React from "react";
import StarRating from "./StarRating";
import { Card, Col, Row } from "react-bootstrap";

const Reviews = ({ reviews }) => {
  return (
    <Row xs={1} md={3} className="g-4 mb-4">
      {reviews.map((review) => (
        <Col key={review.id}>
          <Card className="h-100 border border-primary rounded-3 shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">{review.name}</h5>
              <StarRating rating={review.rating} />
            </Card.Header>
            <Card.Body>
              <Card.Text>{review.review}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Reviews;
