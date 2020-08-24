import React from "react";
import { View, StyleSheet, Image } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function MenuItem({ title, subTitle, image }) {
  return (
    <View style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.detailsContainer}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        {subTitle && (
          <AppText style={styles.subTitle} numberOfLines={2}>
            $ {subTitle}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  detailsContainer: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontWeight: "400",
  },
  subTitle: {
    color: colors.primary,
  },
});

export default MenuItem;
