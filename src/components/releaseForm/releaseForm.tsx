import * as React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import style from "./moveProductForm.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { Autocomplete } from "formik-material-ui";
import { LogisticUnitModel } from "../../api/apiModel";
import {
  getLogisticUnits,
  postDocuments,
  postLogisticUnitMovement,
} from "../../redux/logisticUnit/action";
import { useEffect, useMemo, useState } from "react";
import { getStorages } from "../../redux/storage/action";
import { ClientFormModel } from "../clientTable/types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ProductFormModel } from "../productTable/types";

type Props = {
  createRequest: (logistic_unit: number) => void;
  newIds: ProductFormModel[];
  setNewIds: (newValue: ProductFormModel[]) => void;
};

type LogisticUnitModels = { units: LogisticUnitModel[] };

export function ReleaseForm({
  createRequest,
  ...props
}: Props): React.ReactElement {
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
      (option: LogisticUnitModel) => option.products[0]?.status === "PACKED"
    );
  }, [logisticUnitsState]);
  const [isDownloadButton, setIsDownloadButton] = useState(false);

  // const validationSchema = Yup.object({
  //   name: Yup.string()
  //     .max(30, "Must be 30 characters or less")
  //     .required("Required"),
  // });

  return (
    <Box>
      <Formik<LogisticUnitModels>
        initialValues={{ units: [unitsOptions[0]] }}
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
                  {values.units && values.units.length > 0 ? (
                    values.units.map((unit, index) => (
                      <>
                        <Grid item className={style.field}>
                          <Field
                            label="Logistic unit"
                            name={`units[${index}]`}
                            type="select"
                            component={Autocomplete}
                            // multiple
                            // error={errors.unit && touched.logistic_unit}
                            options={unitsOptions}
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
                              <div className={style.errorMessage}>{msg}</div>
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
                    <Grid item className={style.field}>
                      <Button
                        variant="outlined"
                        onClick={() => arrayHelpers.push(unitsOptions[0])}
                      >
                        Add an unit
                      </Button>
                    </Grid>
                  )}
                  <Grid item className={style.submitButton}>
                    <Button type="submit" variant="contained">
                      Release
                    </Button>
                  </Grid>
                  <Grid item className={style.submitButton}>
                    {isDownloadButton && (
                      <Button
                        onClick={() => {
                          postDocuments(
                            Array.from(
                              new Set(
                                props.newIds.map(
                                  ({ logistic_unit }) => logistic_unit!
                                )
                              )
                            ),
                            4,
                            "release"
                          )(logisticUnitsDispatch).then((resp) => {
                            getLogisticUnits()(logisticUnitsDispatch).then(
                              (resp) => {
                                console.log(props.newIds);
                                console.log(
                                  resp?.find(
                                    ({ id }: LogisticUnitModel) =>
                                      id === props.newIds[0].logistic_unit
                                  )
                                );
                                const newWindow = window.open(
                                  "http://localhost:8000" +
                                    (resp
                                      ? resp.find(
                                          ({ id }: LogisticUnitModel) =>
                                            id === props.newIds[0].logistic_unit
                                        )?.release_file_url!
                                      : "")
                                );
                                if (newWindow) newWindow.opener = null;
                              }
                            );
                          });
                        }}
                      >
                        GRN Document (PZ)
                      </Button>
                    )}
                  </Grid>
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
