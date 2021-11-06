import * as React from "react";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { ClientFormModel } from "./types";
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
import styles from "./clientTable.module.css";
import classNames from "classnames";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>; // if ppl want to restrict this for a given form, let them.
  meta: FieldMetaProps<V>;
  error: boolean;
}

const MyInput = ({ field, form, ...props }: FieldProps) => {
  return (
    <TextField
      className={classNames({ error: props.error })}
      style={{ marginRight: 10 }}
      {...field}
      {...props}
    />
  );
};

type Props = {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
  createRequest: (model: ClientFormModel) => void;
  initialValues?: ClientFormModel;
};

export function ClientForm({
  open,
  handleClose,
  createRequest,
  ...props
}: Props): React.ReactElement {
  const initialModel: ClientFormModel = {
    id: 0,
    name: "",
    city: "",
    streetName: "",
    streetNumber: "",
    zipCode: "",
    phone: "",
    email: "",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classNames(styles.modal, styles.formBox)}>
        <Formik<ClientFormModel>
          initialValues={props.initialValues ?? initialModel}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values, { resetForm }) => {
            createRequest(values);
            if (props.initialValues) handleClose(true);
            resetForm({});
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(30, "Must be 30 characters or less")
              .required("Required"),
          })}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item className={styles.fieldsRow}>
                  <Grid item className={styles.field}>
                    <Field
                      label="Name"
                      name="name"
                      type="text"
                      component={MyInput}
                      error={errors.name && touched.name}
                    />
                    <ErrorMessage name="name">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  {/* <Grid item className={styles.field}>
                    <Field
                      name="lastName"
                      label="Last name"
                      type="text"
                      component={MyInput}
                      error={errors.lastName && touched.lastName}
                    />
                    <ErrorMessage name="lastName">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid> */}
                </Grid>
                <Grid item>
                  <Field
                    label="Phone"
                    name="phone"
                    type="text"
                    component={MyInput}
                  />

                  <ErrorMessage name="phone" />
                  <Field
                    label="Email"
                    name="email"
                    type="text"
                    component={MyInput}
                  />
                  <ErrorMessage name="email" />
                </Grid>
                <Grid item>
                  <Field
                    label="Street name"
                    name="streetName"
                    type="text"
                    component={MyInput}
                  />
                  <ErrorMessage name="streetName" />
                  <Field
                    label="Street number"
                    name="streetNumber"
                    type="text"
                    component={MyInput}
                  />
                  <ErrorMessage name="streetNumber" />
                </Grid>
                <Grid item>
                  <Field
                    label="Zip code"
                    name="zipCode"
                    type="text"
                    component={MyInput}
                  />
                  <ErrorMessage name="zipCode" />
                  <Field
                    label="City"
                    name="city"
                    type="text"
                    component={MyInput}
                  />
                  <ErrorMessage name="city" />
                </Grid>

                <Grid item>
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

export default ClientForm;
