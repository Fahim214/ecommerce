import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/ProductAction";
import { useAlert } from "react-alert";
import SliderComp from "./layout/SliderComp";
import CategoryComp from "./layout/CategoryComp";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <SliderComp />
      <CategoryComp />
      <div className=" container-fluid" style={{ width: "95%" }}>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={"Buy Best Product Online"} />
            <Row>
              <Col md={6}>
                <h1 id="products_heading">Latest product</h1>
              </Col>
              <Col md={6} style={{ marginTop: 40 }}>
                <Link to="/" className="btn btn-outline-primary mx-1">
                  Elektronik
                </Link>
                <Link to="/" className="btn btn-outline-primary mx-1">
                  Buku
                </Link>
                <Link to="/" className="btn btn-outline-primary mx-1">
                  Baju
                </Link>
                <Link to="/" className="btn btn-outline-primary mx-1">
                  Celana
                </Link>
                <Link to="/" className="btn btn-outline-primary mx-1">
                  Kaos
                </Link>
                <Link to="/" className="btn btn-outline-primary mx-1">
                  Alat Rumah Tangga
                </Link>
              </Col>
            </Row>
            <section
              id="products"
              className="container-fluid mt-5"
              style={{ width: "100%" }}
            >
              <div className="row">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>

            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </Fragment>
        )}
      </div>
    </>
  );
};

export default Home;
