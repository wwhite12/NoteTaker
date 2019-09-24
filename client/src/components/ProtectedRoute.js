import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../utils/Auth";

const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        console.log(Auth.isLoggedIn),
        Auth.isLoggedIn() ? (
            <Component {...props} />
        ) : (
            alert("Unauthorized"),
            <Redirect to="/" />
        )
    )} />
);

export default ProtectedRoute;