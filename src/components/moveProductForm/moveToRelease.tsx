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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { MyInput } from "../input/inputComponents";
import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import styles from "./moveProductForm.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { Autocomplete } from "formik-material-ui";
import { LogisticUnitModel } from "../../api/apiModel";
import { getLogisticUnits } from "../../redux/logisticUnit/action";
import { useMemo, useState } from "react";
import { getStorages } from "../../redux/storage/action";
import { ClientFormModel } from "../clientTable/types";
import {
  ProductFormModel,
  ProductTemplateFormModel,
} from "../productTable/types";
import { getProducts, postProductsMovement } from "../../redux/products/action";
import { useEffect } from "react";

type Props = {
  options: LogisticUnitModel[];
};

type ProductFromTemplateModel = {
  template: ProductTemplateFormModel;
  count: number;
};

type ProductFromTemplateModels = {
  units: ProductFromTemplateModel[];
  customer: ClientFormModel;
};

export function MoveToRelease({ options }: Props): React.ReactElement {
  const {
    productsState,
    productsDispatch,
    logisticUnitsDispatch,
    suppliersState,
    productTemplatesState,
    storageDispatch,
    customersState,
  } = React.useContext(StoreContext);
  const [unitsOptionsState, setUnitsOptionsState] = useState<any>([]);

  // useEffect(() => {
  //   getProducts(suppliersState, productTemplatesState)(productsDispatch);
  // }, []);

  const unitsOptions = useMemo(() => {
    const x = options
      .flatMap(({ products }) => products)
      .reduce((arr: any, product, idx) => {
        return { ...arr, [product.name]: (arr[product.name] || 0) + 1 };
      }, {});
    setUnitsOptionsState(x);
    return x;
  }, [options]);

  const templatesOptions: ProductTemplateFormModel[] = useMemo(() => {
    return productTemplatesState.data.filter(
      ({ name }: ProductTemplateFormModel) => name in unitsOptions
    );
  }, [productTemplatesState, unitsOptions]);

  const customersOptions: ClientFormModel[] = useMemo(() => {
    return customersState.data;
  }, [customersState]);

  const initialTemplateModel: ProductFromTemplateModel = {
    template: productTemplatesState.data[0],
    count: 0,
  };

  console.log(productsState.data);
  const createRequest = (
    units: ProductFromTemplateModel[],
    customer: number
  ) => {
    const list = units
      .map((unit) =>
        productsState.data
          .filter(
            ({ template, status }: ProductFormModel) =>
              template.name === unit.template.name && status === "IN_STOCK"
          )
          .map(({ id }: ProductFormModel) => id)
          .slice(0, unit.count)
      )
      .flat();

    console.log(list);
    postProductsMovement(
      list,
      customer,
      productTemplatesState.data,
      suppliersState.data,
      customersState.data
    )(productsDispatch);
  };

  // const validationSchema = Yup.object({
  //   name: Yup.string()
  //     .max(30, "Must be 30 characters or less")
  //     .required("Required"),
  // });

  return (
    <Formik<ProductFromTemplateModels>
      initialValues={{
        units: [initialTemplateModel],
        customer: customersOptions[0],
      }}
      enableReinitialize={true}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={({ units, customer }, { resetForm }) => {
        createRequest(units, customer.id);
        resetForm({});
        getLogisticUnits()(logisticUnitsDispatch);
        getStorages("admission")(storageDispatch);
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
                columns={1}
                sx={{ maxWidth: "400px" }}
              >
                {values.units && values.units.length > 0 ? (
                  values.units.map((unit, index) => (
                    <>
                      <Grid item className={styles.field}>
                        <Field
                          label="Template"
                          name={`units[${index}].template`}
                          type="select"
                          component={Autocomplete}
                          // error={errors.units[index].template && touched[index].template}
                          options={templatesOptions}
                          getOptionLabel={(option: ProductTemplateFormModel) =>
                            `${option.name} (${option.supplier.name})`
                          }
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              label="Template"
                              variant="outlined"
                            />
                          )}
                        />
                        <ErrorMessage name={`units[${index}].template`}>
                          {(msg) => (
                            <div className={styles.errorMessage}>{msg}</div>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item className={styles.fieldsRow}>
                        <Grid item className={styles.field}>
                          <Field
                            label="Count"
                            name={`units[${index}].count`}
                            type="number"
                            InputProps={{
                              inputProps: {
                                min: 0,
                                max: unitsOptionsState[unit.template.name] ?? 0,
                              },
                            }}
                            component={MyInput}
                            // error={errors.count && touched.count}
                          />
                          <ErrorMessage name={`units[${index}].count`}>
                            {(msg) => (
                              <div className={styles.errorMessage}>{msg}</div>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid
                          item
                          className={styles.field}
                          sx={{ width: "3em" }}
                        >
                          <IconButton
                            // variant
                            onClick={() => {
                              setUnitsOptionsState((prevState: any) => {
                                return {
                                  ...prevState,
                                  [unit.template.name]:
                                    prevState[unit.template.name] + unit.count,
                                };
                              });
                              return arrayHelpers.remove(index);
                            }}
                            // setUnitsOptionsState(prev => prev.find(unit => unit) )}} // remove a friend from the list
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          className={styles.field}
                          sx={{ width: "3em" }}
                        >
                          <IconButton
                            onClick={() => {
                              setUnitsOptionsState((prevState: any) => {
                                return {
                                  ...prevState,
                                  [unit.template.name]:
                                    prevState[unit.template.name] - unit.count,
                                };
                              });
                              return arrayHelpers.insert(
                                index,
                                initialTemplateModel
                              );
                            }} // insert an empty string at a position
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  ))
                ) : (
                  <Grid item className={styles.field}>
                    <Button
                      variant="outlined"
                      onClick={() => arrayHelpers.push(initialTemplateModel)}
                    >
                      Add an unit
                    </Button>
                  </Grid>
                )}
                <Grid item className={styles.field}>
                  <Field
                    label="Customert"
                    name={`customer`}
                    type="select"
                    component={Autocomplete}
                    // error={errors.units[index].template && touched[index].template}
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
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
                <Grid item className={styles.submitButton}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            )}
          />
        </Form>
      )}
    </Formik>
  );
}

export default MoveToRelease;
