import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
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
      {/* <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          marginLeft: 17,
          marginRight: 10,
        }}
        source={require("../assets/icon.png")}
      /> */}
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
          textInputStyle={{
            flex: 1,
            fontSize: 15,
            marginLeft: 15,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
