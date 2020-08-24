import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import routes from "../navigation/routes";
import * as Yup from "yup";
import { AppForm as Form } from "../components/forms";
import SearchBarField from "./SearchBarField";

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
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(routes.CATEGORY_SHOPPING)}
      >
        <Image
          style={styles.logo}
          source={require("../assets/dittoBlack.png")}
        />
      </TouchableWithoutFeedback>
      <Form
        initialValues={{ searchItem: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <SearchBarField
          name="searchItem"
          width="85%"
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
  logo: {
    height: 45,
    width: 45,
    margin: 8,
    alignSelf: "baseline",
  },
});

export default Header;
