import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import Dashboard from "../dashboard/dashboard";
import StartScreen from "../startScreen/startScreen";
import SupplierForm from "../supplierForm/supplierForm";

const ADMIN_TYPE = 1;

const Content = () => {
  const { user } = useContext(StoreContext);
  const isUserLogged = Boolean(user);
  // const isAdmin = user?.accessLevel === ADMIN_TYPE;
  console.log(Boolean(user));

  return (
    <main>
      <Switch>
        <Route exact path="/">
          {isUserLogged ? <Redirect to="/dashboard" /> : <StartScreen />}
        </Route>
        {isUserLogged && (
          <Route exact path="/dashboard" render={() => <Dashboard />} />
        )}
        {isUserLogged && (
          <Route exact path="/supplier-form" render={() => <SupplierForm />} />
        )}
        {/*{isAdmin && (
          <Route exact path="/start-admin" render={() => <StartScreen />} />
        )} */}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Content;
