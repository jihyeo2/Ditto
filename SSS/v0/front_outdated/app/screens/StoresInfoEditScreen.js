import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import AppFormPicker from "../components/forms/AppFormPicker";
import PickerItem from "../components/PickerItem";
import AnImageInput from "../components/AnImageInput";
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import AppText from "../components/AppText";

function StoresInfoEditScreen({ navigation }) {
  validationSchema = Yup.object().shape({
    name: Yup.string().required().min(1).label("Name"),
    category: Yup.string().required().nullable().label("Category"),
    location: Yup.string().required().min(1).label("Location"),
    contact: Yup.string().required().min(9).max(12).label("Contact"),
    openingHours: Yup.string().required().label("Opening Hours"),
    description: Yup.string().required().label("Brief description"),
    backgroundImage: Yup.string().required().label("backgroundImage"),
    mainImage: Yup.string().required().label("mainImage"),
  });
  const getListingsApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request();
    }
    fetchData();
  }, []);

  const handleSubmit = (listing) => {
    navigation.navigate(routes.STORESMENU_EDIT, listing);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppText>Basic Information</AppText>
        <Form
          initialValues={{
            name: "",
            category: null,
            location: "",
            contact: "",
            openingHours: "",
            description: "",
            backgroundImage: null,
            mainImage: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField maxlength={255} name="name" placeholder="Name"></FormField>
          <AppFormPicker
            name="category"
            items={getListingsApi.data}
            PickerItemComponent={PickerItem}
            placeholder="Category"
            width="48%"
          ></AppFormPicker>
          <FormField
            maxlength={255}
            name="location"
            placeholder="Location"
          ></FormField>
          <FormField
            name="contact"
            keyboardType="numeric"
            maxlength={12}
            placeholder="Contact"
          ></FormField>
          <FormField
            maxlength={255}
            multiline
            numberOfLines={3}
            name="openingHours"
            placeholder="Opening Hours"
          ></FormField>
          <FormField
            maxlength={255}
            multiline
            numberOfLines={3}
            name="description"
            placeholder="Brief description"
          ></FormField>
          <View style={styles.images}>
            <AnImageInput name="backgroundImage" width="47%" height={100} />
            <AnImageInput name="mainImage" width="47%" height={100} />
          </View>
          <SubmitButton title="Next" />
        </Form>
      </ScrollView>
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
    flexWrap: "wrap",
  },
});

export default StoresInfoEditScreen;
