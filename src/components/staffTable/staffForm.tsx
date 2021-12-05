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
import styles from "../clientTable/clientTable.module.css";
import classNames from "classnames";
import { UserModel } from "../../api/apiModel";
import { UserCreateModel } from "./types";

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
  createRequest: (model: UserCreateModel) => void;
  initialValues?: UserCreateModel;
};

export function UserForm({
  open,
  handleClose,
  createRequest,
  ...props
}: Props): React.ReactElement {
  const initialModel: UserCreateModel = {
    id: 0,
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
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
        <Formik<UserCreateModel>
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
                    label="Username"
                    name="username"
                    type="text"
                    component={MyInput}
                    error={errors.username && touched.username}
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </Grid>

                <Grid item className={styles.field}>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={MyInput}
                    error={errors.password && touched.password}
                  />
                  <ErrorMessage name="password">
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

export default UserForm;
