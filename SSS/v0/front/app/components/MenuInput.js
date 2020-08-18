import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import AnImageInput from "../components/AnImageInput";
import Icon from "./Icon";
import colors from "../config/colors";
import Menu from "./Menu";

function MenuInput({ menu, onChangeMenu }) {
  const validationSchema = Yup.object().shape({
    image: Yup.string().label("Image"),
    name: Yup.string().required().min(2).max(255).label("Name"),
    price: Yup.string().required().min(1).max(8).label("Price"),
  });

  const handleAdd = async (listing, { resetForm }) => {
    onChangeMenu(listing);
    resetForm();
  };

  let initial = {
    image: null,
    name: "",
    price: "",
  };
  if (menu) {
    initial = {
      image: menu.image,
      name: menu.name,
      price: menu.price,
    };
  }

  let icon = null;
  if (menu) {
    icon = "close";
  } else {
    icon = "plus";
  }
  console.log("this is icon", icon);

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={initial}
        onSubmit={handleAdd}
        validationSchema={validationSchema}
      >
        <Menu icon={icon} />
        {/* <SubmitButton name="submit" /> */}
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    width: 400,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default MenuInput;
