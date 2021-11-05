import * as React from "react";
import { Button, Grid } from "@mui/material";
import { StoreContext } from "../../redux/store/StoreProvider";
import { Link } from "react-router-dom";

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
      spacing={2}
    >
      <Grid item>
        <Button variant="contained" to="/supplier-form" component={Link}>
          Suppliers
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" to="/customers" component={Link}>
          Customers
        </Button>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
