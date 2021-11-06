import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import CustomersPage from "../customers/customersPage";
import Dashboard from "../dashboard/dashboard";
import StartScreen from "../startScreen/startScreen";
import SupplierForm from "../supplierForm/supplierForm";

const Content = () => {
  const { loginState } = useContext(StoreContext);
  const isUserLogged = Boolean(localStorage.token);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          {isUserLogged ? <Redirect to="/dashboard" /> : <StartScreen />}
        </Route>
        {isUserLogged && (
          <Route exact path="/dashboard" render={() => <Dashboard />} />
        )}{" "}
        {isUserLogged && (
          <Route exact path="/supplier-form" render={() => <SupplierForm />} />
        )}
        {isUserLogged && (
          <Route exact path="/customers" render={() => <CustomersPage />} />
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
