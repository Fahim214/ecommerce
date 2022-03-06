import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { profile } from "../../actions/UserAction";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  }, [profile, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="container container-fluid">
          <h2 class="mt-5 ml-5">My Profile</h2>
          <div class="row justify-content-around mt-5 user-info">
            <div class="col-12 col-md-3">
              <figure class="avatar avatar-profile">
                <img
                  class="rounded-circle img-fluid"
                  src={user.avatar && user.avatar.url}
                  alt={user.name}
                  alt=""
                />
              </figure>
              <a
                href="#"
                id="edit_profile"
                class="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </a>
            </div>

            <div class="col-12 col-md-5">
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{user.createAt}</p>
              </div>

              <Link to="/orders" class="btn btn-danger btn-block mt-5">
                My Orders
              </Link>

              <Link
                to="/password/update"
                class="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
