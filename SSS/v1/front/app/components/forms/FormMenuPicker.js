import React from "react";
import { useFormikContext } from "formik";

import MenuInputList from "../MenuInputList";
import ErrorMessage from "./ErrorMessage";

function FormMenuPicker({ name }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const menus = values[name];

  const handleAdd = (menu) => {
    console.log(menu);
    setFieldValue(name, [...menus, menu]);
    alert("You saved the menu");
  };

  const handleRemove = (menu) => {
    setFieldValue(
      name,
      menus.filter((menuItem) => menuItem !== menu)
    );
    alert("You deleted the menu");
  };

  return (
    <>
      <MenuInputList
        menus={menus}
        onAddMenu={handleAdd}
        onRemoveMenu={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormMenuPicker;
