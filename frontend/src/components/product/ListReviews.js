import React from "react";
import { Container } from "react-bootstrap";

const ListReviews = ({ reviews }) => {
  return (
    <Container>
      <div className="reviews mt-5">
        <h2 className="mb-5">Other's Reviews:</h2>
        <hr />
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="review-card my-3">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(review.rating / 5) * 100}%` }}
                ></div>
              </div>
              <p className="review_user">by {review.name}</p>
              <p className="review_comment">{review.comment}</p>

              <hr />
            </div>
          ))}
      </div>
    </Container>
  );
};

export default ListReviews;
