import * as React from "react";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { ClientFormModel } from "../clientTable/types";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
  FieldMetaProps,
  ErrorMessage,
  FormikErrors,
} from "formik";
import * as Yup from "yup";
import styles from "./clientTable.module.css";
import classNames from "classnames";

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

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const zipCodeRegExp = /^(([0-9]{5})|([0-9]{2}-[0-9]{3}))$/;
  const streetRegExp = /^([0-9]+|([0-9]+[/][0-9]+))$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is not valid"),
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
                    label="Email"
                    name="email"
                    type="text"
                    component={MyInput}
                    error={errors.email && touched.email}
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
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
