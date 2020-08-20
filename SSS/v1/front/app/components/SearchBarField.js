import React, { useContext } from "react";
import { useFormikContext } from "formik";

import SearchBarAppTextInput from "./SearchBarAppTextInput";
import ErrorMessage from "./forms/ErrorMessage";
import SearchItemContext from "./SearchItemContext";

function SearchBarField({ name, width, height, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <SearchBarAppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        height={height}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default SearchBarField;
