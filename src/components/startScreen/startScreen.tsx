import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import styles from "./startScreen.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { useHistory } from "react-router-dom";
import { login as loginAction } from "../../redux/login/action";

// const MuiInputBase = createStyles({
//   styleOverrides: {
//     root: {
//       borderColor: "yellow",
//     },
//   },
// });

type Props = {};

function StartScreen({}: Props): React.ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginDispatch } = React.useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.username) {
      history.push("/");
    }
  }, [localStorage.username]);

  const handleOnSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    loginAction(username, password)(loginDispatch);
    // const payload = new FormData();
    // payload.append("username", login);
    // payload.append("password", password);
    // payload.append("token", "")
  };

  return (
    <Grid
      container
      className={styles.container}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing="2"
    >
      <Grid
        container
        className={styles.header}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h2>Minerva</h2>
        <h3>Warehouse management application</h3>
      </Grid>
      <Grid
        container
        className={styles.login}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          id="username-input"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleOnSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

export default StartScreen;
