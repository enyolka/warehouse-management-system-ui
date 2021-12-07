import * as React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./moveProductForm.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { Autocomplete } from "formik-material-ui";
import { LogisticUnitModel } from "../../api/apiModel";
import {
  getLogisticUnits,
  postLogisticUnitMovement,
} from "../../redux/logisticUnit/action";
import { useEffect, useMemo } from "react";
import { getStorages } from "../../redux/storage/action";
import { ClientFormModel } from "../clientTable/types";

type Props = {
  // createRequest: (logistic_unit_id: number, storage_type: number) => void;
  // initialValues?: LogisticUnitModel;
};

export function ReleaseForm({}: Props): React.ReactElement {
  const {
    logisticUnitsState,
    logisticUnitsDispatch,
    suppliersState,
    productTemplatesState,
    storageDispatch,
    customersState,
    customersDispatch,
  } = React.useContext(StoreContext);

  // useEffect(() => {
  //   getLogisticUnits()(logisticUnitsDispatch);
  // }, [logisticUnitsState.data]);

  const unitsOptions: LogisticUnitModel[] = useMemo(() => {
    return logisticUnitsState.data.filter(
      (option: LogisticUnitModel) => option.products[0].status === "PACKED"
    );
  }, [logisticUnitsState]);

  const createRequest = (logistic_unit: number) => {
    postLogisticUnitMovement(
      logistic_unit,
      4,
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
      <Formik<{ logistic_unit: LogisticUnitModel }>
        initialValues={{ logistic_unit: unitsOptions[0] }}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={({ logistic_unit }, { resetForm }) => {
          createRequest(logistic_unit.id);
          resetForm({});
          getLogisticUnits()(logisticUnitsDispatch);
          getStorages("main")(storageDispatch);
          getStorages("release")(storageDispatch);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Grid container spacing={2} columns={1} sx={{ maxWidth: "480px" }}>
              <Grid item className={style.field}>
                <Field
                  label="Logistic unit"
                  name="logistic_unit"
                  type="select"
                  component={Autocomplete}
                  // multiple
                  error={errors.logistic_unit && touched.logistic_unit}
                  options={unitsOptions}
                  getOptionLabel={(option: LogisticUnitModel) =>
                    `ID${option.id} : ${option.products[0].name} (${option.products.length})`
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
                  {(msg) => <div className={style.errorMessage}>{msg}</div>}
                </ErrorMessage>
              </Grid>

              <Grid item className={style.submitButton}>
                <Button type="submit" variant="contained">
                  Release
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ReleaseForm;
