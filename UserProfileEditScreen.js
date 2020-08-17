import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";

import AppButton from "../components/AppButton";
import AppFormPicker from "../components/forms/AppFormPicker";
import PickerItem from "../components/PickerItem";
import AnImageInput from "../components/AnImageInput";
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import UserProfile from "../components/UserProfile";

const profile = [
  {
    image: require("../assets/mosh.jpg"),
    email: "user@gmail.com",
    nickname: "user_nickname",
  },
];

function StoresInfoEditScreen({ navigation }) {
  validationSchema = Yup.object().shape({
    nickname: Yup.string().required().min(1).label("nickname"),
    email: Yup.string().required().min(1).label("email"),
    password: Yup.string().required().min(1).label("password"),
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
        <View style={styles.horiz}>
          <UserProfile
            frontImage={profile[0].image}
            title={profile[0].nickname}
            subtitle={profile[0].email}
          />
          <View style={styles.container}>
            <Text>Change Pic</Text>
            <AppButton title="camera" />
            <AppButton title="photo library" />
          </View>
        </View>

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
          <View style={styles.horiz}>
            <AppText>nickname: </AppText>
            <FormField
              maxlength={255}
              name="nickname"
              placeholder="current nickname"
            ></FormField>
          </View>

          <View style={styles.horiz}>
            <AppText>email: </AppText>
            <FormField
              maxlength={255}
              name="email"
              placeholder="user@mail.com"
            ></FormField>
          </View>

          <View style={styles.horiz}>
            <AppText>change password: </AppText>
            <View style={styles.vertical}>
              <FormField
                maxlength={255}
                name="currnet_pw"
                placeholder="current password"
              ></FormField>
              <FormField
                maxlength={255}
                name="new_pw"
                placeholder="new password"
              ></FormField>
            </View>
          </View>

          <SubmitButton title="Save" />
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,

    paddingTop: 20,
    alignContent: "center",
    alignItems: "center",
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  horiz: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingRight: 10,
  },
  vertical: {
    flex: 1,
    flexDirection: "column",
    alignItems: "baseline",
  },
});

export default StoresInfoEditScreen;
