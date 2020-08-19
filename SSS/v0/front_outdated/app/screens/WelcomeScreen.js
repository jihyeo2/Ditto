import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import { Fontisto } from "@expo/vector-icons";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      // blurRadius={5}
      style={styles.background}
      source={require("../assets/marketwithpeople2.jpg")}
    >
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => navigation.navigate(routes.APP)}
        >
          <Icon name="close" />
        </TouchableOpacity>
        <Fontisto name="shopping-store" size={60} color="moccasin" />
        <Text style={styles.tagline}>Your Local Stores Finder</Text>
        <Text style={styles.subtagline}>Support Small Business</Text>
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
    top: 30,
    alignItems: "center",
  },
  tagline: {
    fontSize: 29,
    fontWeight: "400",
    letterSpacing: 0.5,
    paddingTop: 45,
    color: colors.white,
    textShadowColor: colors.black,
    textShadowRadius: 5,
  },
  subtagline: {
    fontSize: 17,
    fontWeight: "300",
    color: colors.white,
    paddingTop: 18,
    textTransform: "uppercase",
    letterSpacing: 5,
    textAlign: "center",
  },
  close: {
    alignSelf: "flex-end",
    marginBottom: 40,
    marginLeft: "85%",
  },
});

export default WelcomeScreen;
