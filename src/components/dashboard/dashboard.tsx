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
