import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";
import userInfoApi from "../api/userInfo";

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
      blurRadius={5}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("./../assets/logo-red.png")}
        />
        <Text style={styles.tagline}>Sell What You Don't Need</Text>
      </View>
      <AppButton title="say hi" onPress={handlePress} />
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
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
