import React, { Fragment, useState, useEffect } from "react";
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getNewProducts } from "../../actions/NewAction";

import './Promo.css'
import Slider from "react-slick";

const styleH3 = {
    textAlign: "left",
    marginBottom: 15,
  };

const PromoComp = () => {

  const params = useParams();

  const alert = useAlert();
  const dispatch = useDispatch();

  const keyword = params.keyword;

  const { loading, products, error } = useSelector(
    (state) => state.newRedu
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getNewProducts(keyword));
  }, [dispatch, alert, error, keyword]);


  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };


  return (
    <div className="mt-5 cont">
      {loading ? (
        "Loading..."
      ) : (
        <>
        <div className="mt-5" >
            <Container>
              <Row>
                <Col className="d-flex justify-content-center" md={12} xs={12}>
                  <img style={{ width: "110%", maxHeight: "200px", textAlign: 'center', borderRadius: "10px" }} src="https://thumbor.prod.vid.id/1gijLqalnHTqVf3K2DDQsTkvMzc=/1200x142/filters:quality(70)/vidio-web-prod-breaking-banner/uploads/breaking_banner/image/1863/b0eee0.jpg" />
                </Col>
              </Row>
            </Container>
          </div>
          <h4 style={styleH3} className="mt-5">Produk Terbaru</h4>
          <Slider {...settings}>
            {products && products.map((product, index) => {
              return (
                <Card style={{ width: '18rem' }}>
                <img className="w-100 px-1 slider" style={{borderRadius: 20}} src={product.images[0].url} alt=""/>
                <Card.Body>
                <h5 className="card-title">
                    <Link to={`/product/${product._id}`} style={{fontSize: 13}}>{product.name}</Link>
                </h5>
                  <Button style={{marginLeft: "5px"}} variant="primary">View Detail</Button>
                </Card.Body>
              </Card>
                // <a href="#">
                //     <img className="w-100 px-1 slider" style={{borderRadius: 20}} src={product.images[0].url} alt=""/>
                // </a>
              );
            })}
          </Slider>
        </>
      )}
    </div>
  );
};

export default PromoComp;