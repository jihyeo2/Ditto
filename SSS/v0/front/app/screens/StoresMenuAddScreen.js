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
import userInfoApi from "../api/users";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/routes";
import auth from "../api/auth";

function StoresInfoAddScreen({ navigation, route }) {
  console.log("stores edit");

  const validationSchema = Yup.object().shape({
    keyword: Yup.string().required().max(30).label("Keyword"),
  });

  const basicInfo = route.params;
  let initial = {
    keyword: "",
  };
  if (basicInfo.keyword) {
    initial = {
      keyword: basicInfo.keyword,
    };
  }

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const addListingsApi = useApi(storesApi.addStores);
  const editListingsApi = useApi(storesApi.editStores);

  let user = null;
  let authToken = null;
  useEffect(() => {
    async function fetchData() {
      authToken = authStorage.getToken();
      const { data } = await userInfoApi.show(authToken);
      user = data;
    }
    fetchData();
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    console.log("pressed the edit done button");
    setProgress(0);
    setUploadVisible(true);
    console.log({ ...listing, ...basicInfo });
    console.log("authtoken", authToken);
    if (basicInfo.keyword) {
      const result = await editListingsApi.request(
        authToken,
        {
          ...listing,
          ...basicInfo,
        },
        (progress) => setProgress(progress)
      );
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the listing.");
      }
      resetForm();
      navigation.navigate(routes.STORE_MAIN);
    } else {
      const result = await addListingsApi.request(
        authToken,
        {
          ...listing,
          ...basicInfo,
        },
        (progress) => setProgress(progress)
      );
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the listing.");
      }
      resetForm();
      navigation.navigate(routes.STORESINFO_ADD);
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppText>Menu/Service</AppText>
      <Form
        initialValues={initial}
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

export default StoresInfoAddScreen;
