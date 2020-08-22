import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  Fontisto,
} from "@expo/vector-icons";

import Icon from "../components/Icon";
import AppText from "../components/AppText";
import colors from "../config/colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

function CategoryPickerItem({ item, onPress }) {
  let IconComponent = null;
  switch (item.imageUri) {
    case 0:
      IconComponent = (
        <MaterialIcons name="restaurant" size={50} color="silver" />
      );
      break;
    case 1:
      IconComponent = (
        <FontAwesome5 name="carrot" size={50} color={colors.secondary} />
      );
      break;
    case 2:
      IconComponent = <FontAwesome name="coffee" size={50} color="navy" />;
      break;
    case 3:
      IconComponent = <FontAwesome5 name="tshirt" size={50} color="red" />;
      break;
    case 4:
      IconComponent = <Fontisto name="cocktail" size={50} color="lime" />;
      break;
    case 5:
      IconComponent = (
        <MaterialIcons name="local-mall" size={50} color="purple" />
      );
      break;
    case 6:
      IconComponent = <Fontisto name="scissors" size={50} />;
      break;
    case 7:
      IconComponent = <Fontisto name="quote-right" size={40} color="yellow" />;
      break;
    default:
      break;
  }
  return (
    <TouchableOpacity style={styles.category} onPress={onPress}>
      {/* <Icon
          backgroundColor={colors.white}
          name={item.icon}
          size={50}
          iconColor={colors.black}
        /> */}
      {IconComponent}
      <AppText style={styles.label}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  category: {
    borderColor: colors.black,
    borderWidth: 2,
    height: screenHeight / 5.5,
    width: screenWidth / 2.5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: screenWidth / 30,
  },
  label: {
    marginTop: 5,
    fontSize: 17,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
