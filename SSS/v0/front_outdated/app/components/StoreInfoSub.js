import React from "react";
import { StyleSheet, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import ListItem from "./lists/ListItem";
import ListItemSeparator from "./lists/ListItemSeparator";

function StoreInfoSub({ address, phone, hour }) {
  return (
    <View style={styles.container}>
      <ListItem
        IconComponent={
          <SimpleLineIcons
            name="location-pin"
            size={24}
            color={colors.primary}
          />
        }
        title={address}
        showChevrons={false}
      />
      <ListItemSeparator />
      <ListItem
        IconComponent={
          <SimpleLineIcons name="phone" size={24} color={colors.secondary} />
        }
        title={phone}
        showChevrons={false}
      />
      <ListItemSeparator />
      <ListItem
        IconComponent={
          <SimpleLineIcons name="clock" size={24} color={colors.third} />
        }
        title={hour}
        showChevrons={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: 15,
  },
});

export default StoreInfoSub;
