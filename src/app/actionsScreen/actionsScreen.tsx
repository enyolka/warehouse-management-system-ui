import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { useMemo } from "react";

type Props = {};

function ActionsScreen({}: Props): React.ReactElement {
  const { storageState, storageDispatch } = React.useContext(StoreContext);

  const data = useMemo(() => {
    return storageState.data;
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Button variant="contained" to="/release" component={Link}>
          Release
        </Button>
      </Grid>
    </Grid>
  );
}

export default ActionsScreen;
