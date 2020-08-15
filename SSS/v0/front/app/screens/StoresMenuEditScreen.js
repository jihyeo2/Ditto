import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import storesApi from "../api/stores";
import useApi from "../hooks/useApi";
import AppText from "../components/AppText";
import authStorage from "../auth/storage";
import userInfoApi from "../api/userInfo";

validationSchema = Yup.object().shape({
  keyword: Yup.string().required().max(30).label("Keyword"),
});

function StoresInfoEditScreen({ navigation, route }) {
  const basicInfo = route.params;

  const addListingsApi = useApi(storesApi.addStores);

  let user = null;
  useEffect(() => {
    async function fetchData() {
      const { data } = await userInfoApi.show(authStorage.getToken());
      user = data;
    }
    fetchData();
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    const result = await addListingsApi.request({
      ...listing,
      basicInfo,
      user,
    });
    if (!result.ok) {
      return alert("Could not save the listing.");
    }
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <AppText>Menu/Service</AppText>
      <Form
        initialValues={{
          keyword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          maxlength={255}
          name="keyword"
          placeholder="Keyword"
        ></FormField>
        <SubmitButton title="Submit" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
  },
  images: {
    flexDirection: "row",
  },
});

export default StoresInfoEditScreen;
