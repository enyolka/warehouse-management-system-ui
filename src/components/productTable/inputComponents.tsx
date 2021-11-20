import { Autocomplete, TextField } from "@mui/material";
import { FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import { fieldToTextField } from "formik-material-ui";
import { ClientFormModel } from "../clientTable/types";
import { ProductFormModel } from "./types";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>; // if ppl want to restrict this for a given form, let them.
  meta: FieldMetaProps<V>;
  isError?: boolean;
  options?: Array<ClientFormModel>;
}

const MyInput = ({ field, form, ...props }: FieldProps) => {
  return (
    <TextField
      style={{ marginRight: 10 }}
      error={props.isError}
      {...field}
      {...props}
    />
  );
};

const MyAutoComplete = ({
  options = [],
  isError = false,
  ...props
}: FieldProps) => {
  const {
    form: { setTouched, setFieldValue },
  } = props;
  const { ...field } = fieldToTextField(props);
  const { name } = field;

  return (
    <Autocomplete
      {...props}
      options={options}
      onChange={(_, newValue: ClientFormModel | ProductFormModel | any) => {
        setFieldValue(name!, newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} {...field} label={field.label} />
      )}
    />
  );
};

export { MyAutoComplete, MyInput };
