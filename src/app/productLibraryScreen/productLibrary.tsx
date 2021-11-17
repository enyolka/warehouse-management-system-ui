import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { StoreContext } from "../../redux/store/StoreProvider";
import {
  deleteSupplier,
  getSuppliers,
  postSupplier,
  putSupplier,
} from "../../redux/suppliers/action";
import { useContext, useMemo, useState } from "react";
import { ClientFormModel } from "../../components/clientTable/types";
import ClientForm from "../../components/clientTable/clientForm";
import ClientTable from "../../components/clientTable/clientTable";
import { ProductTemplateFormModel } from "../../components/productTable/types";
import {
  deleteProductTemplate,
  getProductTemplate,
  postProductTemplate,
  putProductTemplate,
} from "../../redux/productTemplates/action";
import ProductTable from "../../components/productTable/productTable";
import ProductForm from "../../components/productTable/productForm";
import { useEffect } from "react";

type Props = {};

function ProductLibraryScreen({}: Props): React.ReactElement {
  const { productTemplatesState, productTemplatesDispatch, suppliersState } =
    useContext(StoreContext);
  const [open, setOpen] = useState(false);

  const suppliersData: ClientFormModel[] = useMemo(
    () => suppliersState.data,
    [suppliersState]
  );

  const data: ProductTemplateFormModel[] = useMemo(() => {
    return productTemplatesState.data;
  }, [productTemplatesState]);

  const createRequest = (model: ProductTemplateFormModel) => {
    postProductTemplate(model, suppliersData)(productTemplatesDispatch);
    console.log(productTemplatesState.data);
    getProductTemplate(suppliersData)(productTemplatesDispatch);
  };

  const updateRequest = (model: ProductTemplateFormModel) => {
    putProductTemplate(model, suppliersData)(productTemplatesDispatch);
    getProductTemplate(suppliersData)(productTemplatesDispatch);
  };

  const deleteRequest = (idx: number) => {
    deleteProductTemplate(idx)(productTemplatesDispatch);
    getProductTemplate(suppliersData)(productTemplatesDispatch);
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
        <h3>Product Library</h3>
      </Grid>
      <Grid item>
        <ProductTable
          deleteRequest={deleteRequest}
          updateRequest={updateRequest}
          data={data}
        />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          style={{ marginRight: 10 }}
        >
          Add product template
        </Button>
        <Button variant="contained" to="/dashboard" component={Link}>
          Dashboard
        </Button>
        <ProductForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
        />
      </Grid>
    </Grid>
  );
}

export default ProductLibraryScreen;
