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
  ...props
}: Props): React.ReactElement {
  const {
    productTemplatesState,
    storageDispatch,
    logisticUnitsDispatch,
    productsState,
    productsDispatch,
    suppliersState,
  } = React.useContext(StoreContext);
  const [isDownloadButton, setIsDownloadButton] = useState(false);

  const initialTemplateModel: ProductFromTemplateModel = {
    template: productTemplatesState.data[0],
    count: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
  });

  async function createFromTemplateRequest(template_id: number, count: number) {
    postFromTemplateProduct(
      template_id,
      count,
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch);
    getProducts(
      suppliersState.data,
      productTemplatesState.data
    )(productsDispatch);
    getStorages("main")(storageDispatch);
    getLogisticUnits()(logisticUnitsDispatch);
  }

  async function createSubmitRequest(units: ProductFromTemplateModel[]) {
    for (const unit of units) {
      await createFromTemplateRequest(unit.template.id, unit.count);
    }
  }

  return (
    <Box
      className={classNames(
        { [styles.modal]: open },
        { [styles.formBox]: open }
      )}
    >
      <Formik<ProductFromTemplateModels>
        initialValues={{ units: [initialTemplateModel] }}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async ({ units }, { resetForm }) => {
          // units.forEach(({ template, count }) =>
          //   createRequest(template.id, count)
          // );
          await createSubmitRequest(units);
          setIsDownloadButton(true);
          // createRequest(template.id, count);
          // if (props.initialValues) handleClose(true);
          resetForm({});
          getLogisticUnits()(logisticUnitsDispatch);
          getStorages("admission")(storageDispatch);
        }}
        //validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (
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
                  {values.units && values.units.length > 0 ? (
                    values.units.map((unit, index) => (
                      <>
                        <Grid item className={styles.field}>
                          <Field
                            label="Template"
                            name={`units[${index}].template`}
                            type="select"
                            component={Autocomplete}
                            // error={errors.units[index].template && touched[index].template}
                            options={productTemplatesState.data}
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
                              // error={errors.count && touched.count}
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
                              // variant
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
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
                              } // insert an empty string at a position
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
                  <Grid item className={styles.submitButton}>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              )}
            />
            <Grid item className={styles.submitButton}>
              {isDownloadButton && props.setNewIds.length > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    postDocuments(
                      Array.from(
                        new Set(
                          props.newIds.map(
                            ({ logistic_unit }) => logistic_unit!
                          )
                        )
                      ),
                      4,
                      "admission"
                    )(logisticUnitsDispatch).then((resp) => {
                      getLogisticUnits()(logisticUnitsDispatch).then((resp) => {
                        const newWindow = window.open(
                          "http://localhost:8000" +
                            (resp
                              ? resp.find(
                                  ({ id }: LogisticUnitModel) =>
                                    id === props.newIds[0].logistic_unit
                                )?.products[0].admission_file_url!
                              : "")
                        );
                        if (newWindow) newWindow.opener = null;
                        props.setNewIds([]);
                      });
                    });
                  }}
                >
                  GRN Document (PZ)
                </Button>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ProductFormFromTemplate;
