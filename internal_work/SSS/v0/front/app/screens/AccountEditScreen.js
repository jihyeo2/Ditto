import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";

import userApi from "../api/users";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AnImageInput from "../components/AnImageInput";
import authStorage from "../auth/storage";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";

function AccountEditScreen({ navigation, route }) {
  const validationSchema = Yup.object().shape({
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
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (userInfo) => {
    console.log("userInfo", userInfo);
    const result = await editUserApi.request(token, userInfo, (progress) =>
      setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the user information.");
    }
    //resetForm();
    navigation.navigate(routes.MYACCOUNT);
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView>
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
          <View style={{ top: 10, marginBottom: 30 }}>
            <AppText
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginTop: 15,
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              Change Profile
            </AppText>
            <AnImageInput
              name="profileImage"
              height={170}
              width={170}
              borderWidth={10}
              borderColor={colors.light}
              borderRadius={85}
            />
          </View>
          <View style={styles.infoInput}>
            <AppText style={styles.infoTitle}>Name : </AppText>
            <FormField name="name"></FormField>
          </View>

          <View style={styles.infoInput}>
            <AppText style={styles.infoTitle}>Email : </AppText>
            <FormField name="email"></FormField>
          </View>

          <View style={styles.infoInput}>
            <AppText style={styles.infoTitle}>Password : </AppText>
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
    marginHorizontal: 12,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoInput: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 19,

    marginLeft: 12,
  },
  vertical: {
    flex: 1,
    flexDirection: "column",
    alignItems: "baseline",
  },
});

export default AccountEditScreen;
