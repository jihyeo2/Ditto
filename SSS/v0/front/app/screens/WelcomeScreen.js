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
import routes from "../navigation/routes";
import { Fontisto } from "@expo/vector-icons";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/marketwithpeople2.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/dittoClear.png")}
        />
        <Text style={styles.tagline}>Ditto</Text>
        <Text style={styles.subtagline}>
          Discover & Advertise Hidden Local Stores
        </Text>
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
  logo: {
    top: 50,
    height: 80,
    width: 80,
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    alignItems: "center",
  },
  tagline: {
    fontSize: 40,
    fontWeight: "500",
    fontFamily: Platform.OS === "android" ? "sans-serif" : "Georgia",
    fontStyle: "italic",
    letterSpacing: 1.5,
    paddingTop: 80,
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
    letterSpacing: 7,
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
