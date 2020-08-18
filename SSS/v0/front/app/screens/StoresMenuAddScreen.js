import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm as Form, SubmitButton } from "../components/forms";
import storesApi from "../api/stores";
import useApi from "../hooks/useApi";
import AppText from "../components/AppText";
import authStorage from "../auth/storage";
import userInfoApi from "../api/users";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/routes";
import FormMenuPicker from "../components/forms/FormMenuPicker";

function StoresInfoAddScreen({ navigation, route }) {
  console.log("stores edit");

  const validationSchema = Yup.object().shape({
    menus: Yup.array().min(1, "Please select at least one image."),
  });

  const basicInfo = route.params;
  let initial = {
    menus: [],
  };
  if (basicInfo.menus) {
    initial = {
      menus: basicInfo.menus,
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

  const handleSubmit = async (menus, { resetForm }) => {
    console.log("pressed the edit done button");
    console.log("list", {
      ...menus,
      ...basicInfo,
    });
    setProgress(0);
    setUploadVisible(true);
    if (basicInfo.menus) {
      const result = await editListingsApi.request(
        authToken,
        {
          ...menus,
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
          ...menus,
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
      <ScrollView>
        <AppText>Menu/Service</AppText>
        <Form
          initialValues={{
            menus: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormMenuPicker name="menus" />
          <SubmitButton title="Submit" />
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
  },
});

export default StoresInfoAddScreen;
