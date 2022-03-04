import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {Dropdown} from 'react-bootstrap'

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/UserAction"; 

import "../../App.css";

const Headers = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout())
    alert.success('Logged Out SuccessFully')
  }
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="/images/logo.png" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Link>
          {user ? (
            <Dropdown className="ml-4 dropdown d-inline">
              <Dropdown.Toggle
              variant="transparent" id="dropdown-basic"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>

                <span>{user && user.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                aria-labelledby="dropDownMenuButton"
                className="dropdown-menu"
              >
                {user && user.role !== "admin" ? (
                  <Dropdown.Item  href="orders/me">
                    Orders
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item  href="/dashboard">
                    Dashboard
                  </Dropdown.Item>
                )}
                <Dropdown.Item  href="/me">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            !loading && (
              <Link to="/login" className="btn" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Headers;
