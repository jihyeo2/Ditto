import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";

import defaultStyles from "../../config/styles";

function SearchButton(props) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <MaterialIcons
        name="search"
        size={30}
        color={defaultStyles.colors.medium}
        style={styles.searchIcon}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    alignSelf: "center",
    marginRight: 10,
  },
});

export default SearchButton;
