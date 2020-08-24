import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppFormField as FormField,
  AppForm as Form,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import authApi from "../api/auth";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import AnImageInput from "../components/AnImageInput";
import { NativeViewGestureHandler } from "react-native-gesture-handler/GestureHandler";

function RegisterScreen(props) {
  const validationSchema = Yup.object().shape({
    profileImage: Yup.string().label("profileImage"),
    name: Yup.string().required().min(3).max(50).label("Name"),
    email: Yup.string().required().email().min(5).max(255).label("Email"),
    password: Yup.string().required().min(5).max(1024).label("Password"),
  });
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleSubmit = async (userInfo) => {
    console.log("userInfo", userInfo);
    const result = await usersApi.register(userInfo);
    console.log("sdfg", result);

    // if (!result.ok) {
    //   console.log(result);
    //   if (result.data) {
    //     console.log(result.data.error);
    //     setError(result.data.error);
    //   } else {
    //     setError("An unexpected error occurred.");
    //     console.log(result);
    //   }
    //   setRegisterFailed(true);
    //   return;
    // }

    const { data: authToken } = await authApi.login(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  return (
    <ScrollView>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <View style={styles.container}>
        <ErrorMessage error={error} visible={registerFailed} />
        <Form
          initialValues={{
            profileImage: null,
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AnImageInput name="profileImage" />
          <FormField
            name="name"
            textInputStyle={{
              flex: 1,
            }}
            icon="account"
            placeholder="Name"
          ></FormField>
          <FormField
            name="email"
            textInputStyle={{
              flex: 1,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          ></FormField>
          <FormField
            name="password"
            textInputStyle={{
              flex: 1,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            secureTextEntry
            placeholder="Password"
            textContentType="password"
          ></FormField>
          <SubmitButton title="Register" />
        </Form>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
});

export default RegisterScreen;
