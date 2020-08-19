import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm as Form, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import FormMenuPicker from "../components/forms/FormMenuPicker";

function TestScreen(props) {
  const validationSchema = Yup.object().shape({
    menus: Yup.array().min(1, "Please select at least one image."),
  });

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppText>Menu/Service</AppText>
        <Form
          initialValues={{
            menus: [],
          }}
          onSubmit={(listing) =>
            console.log("finally menu items are submitted!", listing)
          }
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

export default TestScreen;
