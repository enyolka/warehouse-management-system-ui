import * as React from "react";
import { Alert, AlertTitle, Box, Button, Grid, Tab, Tabs } from "@mui/material";
import { StoreContext } from "../../redux/store/StoreProvider";
import { WarehouseMapDiv } from "../../components/warehouseMap/warehouseMapDiv";
import { useMemo, useState } from "react";
import { StorageModel } from "../../api/apiModel";
import { getStorages } from "../../redux/storage/action";
import { useEffect } from "react";
import ActionsScreen from "../actionsScreen/actionsScreen";
import styles from "../actionsScreen/actionsScreen.module.css";
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductFormModel } from "../../components/productTable/types";
import { getProducts } from "../../redux/products/action";

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
  const {
    storageState,
    storageDispatch,
    productsState,
    productsDispatch,
    suppliersState,
    productTemplatesState,
  } = React.useContext(StoreContext);
  const [card, setCard] = useState(1);
  const [routes, setRoutes] = useState<Array<number>>([]);
  const [routesString, setRoutesString] = useState<string>("");

  const handleChange = (event: React.SyntheticEvent, newCard: number) => {
    setCard(newCard);
  };

  const extraData: {
    suppliers: ClientFormModel[];
    templates: ProductFormModel[];
  } = useMemo(
    () => ({
      suppliers: suppliersState.data,
      templates: productTemplatesState.data,
    }),
    [suppliersState, productTemplatesState]
  );

  useEffect(() => {
    getStorages("main")(storageDispatch);
    getStorages("admission")(storageDispatch);
    getStorages("release")(storageDispatch);
    getProducts(extraData.suppliers, extraData.templates)(productsDispatch);
  }, []);

  const s = `Route for vehicle 0: \n 0 Load(0) -> 0 Load(0)\nDistance of the  route: 0m\nLoad of the route: 0\nRoute for vehicle 1:\n 0 Load(0) -  > 0 Load(0)\nDistance of the route: 0m\nLoad of the route:  0\nRoute for vehicle 2:\n 0 Load(0) -> 1 Load(4.00) -> 0 Load(4.00)\nDistance of the route: 24m\nLoad of the route: 4.00\n`;

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
        <ActionsScreen
          routes={routes}
          setRoutes={setRoutes}
          routesString={routesString}
          setRoutesString={setRoutesString}
        />
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
          <WarehouseMapDiv
            data={data}
            type={1}
            routes={routes}
            setRoutes={setRoutes}
          />
          <Grid item container justifyContent="space-between">
            {routes.length > 0 && (
              <Grid item>
                <Button
                  onClick={() =>
                    setRoutes((prev) => (prev ? prev.slice(1) : []))
                  }
                >
                  Next stop
                </Button>
              </Grid>
            )}
            {routes.length > 0 && (
              <Grid item>
                <Button onClick={() => setRoutes([])}>Remove directions</Button>
              </Grid>
            )}
          </Grid>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <pre>{routesString}</pre>
          </Alert>
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
