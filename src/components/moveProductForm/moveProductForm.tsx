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
    storageDispatch,
  } = React.useContext(StoreContext);
  const [type, setType] = React.useState("ACCEPTED");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setType(newType);
  };

  // useEffect(() => {
  //   getLogisticUnits()(logisticUnitsDispatch);
  // }, [logisticUnitsState.data]);

  const options: LogisticUnitModel[] = useMemo(() => {
    return logisticUnitsState.data;
  }, [logisticUnitsState]);

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
      <ToggleButtonGroup
        className={style.toggle}
        color="primary"
        value={type}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="ACCEPTED">To Main</ToggleButton>
        <ToggleButton value="IN_STOCK">To Shipment</ToggleButton>
      </ToggleButtonGroup>
      <Formik<MovementModel>
        initialValues={initialModel}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={({ logistic_unit, storage_type }, { resetForm }) => {
          createRequest(logistic_unit.id, type === "ACCEPTED" ? 1 : 2);
          resetForm({});
          getLogisticUnits()(logisticUnitsDispatch);
          getStorages()(storageDispatch);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Grid container spacing={2} columns={1}>
              <Grid item className={style.field}>
                <Field
                  label="Logistic unit"
                  name="logistic_unit"
                  type="select"
                  component={Autocomplete}
                  // multiple
                  error={errors.logistic_unit && touched.logistic_unit}
                  options={options}
                  getOptionLabel={(option: LogisticUnitModel) =>
                    `ID${option.id} : ${option.products[0].name} (${option.products.length})`
                  }
                  getOptionDisabled={(option: LogisticUnitModel) =>
                    option.products[0].status !== type
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
              {/* 
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
              </Grid> */}
              <Grid item className={style.submitButton}>
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
