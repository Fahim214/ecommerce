import React from "react";
import { Button, Carousel, Col, Modal, Row } from "react-bootstrap";

function ProductDetailModal(props) {
    console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h3>{props.product.name}</h3>
                <br />
            <p>{props.product.description}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <textarea
          name="review"
          id="review"
          className="form-control mt-3"
          value={props.comment}
          onChange={(e) => props.setComment(e.target.value)}
        ></textarea>

        <button
          className="btn my-3 float-right review-btn px-4 text-white"
          onClick={props.reviewHandler}
         
        >
          Submit
        </button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetailModal;
