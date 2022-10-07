import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import Loader from "./Loader";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useGlobalContext();

  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children;
        } else if (user === undefined) {
          // if undefined show nothing, but don't redirect
          return <Loader />; // no need to show even loader, but if necessary, show it here
        } else {
          // else if null show redirect
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
      // render={() => {
      //   return user ? children : <Redirect to="/login"></Redirect>;
      // }}
    ></Route>
  );
};

export default PrivateRoute;
