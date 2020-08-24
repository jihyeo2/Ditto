import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";

import ListItemSeparator from "../components/lists/ListItemSeparator";

import colors from "../config/colors";
import AppButton from "../components/AppButton";

import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import UserProfile from "../components/UserProfile";

const profile = [
  {
    image: require("../assets/bar.jpg"),
    email: "user@gmail.com",
    nickname: "user_nickname",
  },
];

function StoresInfoEditScreen({ navigation }) {
  const validationSchema = Yup.object().shape({
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
    <Screen style={styles.outer}>
      <ScrollView>
        <View style={styles.horiz}>
          <UserProfile
            frontImage={profile[0].image}
            title={profile[0].nickname}
            subtitle={profile[0].email}
          />
          <View style={styles.container}>
            <Text style={styles.title}>Change Pic</Text>
            <AppButton title="Camera" />
            <AppButton title="Photo Library" />
          </View>
        </View>
        <View style={styles.thic}></View>

        <Text style={styles.title2}>Change Profile</Text>
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
          <View style={styles.vertical}>
            <AppText>Nickname: </AppText>
            <FormField
              maxlength={255}
              name="nickname"
              placeholder="Current Nickname"
            ></FormField>
          </View>
          <View style={styles.separator}></View>

          <View style={styles.vertical}>
            <AppText>Email: </AppText>
            <FormField
              maxlength={255}
              name="email"
              placeholder="user@mail.com"
            ></FormField>
          </View>
          <View style={styles.separator}></View>

          <View style={styles.vertical}>
            <AppText>Change Password: </AppText>
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
  outer: {
    margin: 12,
    padding: 0,
    paddingTop: 20,
    alignContent: "center",
    alignItems: "center",
  },

  container: {
    padding: 5,
    paddingTop: 20,
    alignContent: "center",
    alignItems: "center",
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    paddingTop: 35,
    fontSize: 18,
    fontWeight: "500",

    color: colors.dark,
    textAlign: "center",
    marginBottom: 5,
  },
  title2: {
    paddingTop: 15,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 0,

    color: colors.dark,

    marginBottom: 8,
  },
  thic: {
    width: "100%",
    height: 30,
    backgroundColor: colors.light,
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
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.light,
  },
});

export default StoresInfoEditScreen;
