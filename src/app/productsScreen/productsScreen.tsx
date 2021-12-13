import * as React from "react";
import { Button, Grid, Modal } from "@mui/material";
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
  postFromTemplateProduct,
  postProduct,
  putProduct,
} from "../../redux/products/action";
import ProductTable from "../../components/productTable/productTable";
import ProductForm from "../../components/productTable/productForm";
import { useEffect } from "react";
import ProductFormFromTemplate from "../../components/productTable/productFormFromTemplate";
import { getStorages } from "../../redux/storage/action";
import { getLogisticUnits } from "../../redux/logisticUnit/action";

type Props = {};

function ProductsScreen({}: Props): React.ReactElement {
  const {
    productsState,
    productsDispatch,
    suppliersState,
    productTemplatesState,
    storageDispatch,
    logisticUnitsDispatch,
  } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const [newIds, setNewIds] = React.useState<ProductFormModel[]>([]);
  const [openFromTemplate, setOpenFromTemplate] = useState(false);

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
    getProducts(extraData.suppliers, extraData.templates)(productsDispatch);
  }, [productTemplatesState.data]);

  const data: ProductFormModel[] = useMemo(() => {
    return productsState.data;
  }, [productsState]);

  const createRequest = (model: ProductFormModel) => {
    postProduct(
      model,
      extraData.suppliers,
      extraData.templates
    )(productsDispatch);
    getProducts(extraData.suppliers, extraData.templates)(productsDispatch);
  };

  const createFromTemplateRequest = (template_id: number, count: number) => {
    postFromTemplateProduct(
      template_id,
      count,
      extraData.suppliers,
      extraData.templates
    )(productsDispatch);
    getProducts(extraData.suppliers, extraData.templates)(productsDispatch);
    getStorages("main")(storageDispatch);
    getLogisticUnits()(logisticUnitsDispatch);
  };

  const updateRequest = (model: ProductFormModel) => {
    putProduct(
      model,
      extraData.suppliers,
      extraData.templates
    )(productsDispatch);
    getProducts(extraData.suppliers, extraData.templates)(productsDispatch);
  };

  const deleteRequest = (idx: number) => {
    deleteProduct(idx)(productsDispatch);
    getProducts(extraData.suppliers, extraData.templates)(productsDispatch);
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
        <ProductTable
          deleteRequest={deleteRequest}
          updateRequest={updateRequest}
          data={data}
        />
      </Grid>

      <Grid item>
        {/* <Button
          variant="contained"
          onClick={() => setOpen(true)}
          style={{ marginRight: 10 }}
        >
          Add single product
        </Button> */}
        <Button
          variant="contained"
          onClick={() => setOpenFromTemplate(true)}
          style={{ marginRight: 10 }}
        >
          Add products
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          to="/dashboard"
          component={Link}
        >
          Dashboard
        </Button> */}
        {/* <ProductForm
          open={open}
          handleClose={() => setOpen(false)}
          createRequest={createRequest}
        /> */}
        <Modal
          open={openFromTemplate}
          onClose={() => setOpenFromTemplate(false)}
          aria-labelledby="Create from template form"
          aria-describedby="Create from template form"
        >
          <ProductFormFromTemplate
            open={openFromTemplate}
            handleClose={() => setOpenFromTemplate(false)}
            createRequest={createFromTemplateRequest}
            newIds={newIds}
            setNewIds={setNewIds}
          />
        </Modal>
      </Grid>
    </Grid>
  );
}

export default ProductsScreen;
