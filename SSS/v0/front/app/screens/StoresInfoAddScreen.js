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

function StoresInfoAddScreen({ navigation, route }) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(2).max(255).label("Name"),
    category: Yup.string().required().nullable().label("Category"),
    location: Yup.string().required().min(2).max(1024).label("Address"),
    contact: Yup.string().required().min(9).max(12).label("Contact"),
    openingHours: Yup.string()
      .required()
      .min(2)
      .max(1024)
      .label("Opening Hours"),
    description: Yup.string()
      .required()
      .min(2)
      .max(1024)
      .label("Brief description"),
    delivery: Yup.string().required().min(2).max(1024).label("Delivery Option"),
    backgroundImage: Yup.string().required().label("backgroundImage"),
    mainImage: Yup.string().required().label("mainImage"),
  });

  const storeToEdit = route.params;
  console.log("storeToEdit", storeToEdit);
  let initial = {
    name: "",
    category: null,
    location: "",
    contact: "",
    openingHours: "",
    description: "",
    delivery: "",
    backgroundImage: null,
    mainImage: null,
  };
  if (storeToEdit) {
    initial = {
      name: storeToEdit.name,
      category: storeToEdit.category,
      location: storeToEdit.location,
      contact: storeToEdit.contact,
      openingHours: storeToEdit.openingHours,
      description: storeToEdit.description,
      delivery: storeToEdit.delivery,
      backgroundImage: storeToEdit.backgroundImage,
      mainImage: storeToEdit.mainImage,
    };
  }

  const getListingsApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request();
    }
    fetchData();
  }, []);

  const handleSubmit = (listing) => {
    if (storeToEdit) {
      navigation.navigate(routes.STORESMENU_ADD, {
        ...listing,
        menus: storeToEdit.menus,
        _id: storeToEdit._id,
      });
    } else {
      navigation.navigate(routes.STORESMENU_ADD, listing);
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppText
          style={{
            fontSize: 27,
            fontWeight: "bold",
            marginTop: 25,
            marginLeft: 12,
          }}
        >
          Store Information
        </AppText>
        <Form
          initialValues={initial}
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
            multiline
            numberOfLines={3}
            name="description"
            placeholder="Brief description"
          ></FormField>
          <FormField
            maxlength={255}
            name="location"
            placeholder="Address"
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
            name="delivery"
            placeholder="Delivery Option (Example: Available through Uber Eats."
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

export default StoresInfoAddScreen;
