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

const ElektronikComp = () => {
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
            <section
              id="products"
              className="container-fluid mt-5"
              style={{ width: "100%" }}
            >
              <div className="row">
                {products &&
                  products.map((product) => (
                    <div
                      key={product._id}
                      className="col-sm-12 col-md-6 col-lg-2 my-3"
                    >
                      <div className="card p-3 rounded">
                        <img
                          className="card-img-top mx-auto"
                          src={product.images[0].url}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">
                            <Link
                              to={`/product/${product._id}`}
                              style={{ fontSize: 13 }}
                            >
                              {product.name}
                            </Link>
                          </h5>
                          <div className="ratings mt-auto">
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{
                                  width: `${(product.ratings / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span id="no_of_reviews">
                              ({product.numOfReviews} Reviews)
                            </span>
                          </div>
                          <p className="card-text">${product.price}</p>
                          <Link
                            to={`/product/${product._id}`}
                            id="view_btn"
                            className="btn btn-block"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </Fragment>
        )}
      </div>
    </>
  );
};

export default ElektronikComp;
