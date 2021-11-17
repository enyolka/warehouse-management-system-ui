import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

function ProductsScreen({}: Props): React.ReactElement {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <h3>Product Library</h3>
      </Grid>
      <Grid item>
        {/* <ProductTable
          deleteRequest={deleteRequest}
          updateRequest={updateRequest}
          data={data}
        /> */}
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          // onClick={() => setOpen(true)}
          style={{ marginRight: 10 }}
        >
          Add product
        </Button>
        <Button variant="contained" to="/dashboard" component={Link}>
          Dashboard
        </Button>
        {/* <ProductForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
        /> */}
      </Grid>
    </Grid>
  );
}

export default ProductsScreen;
