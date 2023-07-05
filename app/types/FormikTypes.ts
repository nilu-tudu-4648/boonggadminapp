import { FormikErrors, FormikValues, FormikTouched } from "formik";

interface FormikTypes {
  touched: FormikTouched<{ [name: string]: boolean }>;
  values: FormikValues;
  errors: FormikErrors<{ [name: string]: string }>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}

export default FormikTypes;
