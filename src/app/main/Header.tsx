import * as React from "react";
import { Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { logout } from "../../redux/login/action";
import styles from "./App.module.css";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";

type Props = {};

function Header({}: Props): React.ReactElement {
  const { loginDispatch } = React.useContext(StoreContext);
  const history = useHistory();
  const isUserLogged = Boolean(localStorage.token);

  const handleLogout = () => {
    logout(history)(loginDispatch);
  };

  return (
    <Box className={styles.header}>
      <img src={"/storage/logo.png"} />
      {/* {localStorage.username ? <p>User: {localStorage.username}</p> : null} */}
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
