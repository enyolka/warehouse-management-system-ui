import * as React from "react";
import { Button, Grid } from "@mui/material";
import { StoreContext } from "../../redux/store/StoreProvider";
import { useContext, useMemo, useState } from "react";
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductTemplateFormModel } from "../../components/productTable/types";
import {
  deleteProductTemplate,
  getProductTemplates,
  postProductTemplate,
  putProductTemplate,
} from "../../redux/productTemplates/action";
import ProductTemplateForm from "../../components/productTable/productTemplateForm";
import ProductTemplateTable from "../../components/productTable/productTemplateTable";

function ProductLibraryScreen(): React.ReactElement {
  const { productTemplatesState, productTemplatesDispatch, suppliersState } =
    useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const disabled = !!(localStorage["admin"] === "false");

  const suppliersData: ClientFormModel[] = useMemo(
    () => suppliersState.data,
    [suppliersState]
  );

  const data: ProductTemplateFormModel[] = useMemo(() => {
    return productTemplatesState.data;
  }, [productTemplatesState]);

  const createRequest = (model: ProductTemplateFormModel) => {
    postProductTemplate(model, suppliersData)(productTemplatesDispatch);
    getProductTemplates()(productTemplatesDispatch);
  };

  const updateRequest = (model: ProductTemplateFormModel) => {
    putProductTemplate(model, suppliersData)(productTemplatesDispatch);
    getProductTemplates()(productTemplatesDispatch);
  };

  const deleteRequest = (idx: number) => {
    deleteProductTemplate(idx)(productTemplatesDispatch);
    getProductTemplates()(productTemplatesDispatch);
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
        <ProductTemplateTable
          deleteRequest={deleteRequest}
          updateRequest={updateRequest}
          data={data}
        />
      </Grid>

      <Grid item>
        {!disabled && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            style={{ marginRight: 10 }}
          >
            Add product template
          </Button>
        )}
        {/* <Button
          variant="contained"
          color="secondary"
          to="/dashboard"
          component={Link}
        >
          Dashboard
        </Button> */}
        <ProductTemplateForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
        />
      </Grid>
    </Grid>
  );
}

export default ProductLibraryScreen;
