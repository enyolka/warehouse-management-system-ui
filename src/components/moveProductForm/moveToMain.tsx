import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import styles from "./moveProductForm.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { Autocomplete } from "formik-material-ui";
import { LogisticUnitModel, StorageModel } from "../../api/apiModel";
import {
  getLogisticUnits,
  postLogisticUnitMovement,
} from "../../redux/logisticUnit/action";
import { getStorages } from "../../redux/storage/action";

type Props = {
  options: LogisticUnitModel[];
  setRoutes: (arr: number[]) => void;
};

type MovementModel = {
  logistic_unit: LogisticUnitModel;
  storage_type: number;
};

export function MoveToMain({ options, setRoutes }: Props): React.ReactElement {
  const {
    logisticUnitsDispatch,
    suppliersState,
    productTemplatesState,
    storageState,
    storageDispatch,
    customersState,
  } = React.useContext(StoreContext);

  const initialModel: MovementModel = {
    logistic_unit: options[0],
    storage_type: 1,
  };

  const createRequest = (
    logistic_unit: number,
    storage_type: number,
    customer?: number
  ) => {
    postLogisticUnitMovement(
      logistic_unit,
      storage_type,
      suppliersState.data,
      productTemplatesState.data,
      customer,
      customersState.data
    )(logisticUnitsDispatch).then((resp) =>
      setRoutes([resp?.storage_place.x ?? 0])
    );
  };

  return (
    <Formik<MovementModel>
      initialValues={initialModel}
      enableReinitialize={true}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={({ logistic_unit }, { resetForm }) => {
        createRequest(logistic_unit.id, 1);
        resetForm({});
        getLogisticUnits()(logisticUnitsDispatch);
        getStorages("admission")(storageDispatch);
        getStorages("main")(storageDispatch);
        getStorages("release")(storageDispatch);
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <Grid container spacing={2} columns={1} sx={{ width: "400px" }}>
            <Grid item className={styles.field}>
              <Field
                label="Logistic unit"
                name="logistic_unit"
                type="select"
                component={Autocomplete}
                error={errors.logistic_unit && touched.logistic_unit}
                options={options}
                getOptionLabel={(option: LogisticUnitModel) =>
                  `ID${option.id} : ${option.products[0]?.name} (${option.products.length})`
                }
                renderInput={(params: any) => (
                  <TextField {...params} label="Template" variant="outlined" />
                )}
              />
              <ErrorMessage name="logistic_unit">
                {(msg) => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </Grid>
            {storageState.data.find(({ id }: StorageModel) => id === 1) &&
              storageState.data.find(({ id }: StorageModel) => id === 1)
                .empty_places !== 0 && (
                <Grid item className={styles.submitButton}>
                  <Button type="submit" variant="contained">
                    Move
                  </Button>
                </Grid>
              )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default MoveToMain;
