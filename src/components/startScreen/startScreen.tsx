import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import styles from "./startScreen.module.css";
import request from "../../helpers/request";
import { StoreContext } from "../../store/StoreProvider";
import { Redirect } from "react-router-dom";

// const MuiInputBase = createStyles({
//   styleOverrides: {
//     root: {
//       borderColor: "yellow",
//     },
//   },
// });

type Props = {};

function StartScreen({}: Props): React.ReactElement {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, token, setToken } = React.useContext(StoreContext);

  const handleOnSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // const payload = new FormData();
    // payload.append("username", login);
    // payload.append("password", password);
    // payload.append("token", "")
    request
      .post(
        "/users/v1/token/",
        // payload,
        {
          username: login,
          password: password,
          token: "",
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((resp) => {
        setToken(resp.data.token);
        request
          .get("/users/v1/me", {
            headers: { Authorization: `Token ${resp.data.token}` },
          })
          .then((resp) => {
            console.log("ok");
            setUser(resp.data);
            resp.status === 200 ?? <Redirect to="/dashboard" />;
          })
          .catch((err) => Promise.reject(err));
      })
      .catch((err) => Promise.reject(err));
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
          id="login-input"
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
