import { useContext, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import CustomersScreen from "../customersScreen/customersScreen";
import Dashboard from "../dashboard/dashboard";
import ProductLibraryScreen from "../productLibraryScreen/productLibraryScreen";
import ProductsScreen from "../productsScreen/productsScreen";
import StaffScreen from "../staffScreen/staffScreen";
import StartScreen from "../startScreen/startScreen";
import SuppliersScreen from "../suppliersScreen/suppliersScreen";
import styles from "./App.module.css";

const Content = () => {
  const { loginState } = useContext(StoreContext);
  const isUserLogged = useMemo(() => Boolean(localStorage.token), [loginState]);

  return (
    <main className={styles.main}>
      <Switch>
        <Route exact path="/">
          {isUserLogged ? <Redirect to="/dashboard" /> : <StartScreen />}
        </Route>
        {isUserLogged && (
          <Route exact path="/dashboard" render={() => <Dashboard />} />
        )}

        {isUserLogged && localStorage["admin"] === "true" && (
          <Route exact path="/staff" render={() => <StaffScreen />} />
        )}
        {isUserLogged && (
          <Route exact path="/suppliers" render={() => <SuppliersScreen />} />
        )}
        {isUserLogged && (
          <Route exact path="/customers" render={() => <CustomersScreen />} />
        )}
        {isUserLogged && (
          <Route
            exact
            path="/product-library"
            render={() => <ProductLibraryScreen />}
          />
        )}
        {isUserLogged && (
          <Route exact path="/products" render={() => <ProductsScreen />} />
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
