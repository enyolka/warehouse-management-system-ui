import * as React from "react";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import styles from "../clientTable/clientTable.module.css";
import classNames from "classnames";
import {
  ProductFormModel,
  ProductTemplateFormModel,
  StatusModel,
} from "./types";
import { StoreContext } from "../../redux/store/StoreProvider";
import { Autocomplete } from "formik-material-ui";
import { MyInput } from "../input/inputComponents";
import { LogisticUnitModel } from "../../api/apiModel";
import { getStorages } from "../../redux/storage/action";
import {
  getLogisticUnits,
  postDocuments,
} from "../../redux/logisticUnit/action";
import { useState } from "react";
import {
  getProducts,
  postFromTemplateProduct,
} from "../../redux/products/action";
import { ClientFormModel } from "../clientTable/types";

type Props = {
  open?: boolean;
  handleClose?: (value: React.SetStateAction<boolean>) => void;
  createRequest: (template_id: number, count: number) => void;
  initialValues?: ProductFormModel;
  newIds: ProductFormModel[];
  setNewIds: (newValue: ProductFormModel[]) => void;
};

type ProductFromTemplateModel = {
  template: ProductTemplateFormModel;
  count: number;
};

type ProductFromTemplateModels = {
  units: ProductFromTemplateModel[];
  supplier: ClientFormModel;
};

export const statuses: Array<StatusModel> = [
  {
    label: "Accepted",
    value: "ACCEPTED",
    color: "primary",
  },
  {
    label: "In stock",
    value: "IN_STOCK",
    color: "success",
  },
  {
    label: "Packed",
    value: "PACKED",
    color: "secondary",
  },
  {
    label: "Shipped",
    value: "SHIPPED",
    color: undefined,
  },
];

export function ProductFormFromTemplate({
  open = false,
  createRequest,
  newIds,
  setNewIds,
}: Props): React.ReactElement {
  const {
    productTemplatesState,
    storageDispatch,
    logisticUnitsDispatch,
    productsDispatch,
    suppliersState,
  } = React.useContext(StoreContext);
  const [isDownloadButton, setIsDownloadButton] = useState(false);
  const [supplierId, setSupplierId] = useState(0);

  const initialTemplateModel: ProductFromTemplateModel = {
    template: productTemplatesState.data[0],
    count: 0,
  };

  async function createFromTemplateRequest(template_id: number, count: number) {
    postFromTemplateProduct(
      template_id,
      count,
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch);
  }

  async function createSubmitRequest(units: ProductFromTemplateModel[]) {
    for (const unit of units) {
      await createFromTemplateRequest(unit.template.id, unit.count);
    }
    getProducts(
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch);
    getStorages("main")(storageDispatch);
    getLogisticUnits()(logisticUnitsDispatch);
  }

  return (
    <Box
      className={classNames(
        { [styles.modal]: open },
        { [styles.formBox]: open }
      )}
    >
      <Formik<ProductFromTemplateModels>
        initialValues={{
          units: [initialTemplateModel],
          supplier: suppliersState.data[0],
        }}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async ({ units }, { resetForm }) => {
          units.forEach(({ template, count }) =>
            createRequest(template.id, count)
          );
          setSupplierId(units[0].template.supplier.id);
          setIsDownloadButton(true);
          resetForm({});
          getLogisticUnits()(logisticUnitsDispatch);
          getStorages("admission")(storageDispatch);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray
              name="units"
              render={(arrayHelpers) => (
                <Grid
                  container
                  spacing={2}
                  columns={1}
                  sx={{ maxWidth: "500px" }}
                >
                  <Grid item className={styles.field}>
                    <Field
                      label="Supplier"
                      name={`supplier`}
                      type="select"
                      component={Autocomplete}
                      options={suppliersState.data}
                      getOptionLabel={(option: ClientFormModel) =>
                        `${option.name}`
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Supplier"
                          variant="outlined"
                        />
                      )}
                    />
                    <ErrorMessage name={`supplier`}>
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  {values.units && values.units.length > 0 ? (
                    values.units.map((unit, index) => (
                      <>
                        <Grid item className={styles.field}>
                          <Field
                            label="Template"
                            name={`units[${index}].template`}
                            type="select"
                            component={Autocomplete}
                            options={productTemplatesState.data.filter(
                              (unit: ProductTemplateFormModel) =>
                                unit.supplier.id === values.supplier.id
                            )}
                            getOptionLabel={(
                              option: ProductTemplateFormModel
                            ) => `${option.name} (${option.supplier.name})`}
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                label="Template"
                                variant="outlined"
                              />
                            )}
                          />
                          <ErrorMessage name={`units[${index}].template`}>
                            {(msg) => (
                              <div className={styles.errorMessage}>{msg}</div>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item className={styles.fieldsRow}>
                          <Grid item className={styles.field}>
                            <Field
                              label="Count"
                              name={`units[${index}].count`}
                              type="number"
                              InputProps={{ inputProps: { min: 0 } }}
                              component={MyInput}
                            />
                            <ErrorMessage name={`units[${index}].count`}>
                              {(msg) => (
                                <div className={styles.errorMessage}>{msg}</div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid
                            item
                            className={styles.field}
                            sx={{ width: "3em" }}
                          >
                            <IconButton
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            className={styles.field}
                            sx={{ width: "3em" }}
                          >
                            <IconButton
                              onClick={() =>
                                arrayHelpers.insert(index, initialTemplateModel)
                              }
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </>
                    ))
                  ) : (
                    <Grid item className={styles.field}>
                      <Button
                        variant="outlined"
                        onClick={() => arrayHelpers.push(initialTemplateModel)}
                      >
                        Add an unit
                      </Button>
                    </Grid>
                  )}
                  <Grid container item spacing={1} className={styles.fieldsRow}>
                    <Grid item className={styles.submitButton}>
                      <Button type="submit" variant="contained">
                        Submit
                      </Button>
                    </Grid>

                    <Grid item className={styles.submitButton}>
                      {isDownloadButton && setNewIds.length >= 0 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            postDocuments(
                              Array.from(
                                new Set(
                                  newIds.map(
                                    ({ logistic_unit }) => logistic_unit!
                                  )
                                )
                              ),
                              supplierId,
                              "admission"
                            )(logisticUnitsDispatch).then((resp) => {
                              getLogisticUnits()(logisticUnitsDispatch).then(
                                (resp) => {
                                  const newWindow = window.open(
                                    "http://localhost:8000" +
                                      (resp
                                        ? resp.find(
                                            ({ id }: LogisticUnitModel) =>
                                              id === newIds[0].logistic_unit
                                          )?.products[0].admission_file_url!
                                        : "")
                                  );
                                  if (newWindow) newWindow.opener = null;
                                  setNewIds([]);
                                }
                              );
                            });
                          }}
                        >
                          GRN Document (PZ)
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ProductFormFromTemplate;
