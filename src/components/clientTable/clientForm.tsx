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
import { StoreContext } from "../../redux/store/StoreProvider";
import { useContext } from "react";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}

const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <TextField style={{ marginRight: 10 }} {...field} {...props} />;
};

type Props = {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
  createRequest: (model: ClientFormModel) => void;
  initialValues?: ClientFormModel;
  clientType: "supplier" | "customer";
};

export function ClientForm({
  open,
  handleClose,
  createRequest,
  clientType,
  ...props
}: Props): React.ReactElement {
  const { suppliersState, customersState } = useContext(StoreContext);
  const initialModel: ClientFormModel = {
    id: 0,
    name: "",
    nip: "",
    city: "",
    streetName: "",
    streetNumber: "",
    zipCode: "",
    phone: "",
    email: "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const zipCodeRegExp = /^(([0-9]{5})|([0-9]{2}-[0-9]{3}))$/;
  const streetRegExp = /^([0-9]+|([0-9]+[/][0-9]+))$/;
  const nipRegExp = /^[0-9]{10}$/;

  const duplicateNameCheck = (value: string | undefined) => {
    const list =
      clientType === "customer" ? customersState.data : suppliersState.data;
    for (var i = 0; i < list.length; i++)
      if (value === list[i].nip) {
        return false;
      }
    return true;
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    nip: Yup.string()
      .max(10, "Must be 10 characters")
      .min(10, "Must be 10 characters")
      // .matches(nipRegExp, "NIP is not valid")
      .test("Unique", "Nip needs te be unique", (value: any) => {
        return value ? duplicateNameCheck(value) : false;
      })
      .required("Required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    email: Yup.string().email("Email is not valid"),
    streetName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    streetNumber: Yup.string()
      .matches(streetRegExp, "Street number is not valid")
      .required("Required"),
    // zipCode: Yup.string()
    //   .matches(zipCodeRegExp, "Zip code is not valid. Must be 5 numbers")
    //   .required("Required"),
    city: Yup.string()
      .max(20, "Must be 20 characters or less")
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
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
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
                    label="NIP"
                    name="nip"
                    type="text"
                    onKeyPress={(event: any) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    component={MyInput}
                    error={errors.nip && touched.nip}
                  />
                  <ErrorMessage name="nip">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
                <Grid item className={styles.fieldsRow}>
                  <Grid item className={styles.field}>
                    <Field
                      label="Phone"
                      name="phone"
                      type="text"
                      component={MyInput}
                      error={errors.phone && touched.phone}
                    />
                    <ErrorMessage name="phone">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>

                  <Grid item className={styles.field}>
                    <Field
                      label="Email"
                      name="email"
                      type="text"
                      component={MyInput}
                      error={errors.email && touched.email}
                    />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                <Grid item className={styles.fieldsRow}>
                  <Grid item className={styles.field}>
                    <Field
                      label="Street name"
                      name="streetName"
                      type="text"
                      component={MyInput}
                      error={errors.streetName && touched.streetName}
                    />
                    <ErrorMessage name="streetName">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item className={styles.field}>
                    <Field
                      label="Street number"
                      name="streetNumber"
                      type="text"
                      component={MyInput}
                      error={errors.streetNumber && touched.streetNumber}
                    />
                    <ErrorMessage name="streetNumber">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                <Grid item className={styles.fieldsRow}>
                  <Grid item className={styles.field}>
                    <Field
                      label="Zip code"
                      name="zipCode"
                      type="text"
                      component={MyInput}
                      error={errors.zipCode && touched.zipCode}
                    />
                    <ErrorMessage name="zipCode">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item className={styles.field}>
                    <Field
                      label="City"
                      name="city"
                      type="text"
                      component={MyInput}
                      error={errors.city && touched.city}
                    />
                    <ErrorMessage name="city">
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

export default ClientForm;
