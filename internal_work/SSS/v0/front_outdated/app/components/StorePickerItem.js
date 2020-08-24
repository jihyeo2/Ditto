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
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            <View>
              <AppText style={{ color: colors.white }}>{item.name}</AppText>
              <AppText style={{ fontSize: 12, color: colors.white }}>
                {item.location}
              </AppText>
              <AppText style={{ fontSize: 12, color: colors.white }}>
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
    padding: 10,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  store: {
    width: "90%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  label: {
    marginTop: 5,
    fontSize: 17,
    textAlign: "center",
  },
  content: {
    width: "100%",
    height: "45%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
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
    backgroundColor: colors.black,
    opacity: 0.5,
    width: "100%",
    height: "45%",
    position: "absolute",
    bottom: 0,
  },
  owner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default StorePickerItem;
