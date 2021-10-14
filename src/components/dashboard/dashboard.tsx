import * as React from "react";
import { Button, Grid } from "@mui/material";
import { StoreContext } from "../../store/StoreProvider";
import { Redirect, Link } from "react-router-dom";

// const MuiInputBase = createStyles({
//   styleOverrides: {
//     root: {
//       borderColor: "yellow",
//     },
//   },
// });

type Props = {};

function Dashboard({}: Props): React.ReactElement {
  const { setUser } = React.useContext(StoreContext);

  const handleLogout = () => {};

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing="2"
    >
      <p>ok</p>
      <Button variant="contained" to="/supplier-form" component={Link}>
        Supplier Form
      </Button>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Grid>
  );
}

export default Dashboard;
