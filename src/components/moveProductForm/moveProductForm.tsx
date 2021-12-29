import * as React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import style from "./moveProductForm.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { LogisticUnitModel } from "../../api/apiModel";
import { useMemo } from "react";
import MoveToMain from "./moveToMain";
import MoveToRelease from "./moveToRelease";

type Props = {
  routes: number[];
  setRoutes: (arr: number[]) => void;
  routesString: string;
  setRoutesString: (value: string) => void;
};

export function MoveProductForm({
  routes,
  setRoutes,
  routesString,
  setRoutesString,
}: Props): React.ReactElement {
  const { logisticUnitsState, productsState } = React.useContext(StoreContext);
  const [currentType, setCurrentType] = React.useState<"ACCEPTED" | "IN_STOCK">(
    "ACCEPTED"
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newCurrentType: "ACCEPTED" | "IN_STOCK"
  ) => {
    setCurrentType(newCurrentType);
  };

  const unitsOptions: LogisticUnitModel[] = useMemo(() => {
    return logisticUnitsState.data.filter(
      (option: LogisticUnitModel) => option.products[0]?.status === currentType
    );
  }, [logisticUnitsState, currentType, productsState]);

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
        value={currentType}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="ACCEPTED">To Main</ToggleButton>
        <ToggleButton value="IN_STOCK">To Shipment</ToggleButton>
      </ToggleButtonGroup>
      {currentType === "ACCEPTED" ? (
        <MoveToMain options={unitsOptions} />
      ) : (
        <MoveToRelease
          options={unitsOptions}
          routes={routes}
          setRoutes={setRoutes}
          routesString={routesString}
          setRoutesString={setRoutesString}
        />
      )}
      {/* <Formik<MovementModel>
        initialValues={initialModel}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(
          { logistic_unit, storage_type, customer },
          { resetForm }
        ) => {
          createRequest(
            logistic_unit.id,
            currentType === "ACCEPTED" ? 1 : 3,
            customer?.id
          );
          resetForm({});
          getLogisticUnits()(logisticUnitsDispatch);
          getStorages("admission")(storageDispatch);
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
                    `ID${option.id} : ${option.products[0]?.name} (${option.products.length})`
                  }
                  getOptionDisabled={(option: LogisticUnitModel) =>
                    option.products[0]?.status !== currentType
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
              {currentType === "IN_STOCK" && (
                <Grid item className={style.field}>
                  <Field
                    label="Customer"
                    name="customer"
                    type="select"
                    component={Autocomplete}
                    // multiple
                    error={errors.customer && touched.customer}
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
                  <ErrorMessage name="customer">
                    {(msg) => <div className={style.customer}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
              )}
              <Grid item className={style.submitButton}>
                <Button type="submit" variant="contained">
                  Move
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik> */}
    </Box>
  );
}

export default MoveProductForm;
