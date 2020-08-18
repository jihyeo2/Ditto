import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import AnImageInput from "../components/AnImageInput";
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import MenuEntryItem from "../components/MenuEntryItem";

const menu = [
  {
    id: "1",
    name: "A Peace of Cake",
    price: "$5.5",
    image: require("../assets/ricecake.jpeg"),
  },
  {
    id: "2",
    name: "A Peace of Cake",
    price: "$5.5",
    image: require("../assets/ricecake.jpeg"),
  },
  {
    id: "3",
    name: "A Peace of Cake",
    price: "$5.5",
    image: require("../assets/ricecake.jpeg"),
  },
  {
    id: "4",
    name: "A Peace of Cake",
    price: "$5.5",
    image: require("../assets/ricecake.jpeg"),
  },
];

function StoresMenuEditScreen({ navigation }) {
  validationSchema = Yup.object().shape({
    menuImage: Yup.string().required().label("Menu Image"),
    name: Yup.string().required().min(1).label("Name"),
    price: Yup.string().required().min(1).label("Price"),
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
    <Screen style={{ marginHorizontal: 12 }}>
      <ScrollView>
        <AppText
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 25,
            marginLeft: 12,
          }}
        >
          Menu Entry
        </AppText>
        <Form
          initialValues={{
            menuImage: null,
            name: "",
            price: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.inputContainer}>
            <AnImageInput name="Menu Image" width="30%" height={120} />
            <View style={styles.textInputContainer}>
              <FormField
                maxlength={255}
                multiline
                numberOfLines={3}
                name="name"
                placeholder="Name"
              ></FormField>
              <FormField
                name="price"
                keyboardType="numeric"
                maxlength={12}
                placeholder="Price"
              ></FormField>
            </View>
          </View>
          <SubmitButton title="Add" />
          <ListItemSeparator />
        </Form>
        <FlatList
          data={menu}
          keyExtractor={(menu) => menu.id.toString()}
          renderItem={({ item }) => (
            <MenuEntryItem
              name={item.name}
              price={item.price}
              image={item.image}
            />
          )}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textInputContainer: {
    width: "64%",
    marginLeft: 5,
  },
});

export default StoresMenuEditScreen;
