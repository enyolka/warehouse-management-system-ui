import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { WarehouseMap } from "../../components/warehouseMap/warehouseMap";
import { WarehouseMapDiv } from "../../components/warehouseMap/warehouseMapDiv";
import { useMemo } from "react";
import { StorageModel } from "../../api/apiModel";
import { getStorages } from "../../redux/storage/action";
import { useEffect } from "react";
import ActionsScreen from "../actionsScreen/actionsScreen";

type Props = {
  value: number;
  setValue: (newValue: number) => void;
};

function Dashboard({ value, setValue }: Props): React.ReactElement {
  const { storageState, storageDispatch } = React.useContext(StoreContext);

  // useEffect(() => {
  //   getStorages()(storageDispatch);
  // }, [storageState.data]);

  // const data: StorageModel = useMemo(() => {
  //   getStorages()(storageDispatch);
  //   return storageState.data;
  // }, []);

  useEffect(() => {
    getStorages()(storageDispatch);
  }, []);

  const data: StorageModel = useMemo(() => {
    return storageState.data;
  }, [storageState.data]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="stretch"
      alignItems="center"
      spacing={3}
    >
      <Grid item sx={{ width: "50%" }}>
        <ActionsScreen />
      </Grid>
      <Grid item>
        <WarehouseMapDiv data={data} />
      </Grid>
      {/* <Grid item>
        <Button
          variant="contained"
          to="/suppliers"
          component={Link}
          onClick={() => setValue(1)}
        >
          Suppliers
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          to="/customers"
          component={Link}
          onClick={() => setValue(2)}
        >
          Customers
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          to="/product-library"
          component={Link}
          onClick={() => setValue(3)}
        >
          Product Library
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          to="/products"
          component={Link}
          onClick={() => setValue(4)}
        >
          Products
        </Button> 
      </Grid> */}
    </Grid>
  );
}

export default Dashboard;
