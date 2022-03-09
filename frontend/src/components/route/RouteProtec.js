import React, { Fragment } from 'react'
import { Route, Redirect, Navigate, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RouteProtec = ({ isAdmin, component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (
                <Routes>
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Navigate to='/login' />
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return <Navigate to="/" />
                        }

                        return <Component {...props} />
                    }}
                />
                </Routes>
            )}
        </Fragment>
    )
}

export default RouteProtec