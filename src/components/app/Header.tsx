import * as React from "react";
import { Box, Button, Grid } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import logout from "../../actions/logout";
import styles from "./App.module.css";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";

type Props = {};

function Header({}: Props): React.ReactElement {
  const {
    loginDispatch,
    loginState: {
      login: { loading, error, data },
    },
  } = React.useContext(StoreContext);
  const history = useHistory();
  const isUserLogged = Boolean(data);

  const handleLogout = () => {
    logout(history)(loginDispatch);
  };

  return (
    <Box className={styles.header}>
      <img src={"/storage/logo.png"} />
      {isUserLogged && (
        <Button
          className={styles.btn__logout}
          variant="text"
          onClick={handleLogout}
        >
          Logout
          <FiLogOut className={styles.btn__icon} />
        </Button>
      )}
    </Box>
  );
}

export default Header;
