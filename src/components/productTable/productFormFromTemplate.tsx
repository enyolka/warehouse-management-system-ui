import * as React from "react";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
  FieldMetaProps,
  ErrorMessage,
  FieldArray,
} from "formik";
import * as Yup from "yup";
import styles from "../clientTable/clientTable.module.css";
import classNames from "classnames";
import {
  ProductFormModel,
  ProductTemplateFormModel,
  StatusModel,
} from "./types";
import { useContext } from "react";
import { StoreContext } from "../../redux/store/StoreProvider";
import { ClientFormModel } from "../clientTable/types";
import {
  Autocomplete,
  fieldToTextField,
  RadioGroup,
  // ToggleButtonGroup,
} from "formik-material-ui";
import {
  MyAutoComplete,
  MyInput,
  MyRadioGroup,
} from "../input/inputComponents";
import { Status } from "../../api/apiModel";
import { getStorages } from "../../redux/storage/action";

type Props = {
  open?: boolean;
  handleClose?: (value: React.SetStateAction<boolean>) => void;
  createRequest: (template_id: number, count: number) => void;
  initialValues?: ProductFormModel;
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
  // handleClose,
  createRequest,
  ...props
}: Props): React.ReactElement {
  const { suppliersState, productTemplatesState, storageDispatch } =
    React.useContext(StoreContext);

  const initialTemplateModel: ProductFromTemplateModel = {
    template: productTemplatesState.data[0],
    count: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
  });

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
        onSubmit={({ units }, { resetForm }) => {
          console.log(units);
          units.forEach(({ template, count }) =>
            createRequest(template.id, count)
          );
          // createRequest(template.id, count);
          // if (props.initialValues) handleClose(true);
          resetForm({});
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
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ProductFormFromTemplate;
