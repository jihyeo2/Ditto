import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import { Fontisto } from "@expo/vector-icons";

import colors from "../config/colors";
import { color } from "react-native-reanimated";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      // blurRadius={5}
      style={styles.background}
      source={require("../assets/marketwithpeople2.jpg")}
    >
      <View style={styles.logoContainer}>
        <Fontisto name="shopping-store" size={60} color={colors.third} />
        <Text style={styles.tagline}>Ditto</Text>
        <Text style={styles.subtagline}>Your Local Stores Finder</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
        <TouchableOpacity
          style={styles.close}
          onPress={() => navigation.navigate(routes.APP)}
        >
          <Text
            style={{ color: colors.third, textDecorationLine: "underline" }}
          >
            I'll register next time.
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },
  tagline: {
    fontSize: 40,
    fontWeight: "500",
    fontFamily: Platform.OS === "android" ? "sans-serif-thin" : "Georgia",
    fontStyle: "italic",
    letterSpacing: 0.5,
    paddingTop: 45,
    color: colors.white,
    textShadowColor: colors.black,
    textShadowRadius: 8,
  },
  subtagline: {
    fontSize: 17,
    fontWeight: "300",
    color: colors.white,
    paddingTop: 15,
    textTransform: "uppercase",
    letterSpacing: 3,
    textAlign: "center",
    textShadowColor: colors.black,
    textShadowRadius: 5,
  },
  close: {
    alignSelf: "center",
    margin: 15,
  },
});

export default WelcomeScreen;
