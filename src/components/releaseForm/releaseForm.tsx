import * as React from "react";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import styles from "./moveProductForm.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { Autocomplete } from "formik-material-ui";
import { LogisticUnitModel, StorageModel } from "../../api/apiModel";
import {
  getLogisticUnits,
  postDocuments,
} from "../../redux/logisticUnit/action";
import { useMemo, useState } from "react";
import { getStorages } from "../../redux/storage/action";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ProductFormModel } from "../productTable/types";
import { ClientFormModel } from "../clientTable/types";

type Props = {
  createRequest: (logistic_unit: number) => void;
  newIds: ProductFormModel[];
  setNewIds: (newValue: ProductFormModel[]) => void;
};

type LogisticUnitModels = {
  units: LogisticUnitModel[];
  customer: ClientFormModel;
};

export function ReleaseForm({
  createRequest,
  newIds,
  setNewIds,
  ...props
}: Props): React.ReactElement {
  const {
    logisticUnitsState,
    logisticUnitsDispatch,
    storageState,
    storageDispatch,
    customersState,
  } = React.useContext(StoreContext);

  const customersOptions: ClientFormModel[] = useMemo(() => {
    return customersState.data;
  }, [customersState]);

  const unitsOptions: LogisticUnitModel[] = useMemo(() => {
    return logisticUnitsState.data.filter(
      (option: LogisticUnitModel) => option.products[0]?.status === "PACKED"
    );
  }, [logisticUnitsState]);
  const [isDownloadButton, setIsDownloadButton] = useState(false);

  return (
    <Box>
      <Formik<LogisticUnitModels>
        initialValues={{
          units: [unitsOptions[0]],
          customer: customersOptions[0],
        }}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={({ units }, { resetForm }) => {
          units.forEach(({ id }: LogisticUnitModel) => createRequest(id));
          resetForm({});
          setIsDownloadButton(true);
          getLogisticUnits()(logisticUnitsDispatch);
          getStorages("main")(storageDispatch);
          getStorages("release")(storageDispatch);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <FieldArray
              name="units"
              render={(arrayHelpers) => (
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  sx={{ maxWidth: "500px" }}
                >
                  <Grid item className={styles.field}>
                    <Field
                      label="Customert"
                      name={`customer`}
                      type="select"
                      component={Autocomplete}
                      options={customersOptions}
                      getOptionLabel={(option: ClientFormModel) =>
                        `${option.name}`
                      }
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Customer"
                          variant="outlined"
                        />
                      )}
                    />
                    <ErrorMessage name={`customer`}>
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
                    </ErrorMessage>
                  </Grid>
                  {values.units && values.units.length > 0 ? (
                    values.units.map((unit, index) => (
                      <>
                        <Grid item className={styles.field}>
                          <Field
                            label="Logistic unit"
                            name={`units[${index}]`}
                            type="select"
                            component={Autocomplete}
                            // multiple
                            // error={errors.unit && touched.logistic_unit}
                            options={unitsOptions.filter(
                              (unit) =>
                                unit.products[0] &&
                                values.customer &&
                                unit.products[0].customer === values.customer.id
                            )}
                            getOptionLabel={(option: LogisticUnitModel) =>
                              `ID${option.id} : ${option.products[0]?.name} (${option.products.length})`
                            }
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                label="Template"
                                variant="outlined"
                              />
                            )}
                          />
                          <ErrorMessage name={`units[${index}]`}>
                            {(msg) => (
                              <div className={styles.errorMessage}>{msg}</div>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item sx={{ width: "3em" }}>
                          <IconButton
                            // variant
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </Grid>
                        <Grid item sx={{ width: "3em" }}>
                          <IconButton
                            onClick={() =>
                              arrayHelpers.insert(index, unitsOptions[0])
                            } // insert an empty string at a position
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </Grid>
                      </>
                    ))
                  ) : (
                    <Grid item className={styles.field}>
                      <Button
                        variant="outlined"
                        onClick={() => arrayHelpers.push(unitsOptions[0])}
                      >
                        Add an unit
                      </Button>
                    </Grid>
                  )}
                  {storageState.data.find(({ id }: StorageModel) => id === 3) &&
                    storageState.data.find(({ id }: StorageModel) => id === 3)
                      .empty_places !== 0 && (
                      <Grid
                        container
                        item
                        spacing={1}
                        className={styles.fieldsRow}
                      >
                        <Grid item className={styles.submitButton}>
                          <Button type="submit" variant="contained">
                            Release
                          </Button>
                        </Grid>
                        <Grid item className={styles.submitButton}>
                          {isDownloadButton && newIds.length > 0 && (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                postDocuments(
                                  Array.from(
                                    new Set(
                                      newIds.map(
                                        ({ logistic_unit }) => logistic_unit!
                                      )
                                    )
                                  ),
                                  customersState.data[0].id,
                                  "release"
                                )(logisticUnitsDispatch).then((resp) => {
                                  getLogisticUnits()(
                                    logisticUnitsDispatch
                                  ).then((resp) => {
                                    const newWindow = window.open(
                                      "http://localhost:8000" +
                                        (resp
                                          ? resp.find(
                                              ({ id }: LogisticUnitModel) =>
                                                id === newIds[0].logistic_unit
                                            )?.products[0].release_file_url!
                                          : "")
                                    );
                                    if (newWindow) newWindow.opener = null;
                                  });
                                });
                              }}
                            >
                              Goods Issued Note (WZ)
                            </Button>
                          )}
                        </Grid>
                        <Grid item className={styles.submitButton}>
                          {isDownloadButton && newIds.length > 0 && (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                setNewIds([]);
                                setIsDownloadButton(false);
                              }}
                            >
                              Reset
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    )}
                </Grid>
              )}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ReleaseForm;
