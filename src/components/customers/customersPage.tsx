import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

// const MuiInputBase = createStyles({
//   styleOverrides: {
//     root: {
//       borderColor: "yellow",
//     },
//   },
// });

type Props = {};

function CustomersPage({}: Props): React.ReactElement {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing="2"
    >
      <p>Customers</p>
      <Button variant="contained" to="/dashboard" component={Link}>
        Dashboard
      </Button>
    </Grid>
  );
}

export default CustomersPage;
