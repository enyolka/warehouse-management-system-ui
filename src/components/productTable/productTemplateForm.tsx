import * as React from "react";
import { Box, Button, Grid, Modal, PropTypes, TextField } from "@mui/material";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
  FieldMetaProps,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import styles from "../clientTable/clientTable.module.css";
import classNames from "classnames";
import { ProductTemplateFormModel } from "./types";
import { useContext } from "react";
import { StoreContext } from "../../redux/store/StoreProvider";
import { ClientFormModel } from "../clientTable/types";
import { Autocomplete, fieldToTextField } from "formik-material-ui";
import { MyAutoComplete, MyInput } from "./inputComponents";

type Props = {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
  createRequest: (model: ProductTemplateFormModel) => void;
  initialValues?: ProductTemplateFormModel;
};

export function ProductTemplateForm({
  open,
  handleClose,
  createRequest,
  ...props
}: Props): React.ReactElement {
  const { suppliersState } = React.useContext(StoreContext);

  const initialModel: ProductTemplateFormModel = {
    id: 0,
    name: "",
    supplier: suppliersState.data[0],
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classNames(styles.modal, styles.formBox)}>
        <Formik<ProductTemplateFormModel>
          initialValues={props.initialValues ?? initialModel}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values, { resetForm }) => {
            createRequest(values);
            if (props.initialValues) handleClose(true);
            resetForm({});
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Grid container spacing={2} columns={1}>
                <Grid item className={styles.field}>
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    component={MyInput}
                    error={errors.name && touched.name}
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </Grid>

                <Grid item className={styles.field}>
                  <Field
                    label="Supplier"
                    name="supplier"
                    type="select"
                    component={Autocomplete}
                    error={errors.supplier && touched.supplier}
                    options={suppliersState.data}
                    getOptionLabel={(option: ClientFormModel) => option.name}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Supplier"
                        variant="outlined"
                      />
                    )}
                  />
                  <ErrorMessage name="supplier">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </Grid>

                <Grid item className={styles.fieldsRow}>
                  <Grid item className={styles.field}>
                    <Field
                      label="Length"
                      name="length"
                      type="text"
                      component={MyInput}
                      error={errors.length && touched.length}
                    />
                    <ErrorMessage name="length">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item className={styles.field}>
                    <Field
                      label="Width"
                      name="width"
                      type="text"
                      component={MyInput}
                      error={errors.width && touched.width}
                    />
                    <ErrorMessage name="width">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item className={styles.field}>
                    <Field
                      label="Height"
                      name="height"
                      type="text"
                      component={MyInput}
                      error={errors.height && touched.height}
                    />
                    <ErrorMessage name="height">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item className={styles.field}>
                    <Field
                      label="Weight"
                      name="weight"
                      type="text"
                      component={MyInput}
                      error={errors.weight && touched.weight}
                    />
                    <ErrorMessage name="weight">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>

                <Grid item className={styles.submitButton}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default ProductTemplateForm;
