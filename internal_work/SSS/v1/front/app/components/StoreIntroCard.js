import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";

function StoreIntroCard({ store }) {
  return (
    <View style={styles.bubble}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <AppText style={{ fontSize: 25 }}>{store.name}</AppText>
          <AppText style={{ fontSize: 17, color: colors.primary }}>
            {store.category.label}
          </AppText>
        </View>
        <View style={styles.optionsContainer}>
          <View>
            <AppText>{store.contact}</AppText>
            <AppText>{store.location}</AppText>
          </View>
          <TouchableOpacity
            style={styles.options}
            onPress={() => Linking.openURL(`tel:${store.contact}`)}
          >
            <Icon
              name="call"
              size={45}
              backgroundColor={"brown"}
              type="MaterialIcons"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.light,
    borderRadius: 20,
    margin: 5,
    padding: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  options: {
    padding: 5,
    alignSelf: "flex-end",
  },
});

export default StoreIntroCard;
