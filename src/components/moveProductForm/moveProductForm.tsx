import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  PropTypes,
  TextField,
  TextFieldProps,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
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
import { LogisticUnitModel, Status } from "../../api/apiModel";
import { StatusModel } from "../productTable/types";
import { postLogisticUnitMovement } from "../../redux/logisticUnit/action";

type Props = {
  // createRequest: (logistic_unit_id: number, storage_type: number) => void;
  // initialValues?: LogisticUnitModel;
};

type MovementModel = { logistic_unit: LogisticUnitModel; storage_type: number };

export function MoveProductForm({}: Props): React.ReactElement {
  const {
    logisticUnitsState,
    logisticUnitsDispatch,
    suppliersState,
    productTemplatesState,
  } = React.useContext(StoreContext);

  // const statuses: Array<StatusModel> = [
  //   {
  //     label: "Accepted",
  //     value: "ACCEPTED",
  //   },
  //   {
  //     label: "In stock",
  //     value: "IN_STOCK",
  //   },
  //   {
  //     label: "Shipped",
  //     value: "SHIPPED",
  //   },
  // ];

  const initialModel: MovementModel = {
    logistic_unit: logisticUnitsState.data[0],
    storage_type: 1,
  };

  const createRequest = (logistic_unit: number, storage_type: number) => {
    postLogisticUnitMovement(
      logistic_unit,
      storage_type,
      suppliersState.data,
      productTemplatesState.data
    )(logisticUnitsDispatch);
  };

  // const validationSchema = Yup.object({
  //   name: Yup.string()
  //     .max(30, "Must be 30 characters or less")
  //     .required("Required"),
  // });

  return (
    <Box>
      <Formik<MovementModel>
        initialValues={initialModel}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={({ logistic_unit, storage_type }, { resetForm }) => {
          createRequest(logistic_unit.id, storage_type);
          // if (props.initialValues) handleClose(true);
          resetForm({});
        }}
        //validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Grid container spacing={2} columns={1}>
              <Grid item className={styles.field}>
                <Field
                  label="Logistic unit"
                  name="logistic_unit"
                  type="select"
                  component={Autocomplete}
                  error={errors.logistic_unit && touched.logistic_unit}
                  options={logisticUnitsState.data}
                  getOptionLabel={(option: LogisticUnitModel) =>
                    `${option.id} - ${option.products[0].name} (${option.products.length})`
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Template"
                      variant="outlined"
                    />
                  )}
                />
                <ErrorMessage name="logistic_unit">
                  {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
              </Grid>

              <Grid item className={styles.field}>
                <Field
                  label="Storage"
                  name="storage_type"
                  type="number"
                  component={MyInput}
                  error={errors.storage_type && touched.storage_type}
                />
                <ErrorMessage name="storage_type">
                  {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>
              </Grid>
              <Grid item className={styles.submitButton}>
                <Button type="submit" variant="contained">
                  Move
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default MoveProductForm;
