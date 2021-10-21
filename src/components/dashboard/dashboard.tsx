import * as React from "react";
import { Button, Grid } from "@mui/material";
import { StoreContext } from "../../store/StoreProvider";
import { Redirect, Link, useHistory } from "react-router-dom";
import request from "../../helpers/request";
import logout from "../../actions/logout";

// const MuiInputBase = createStyles({
//   styleOverrides: {
//     root: {
//       borderColor: "yellow",
//     },
//   },
// });

type Props = {};

function Dashboard({}: Props): React.ReactElement {
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
      <Button variant="contained" to="/customers" component={Link}>
        Customers
      </Button>
    </Grid>
  );
}

export default Dashboard;
