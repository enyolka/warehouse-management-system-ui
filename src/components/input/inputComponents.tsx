import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import { fieldToTextField } from "formik-material-ui";
import { useState } from "react";
import { ClientFormModel } from "../clientTable/types";
import {
  ProductFormModel,
  ProductTemplateFormModel,
  StatusModel,
} from "../productTable/types";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>; // if ppl want to restrict this for a given form, let them.
  meta: FieldMetaProps<V>;
  isError?: boolean;
  options?: Array<StatusModel>;
  getOptionLabel?: (
    option: ClientFormModel | ProductTemplateFormModel
  ) => string;
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
    <p>oj</p>
    // <Autocomplete
    //   {...props}
    //   // options={options}
    //   // getOptionLabel={props.getOptionLabel}
    //   onChange={(_, newValue: ClientFormModel | ProductFormModel | any) => {
    //     setFieldValue(name!, newValue);
    //   }}
    //   renderInput={(params) => (
    //     <TextField {...params} {...field} label={field.label} />
    //   )}
    // />
  );
};

const MyRadioGroup = ({
  field,
  form: { touched, errors },
  // name,
  options,
  ...props
}: FieldProps) => {
  const [value, setValue] = useState<StatusModel>(field.value);
  const handleInputChange = (event: any) => {
    event.persist();
    setValue(event.target.value);
  };
  return (
    <>
      <RadioGroup {...field} {...props} name={field.name}>
        {options?.map((option, id) => (
          <FormControlLabel
            key={id}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      {touched[field.name] && errors[field.name] && <>{errors[field.name]}</>}
    </>
  );
};

export { MyAutoComplete, MyInput, MyRadioGroup };
