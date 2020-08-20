import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";

function StorePickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.store} onPress={onPress}>
        <ImageBackground
          style={styles.image}
          source={{ uri: item.backgroundImage }}
        >
          <View style={styles.content}>
            <Image style={styles.owner} source={{ uri: item.mainImage }} />
            <View style={{ left: "7%", top: "3%" }}>
              <AppText
                style={{
                  fontSize: 20,
                  color: colors.dark,
                  fontWeight: "500",
                }}
                numberOfLines={1}
              >
                {item.name}
              </AppText>

              <AppText style={{ fontSize: 13, color: colors.primary }}>
                {item.category.label}
              </AppText>
              <AppText style={{ fontSize: 13, color: colors.medium }}>
                {item.contact}
              </AppText>
            </View>
          </View>
          <View style={styles.box}></View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    marginBottom: 15,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
  },
  store: {
    width: "95%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  content: {
    width: "100%",
    height: "45%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: colors.white,
    opacity: 0.75,
    width: "100%",
    height: "35%",
    position: "absolute",
    bottom: 0,
  },
  owner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: colors.white,
    borderWidth: 5,
    bottom: "5%",
    left: "5%",
    margin: 10,
  },
});

export default StorePickerItem;
