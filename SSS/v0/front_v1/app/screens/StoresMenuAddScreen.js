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
      const result = await editListingsApi.request(
        authToken,
        {
          ...menus,
          ...unwrap,
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
    } else {
      console.log("1", {
        ...menus,
        ...basicInfo,
        menuImages,
      });
      console.log("2", {
        ...menus,
        ...basicInfo,
        ...menuImages,
      });
      const result = await addListingsApi.request(
        authToken,
        {
          ...menus,
          ...basicInfo,
          menuImages,
        },
        (progress) => setProgress(progress)
      );
      // console.log("result 1", result);
      // if (!result.ok) {
      //   setUploadVisible(false);
      //   return alert("Could not save the listing.");
      // }
      setProgress(100);
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
        <AppText>Menu/Service</AppText>
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
    padding: 10,
    paddingTop: 20,
  },
  images: {
    flexDirection: "row",
  },
});

export default StoresInfoAddScreen;
