import * as React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { StoreContext } from "../../redux/store/StoreProvider";
import ProductFormFromTemplate from "../../components/productTable/productFormFromTemplate";
import {
  getProducts,
  postFromTemplateProduct,
} from "../../redux/products/action";
import styles from "./actionsScreen.module.css";
import MoveProductForm from "../../components/moveProductForm/moveProductForm";
import ReleaseForm from "../../components/releaseForm/releaseForm";
import { ProductFormModel } from "../../components/productTable/types";
import { postLogisticUnitMovement } from "../../redux/logisticUnit/action";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Props = {
  routes: number[];
  setRoutes: (arr: number[]) => void;
  routesString: string;
  setRoutesString: (value: string) => void;
};

function ActionsScreen({
  routes,
  setRoutes,
  routesString,
  setRoutesString,
}: Props): React.ReactElement {
  const {
    productsDispatch,
    suppliersState,
    productTemplatesState,
    logisticUnitsDispatch,
  } = React.useContext(StoreContext);
  const [value, setValue] = React.useState(0);
  const [newIds, setNewIds] = React.useState<ProductFormModel[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const createFromTemplateRequest = (template_id: number, count: number) => {
    postFromTemplateProduct(
      template_id,
      count,
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch).then((resp) => {
      setNewIds((prev) => (resp ? [...prev, ...resp] : prev));
      getProducts(
        suppliersState.data,
        productTemplatesState.data
      )(productsDispatch);
    });
  };

  const releaseRequest = (logistic_unit: number) => {
    postLogisticUnitMovement(
      logistic_unit,
      4,
      suppliersState.data,
      productTemplatesState.data
    )(logisticUnitsDispatch).then((resp) => {
      setNewIds((prev) => (resp ? [...prev, ...resp.list] : prev));
    });
    getProducts(
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Accept" {...a11yProps(0)} />
          <Tab label="Move" {...a11yProps(1)} />
          <Tab label="Release" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <div className={styles.tab} hidden={0 !== value}>
        <ProductFormFromTemplate
          createRequest={createFromTemplateRequest}
          newIds={newIds}
          setNewIds={setNewIds}
        />
      </div>
      <div className={styles.tab} hidden={1 !== value}>
        <MoveProductForm
          routes={routes}
          setRoutes={setRoutes}
          routesString={routesString}
          setRoutesString={setRoutesString}
        />
      </div>
      <div className={styles.tab} hidden={2 !== value}>
        <ReleaseForm
          createRequest={releaseRequest}
          newIds={newIds}
          setNewIds={setNewIds}
        />
      </div>
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  );
}

export default ActionsScreen;
