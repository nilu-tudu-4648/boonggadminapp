import React from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";

interface Form {
  children?: JSX.Element | JSX.Element[];
  onSubmit(
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ): void | Promise<void>;
  validationSchema: Yup.AnyObjectSchema;
  initialValues: FormikValues;
}

const AppForm: React.FC<Form> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
