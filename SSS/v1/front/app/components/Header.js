import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import routes from "../navigation/routes";
import * as Yup from "yup";
import { AppForm as Form } from "../components/forms";
import SearchBarField from "./SearchBarField";
import SearchItemContext from "./SearchItemContext";
import SearchBarAppTextInput from "./SearchBarAppTextInput";

const validationSchema = Yup.object().shape({
  searchItem: Yup.string().label("searchItem"),
});

function Header({ navigation }) {
  const handleSubmit = (result, { resetForm }) => {
    console.log("res", result);
    navigation.navigate(routes.SEARCH_RESULTS, result);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Form
        initialValues={{ searchItem: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <SearchBarField
          name="searchItem"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search items"
          searchButton
          height={45}
        />
      </Form>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
