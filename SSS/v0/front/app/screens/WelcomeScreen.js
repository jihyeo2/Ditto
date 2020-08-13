import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";
import userInfoApi from "../api/userInfo";
import { Fontisto } from "@expo/vector-icons";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  const testingApi = useApi(userInfoApi.show);

  const handlePress = async () => {
    console.log("started");
    // const response = await testingApi.request(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFjMTNkZjljNWZhNjY5MDk2YTNkOTIiLCJpYXQiOjE1OTU2ODA3MjF9.ZmQZF5QOM_etCSWCMuzRIgvdCZe-mQKqnnMLB9Tut2A"
    // );
    // console.log(response);
    // console.log("ended");

    // if (!result.ok) {
    //   if (result.data) {
    //     console.log(result.data.error);
    //   } else {
    //     console.log(result);
    //   }
    //   return;
    // }
  };

  return (
    <ImageBackground
      //blurRadius={5}
      style={styles.background}
      source={require("../assets/marketwithpeople2.jpg")}
    >
      <View style={styles.logoContainer}>
        <Fontisto name="shopping-store" size={60} color="moccasin" />
        <Text style={styles.tagline}>Your Local Stores Finder</Text>
        <Text style={styles.subtagline}>Support Small Business</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
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
  // logo: {
  //   width: 100,
  //   height: 100,
  // },
  logoContainer: {
    position: "absolute",
    top: 130,
    alignItems: "center",
  },
  tagline: {
    fontSize: 29,
    fontWeight: "400",
    fontFamily: "Georgia",
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
});

export default WelcomeScreen;
