import React, { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import routes from "../navigation/routes";
import * as Yup from "yup";
import { AppForm as Form } from "../components/forms";
import SearchBarField from "./SearchBarField";
import SearchItemContext from "./SearchItemContext";

const validationSchema = Yup.object().shape({
  searchItem: Yup.string().label("searchItem"),
});

function Header({ navigation }) {
  const { searchItem } = useContext(SearchItemContext);

  const handleSubmit = () => {
    console.log("res", searchItem);
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
        initialValues={{ searchItem: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <SearchBarField
          name="searchItem"
          width={300}
          autoCapitalize="none"
          autoCorrect={false}
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
