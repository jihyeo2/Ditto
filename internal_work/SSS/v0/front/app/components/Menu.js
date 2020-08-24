import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";

import AnImageInput from "./AnImageInput";
import { AppFormField as FormField } from "../components/forms";
import colors from "../config/colors";

function Menu({ icon }) {
  const { handleSubmit } = useFormikContext();

  return (
    <>
      <View style={styles.inputContainer}>
        <AnImageInput name="image" width="30%" height={120} borderRadius={15} />
        <View style={styles.textInputContainer}>
          <FormField
            maxlength={255}
            multiline
            numberOfLines={3}
            name="name"
            placeholder="Name"
          ></FormField>
          <FormField
            name="price"
            keyboardType="numeric"
            maxlength={8}
            placeholder="Price"
          ></FormField>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{ alignSelf: "center", margin: 15 }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.third,
            textDecorationLine: "underline",
          }}
        >
          {icon}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textInputContainer: {
    width: "64%",
    marginLeft: 5,
  },
});

export default Menu;
