import React, { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import AppTextInput from "../components/AppTextInput";
import routes from "../navigation/routes";
import * as Yup from "yup";
import {
  AppForm as Form,
  AppFormField as FormField,
} from "../components/forms";
import SearchItemContext from "./SearchItemContext";

const validationSchema = Yup.object().shape({
  item: Yup.string().label("Item"),
});

function Header({ navigation }) {
  const { searchItem } = useContext(SearchItemContext);

  const handleSubmit = () => {
    console.log(searchItem);
    navigation.navigate(routes.SEARCH_RESULTS, searchItem);
  };
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          marginLeft: 17,
          marginRight: 10,
        }}
        source={require("../assets/icon.png")}
      />
      <Form
        initialValues={{ item: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          name="item"
          width={300}
          textInputStyle={{
            flex: 1,
            fontSize: 17,
            margin: 7,
            marginLeft: 12,
          }}
          placeholder="Search items"
          searchButton
          height={40}
        />
      </Form>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
