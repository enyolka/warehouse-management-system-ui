import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { logout } from "../../redux/login/action";
import styles from "./App.module.css";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";

type Props = {
  value: number;
  setValue: (newValue: number) => void;
};

function Header({ value, setValue }: Props): React.ReactElement {
  const { loginDispatch } = React.useContext(StoreContext);
  const history = useHistory();
  const isUserLogged = Boolean(localStorage.token);

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    logout(history)(loginDispatch);
  };

  return (
    <Box className={styles.header}>
      <Link to="/dashboard">
        <img src={"/storage/logo.png"} alt="logo" onClick={() => setValue(0)} />
      </Link>
      {isUserLogged && (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Dashboard"
            to="/dashboard"
            component={Link}
          />
          <BottomNavigationAction
            label="Suppliers"
            to="/suppliers"
            component={Link}
          />
          <BottomNavigationAction
            label="Customers"
            to="/customers"
            component={Link}
          />
          <BottomNavigationAction
            label="Product Library"
            to="/product-library"
            component={Link}
          />
          <BottomNavigationAction
            label="Products"
            to="/products"
            component={Link}
          />
          <BottomNavigationAction
            label="Storage"
            to="/storage"
            component={Link}
          />
          <BottomNavigationAction
            label="Documents"
            to="/documents"
            component={Link}
          />
        </BottomNavigation>
      )}
      {isUserLogged && (
        <Button
          className={styles.btn__logout}
          variant="text"
          onClick={handleLogout}
          to="/"
          component={Link}
        >
          Logout
          <FiLogOut className={styles.btn__icon} />
        </Button>
      )}
    </Box>
  );
}

export default Header;
