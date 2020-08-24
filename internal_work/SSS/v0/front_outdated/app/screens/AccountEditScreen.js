import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import * as ImagePicker from "expo-image-picker";

import AppButton from "../components/AppButton";
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import UserProfile from "../components/UserProfile";
import AnImageInput from "../components/AnImageInput";
import authStorage from "../auth/storage";

function AccountEditScreen({ navigation, route }) {
  validationSchema = Yup.object().shape({
    profileImage: Yup.string().label("profileImage"),
    name: Yup.string().required().min(3).max(50).label("Name"),
    email: Yup.string().required().email().min(5).max(255).label("Email"),
    currentPassword: Yup.string()
      .required()
      .min(5)
      .max(1024)
      .label("Current Password"),
    password: Yup.string().required().min(5).max(1024).label("New Password"),
  });

  const user = route.params;
  const token = authStorage.getToken();
  const editUserApi = useApi(userApi.edit);
  const [error, setError] = useState();
  const [editFailed, setEditFailed] = useState(false);

  const handleSubmit = async (userInfo) => {
    console.log("userInfo", userInfo);
    const result = await editUserApi.request(token, userInfo);

    if (!result.ok) {
      console.log(result);
      if (result.data) {
        console.log(result.data.error);
        setError(result.data.error);
      } else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      setEditFailed(true);
      return;
    }

    navigation.navigate(routes.MYACCOUNT);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        {/* <View style={styles.horiz}>
          <UserProfile
            frontImage={{ uri: user.profileImage }}
            title={user.name}
            subtitle={user.email}
          />
          <View style={styles.container}>
            <Text>Change Pic</Text>
            <AppButton title="camera" />
            <AppButton title="photo library" onPress={handlePressLibrary}/>
          </View>
        </View> */}
        {/* Issue: saved profileImage not getting uploaded */}
        <Form
          initialValues={{
            profileImage: user.profileImage,
            name: user.name,
            email: user.email,
            currentPassword: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AnImageInput name="profileImage" />
          <View style={styles.horiz}>
            <AppText>Name: </AppText>
            <FormField name="name"></FormField>
          </View>

          <View style={styles.horiz}>
            <AppText>Email: </AppText>
            <FormField name="email"></FormField>
          </View>

          <View style={styles.horizPassword}>
            <AppText>Change Password: </AppText>
            <View style={styles.vertical}>
              <FormField
                name="currentPassword"
                textInputStyle={{
                  flex: 1,
                }}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                placeholder="Current Password"
                textContentType="password"
              ></FormField>
              <FormField
                name="password"
                textInputStyle={{
                  flex: 1,
                }}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                placeholder="New Password"
                textContentType="password"
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
  horizPassword: {
    alignItems: "flex-start",
    padding: 10,
    paddingRight: 10,
  },
  vertical: {
    flex: 1,
    flexDirection: "column",
    alignItems: "baseline",
  },
});

export default AccountEditScreen;
