import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  console.log(id);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      navigate(location.pathname);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="mb-2">
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Review">
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="secondary"
          type="submit"
          onClick={handleSubmitReview}
          className="w-100"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddReview;
