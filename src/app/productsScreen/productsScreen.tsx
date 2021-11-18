import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import { useContext, useMemo, useState } from "react";
import { ClientFormModel } from "../../components/clientTable/types";
import ClientForm from "../../components/clientTable/clientForm";
import ClientTable from "../../components/clientTable/clientTable";
import { ProductFormModel } from "../../components/productTable/types";
import {
  deleteProduct,
  getProducts,
  postProduct,
  putProduct,
} from "../../redux/products/action";
import ProductTable from "../../components/productTable/productTable";
import ProductForm from "../../components/productTable/productForm";
import { useEffect } from "react";

type Props = {};

function ProductsScreen({}: Props): React.ReactElement {
  const {
    productsState,
    productsDispatch,
    suppliersState,
    productTemplatesState,
  } = useContext(StoreContext);
  const [open, setOpen] = useState(false);

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

  const data: ProductFormModel[] = useMemo(() => {
    return productsState.data;
  }, [productsState]);

  const createRequest = (model: ProductFormModel) => {
    postProduct(
      model,
      extraData.suppliers,
      extraData.templates
    )(productsDispatch);
    getProducts()(productsDispatch);
  };

  const updateRequest = (model: ProductFormModel) => {
    putProduct(
      model,
      extraData.suppliers,
      extraData.templates
    )(productsDispatch);
    getProducts()(productsDispatch);
  };

  const deleteRequest = (idx: number) => {
    deleteProduct(idx)(productsDispatch);
    getProducts()(productsDispatch);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <h3>Products</h3>
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
