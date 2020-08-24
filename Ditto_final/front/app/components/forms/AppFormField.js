import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import AppNumberInput from "../AppNumberInput";

function AppFormField({ name, width, height, number, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      {number ? (
        <AppNumberInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          width={width}
          {...otherProps}
        />
      ) : (
        <AppTextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          width={width}
          {...otherProps}
        />
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
