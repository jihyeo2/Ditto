import React from "react";
import { TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";

import AnImageInput from "./AnImageInput";
import { AppFormField as FormField } from "../components/forms";
import Icon from "./Icon";

function Menu({ icon }) {
  const { handleSubmit } = useFormikContext();

  return (
    <>
      <AnImageInput name="image" />
      <FormField maxlength={255} name="name" placeholder="Name"></FormField>
      <FormField
        name="price"
        keyboardType="numeric"
        maxlength={8}
        placeholder="Price"
      ></FormField>
      <TouchableOpacity onPress={handleSubmit}>
        <Icon name={icon} />
      </TouchableOpacity>
    </>
  );
}

export default Menu;
