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

function StoresMenuAddScreen({ navigation, route }) {
  console.log("stores edit");

  const validationSchema = Yup.object().shape({
    menus: Yup.array().min(1, "Please add at least one menu."),
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

  const menuImages = [];

  const handleSubmit = async (menus, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    menus.menus.forEach((menu) => menuImages.push(menu.image));
    if (basicInfo.menus) {
      const unwrap = (({
        _id,
        name,
        category,
        location,
        contact,
        openingHours,
        description,
        delivery,
        backgroundImage,
        mainImage,
      }) => ({
        _id,
        name,
        category,
        location,
        contact,
        openingHours,
        description,
        delivery,
        backgroundImage,
        mainImage,
      }))(basicInfo);
      console.log({
        ...menus,
        ...unwrap,
      });
      const result = await editListingsApi.request(
        authToken,
        {
          ...menus,
          ...unwrap,
        },
        (progress) => setProgress(progress)
      );
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the listing.");
      }
      resetForm();
      navigation.navigate(routes.MYACCOUNT);
    } else {
      const result = await addListingsApi.request(
        authToken,
        {
          ...menus,
          ...basicInfo,
          menuImages,
        },
        (progress) => setProgress(progress)
      );
      // if (!result.ok) {
      //   setUploadVisible(false);
      //   return alert("Could not save the listing.");
      // }
      resetForm();
      navigation.navigate(routes.MYACCOUNT);
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
        <AppText
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginVertical: 20,
            marginLeft: 12,
          }}
        >
          Menu Entry
        </AppText>
        <Form
          initialValues={initial}
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
    marginHorizontal: 12,
  },
  images: {
    flexDirection: "row",
  },
});

export default StoresMenuAddScreen;
