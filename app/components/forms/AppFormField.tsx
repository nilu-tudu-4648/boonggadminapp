import React from "react";
import {
  FormikErrors,
  useFormikContext,
  FormikValues,
  FormikTouched,
} from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { KeyboardType, StyleProp, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { TextContentType } from "@types/TextContentType";
import { TextContentType } from "@/types/TextContentType";
import FormikTypes from "@/types/FormikTypes";

interface FormField {
  name: string;
  width?: number | undefined;
  placeholder: string;
  autoCapitalize?: "none" | undefined;
  autoCorrect?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  keyboardType?: KeyboardType;
  textContentType?: TextContentType;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>
}

const AppFormField: React.FC<FormField> = ({ name, width, ...otherProps }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  }: FormikTypes = useFormikContext<FormikValues>();

  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
