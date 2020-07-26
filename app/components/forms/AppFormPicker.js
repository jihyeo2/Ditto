import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import { ErrorMessage } from ".";

function AppFormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      ></AppPicker>
      <ErrorMessage error={errors[name]} visible={touched[name]}></ErrorMessage>
    </>
  );
}

export default AppFormPicker;
