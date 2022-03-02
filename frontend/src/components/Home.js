import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/ProductAction";
import Product from "./product/Product";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCOunt } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container container-fluid">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <MetaData title={"Buy Best Product Online"} />
          <h1 id="products_heading">Latest product</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
