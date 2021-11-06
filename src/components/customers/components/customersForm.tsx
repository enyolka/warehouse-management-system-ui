import * as React from "react";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { CustomerFormModel } from "../types";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
  FieldMetaProps,
} from "formik";
import * as Yup from "yup";
import styles from "../customersPage.module.css";
import classNames from "classnames";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>; // if ppl want to restrict this for a given form, let them.
  meta: FieldMetaProps<V>;
}

const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <TextField style={{ marginRight: 10 }} {...field} {...props} />;
};

type Props = {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
  createRequest: (model: CustomerFormModel) => void;
  initialValues?: CustomerFormModel;
};

export function CustomersForm({
  open,
  handleClose,
  createRequest,
  ...props
}: Props): React.ReactElement {
  const initialModel: CustomerFormModel = {
    id: 0,
    lastName: "",
    firstName: "",
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
        <Formik<CustomerFormModel>
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
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
          })}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item>
                <Field
                  label="First name"
                  name="firstName"
                  type="text"
                  component={MyInput}
                />
                <Field
                  name="lastName"
                  label="Last name"
                  type="text"
                  component={MyInput}
                />
              </Grid>
              <Grid item>
                <Field
                  label="Phone"
                  name="phone"
                  type="text"
                  component={MyInput}
                />
                <Field
                  label="Email"
                  name="email"
                  type="text"
                  component={MyInput}
                />
              </Grid>
              <Grid item>
                <Field
                  label="Street name"
                  name="streetName"
                  type="text"
                  component={MyInput}
                />
                <Field
                  label="Street number"
                  name="streetNumber"
                  type="text"
                  component={MyInput}
                />
              </Grid>
              <Grid item>
                <Field
                  label="Zip code"
                  name="zipCode"
                  type="text"
                  component={MyInput}
                />
                <Field
                  label="City"
                  name="city"
                  type="text"
                  component={MyInput}
                />
              </Grid>

              <Grid item>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}

export default CustomersForm;
