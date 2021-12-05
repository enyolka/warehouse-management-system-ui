import * as React from "react";
import { Box, Button, Grid, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { WarehouseMap } from "../../components/warehouseMap/warehouseMap";
import { WarehouseMapDiv } from "../../components/warehouseMap/warehouseMapDiv";
import { useMemo } from "react";
import { StorageModel } from "../../api/apiModel";
import { getStorages } from "../../redux/storage/action";
import { useEffect } from "react";
import ActionsScreen from "../actionsScreen/actionsScreen";
import styles from "../actionsScreen/actionsScreen.module.css";

type Props = {
  value: number;
  setValue: (newValue: number) => void;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Dashboard({ value, setValue }: Props): React.ReactElement {
  const { storageState, storageDispatch } = React.useContext(StoreContext);
  const [card, setCard] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newCard: number) => {
    setCard(newCard);
  };

  useEffect(() => {
    getStorages("main")(storageDispatch);
    getStorages("admission")(storageDispatch);
    getStorages("release")(storageDispatch);
  }, []);

  const data: StorageModel[] = useMemo(() => {
    return storageState.data;
  }, [storageState.data]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="stretch"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item sx={{ width: "50%", marginTop: "1em" }}>
        <ActionsScreen />
      </Grid>
      <Grid item>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={card}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Acceptation" {...a11yProps(0)} />
            <Tab label="Main" {...a11yProps(1)} />
            <Tab label="Release" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <div className={styles.tab} hidden={0 !== card}>
          <WarehouseMapDiv data={data} type={2} />
        </div>
        <div className={styles.tab} hidden={1 !== card}>
          <WarehouseMapDiv data={data} type={1} />
        </div>
        <div className={styles.tab} hidden={2 !== card}>
          <WarehouseMapDiv data={data} type={3} />
        </div>
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
