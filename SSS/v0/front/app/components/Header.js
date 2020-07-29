import React from "react";
import { View, Image, StyleSheet } from "react-native";
import AppTextInput from "../components/AppTextInput";
import routes from "../navigation/routes";

function Header({ navigation }) {
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
      <AppTextInput
        placeholder="Search items"
        textInputStyle={{
          flex: 1,
          fontSize: 17,
          margin: 7,
          marginLeft: 12,
        }}
        clickButton
        width={300}
        height={40}
        onPress={() => navigation.navigate(routes.SEARCH_RESULTS)}
      />
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
