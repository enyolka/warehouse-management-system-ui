import * as React from "react";
import { Box, Button, Grid, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { useMemo, useState } from "react";
import ProductForm from "../../components/productTable/productForm";
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

type Props = {};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ActionsScreen({}: Props): React.ReactElement {
  const {
    storageState,
    storageDispatch,
    productsState,
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

  const data = useMemo(() => {
    return storageState.data;
  }, []);

  const createFromTemplateRequest = (template_id: number, count: number) => {
    postFromTemplateProduct(
      template_id,
      count,
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch).then((resp) => {
      setNewIds((prev) => (resp ? [...prev, ...resp] : prev));
    });
    getProducts(
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch);
  };

  const moveRequest = (logistic_unit: number) => {
    postLogisticUnitMovement(
      logistic_unit,
      4,
      suppliersState.data,
      productTemplatesState.data
    )(logisticUnitsDispatch).then((resp) => {
      setNewIds((prev) => (resp ? [...prev, ...resp] : prev));
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
        <MoveProductForm />
        {/* <Button variant="contained" to="/move" component={Link}>
          Move to MAIN
        </Button> */}
      </div>
      <div className={styles.tab} hidden={2 !== value}>
        <ReleaseForm
          createRequest={moveRequest}
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
