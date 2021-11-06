import { Redirect, Route, Switch } from "react-router-dom";
import CustomersScreen from "../customersScreen/customersScreen";
import Dashboard from "../dashboard/dashboard";
import StartScreen from "../startScreen/startScreen";
import SuppliersScreen from "../suppliersScreen/suppliersScreen";

const Content = () => {
  const isUserLogged = Boolean(localStorage.token);

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
          <Route exact path="/suppliers" render={() => <SuppliersScreen />} />
        )}
        {isUserLogged && (
          <Route exact path="/customers" render={() => <CustomersScreen />} />
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
