import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  Texts,
  Text,
} from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import AppText from "../components/Text";

const menuItems = [
  {
    title: "모둠떡",
    icon: {
      name: "cupcake",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "쌀떡",
    icon: {
      name: "cake",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "꿀떡",
    icon: {
      name: "cake-layered",
      backgroundColor: colors.secondary,
    },
  },
];

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

function AccountScreen(props) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bgimage.jpg")}
          style={styles.imageBG}
        >
          <Text style={styles.spacer}> </Text>
          <Text style={styles.spacer}> </Text>

          <Image
            style={styles.imgFace}
            source={require("../assets/face.jpg")}
          ></Image>
        </ImageBackground>
      </View>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>

      <View style={styles.container2}>
        <Text style={styles.text}> Rice Cake House </Text>

        <Text style={styles.text}> ──────────────── </Text>
        <Text>Contact: 010-1234-5678</Text>
        <Text style={styles.text}> ──────────────── </Text>

        <View style={styles.container2}>
          <Text style={styles.text2}>
            {" "}
            Hey thisis Granpa's Rice Cake House!{" "}
          </Text>
          <Text style={styles.text2}>
            {" "}
            Come and get some sweet sweet rice cakes :D
          </Text>
        </View>
      </View>

      <View style={styles.container2}>
        <ScrollView
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <Image style={styles.image} source={logo} />
          <AppText>모둠떡</AppText>
        </View>
        <View style={styles.scrollContainer}>
          <Image style={styles.image} source={logo} />
          <AppText>꿀떡</AppText>
        </View>
        <View style={styles.scrollContainer}>
          <Image style={styles.image} source={logo} />
          <AppText>쌀떡</AppText>
        </View>
        <View style={styles.scrollContainer}>
          <Image style={styles.image} source={logo} />
          <AppText>메뉴1</AppText>
        </View>
        <View style={styles.scrollContainer}>
          <Image style={styles.image} source={logo} />
          <AppText>메뉴2</AppText>
        </View>
        <View style={styles.scrollContainer}>
          <Image style={styles.image} source={logo} />
          <AppText>메뉴3</AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
  container2: {
    marginVertical: 5,
    alignItems: "center",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },

  imageBG: {
    height: 300,
    alignContent: "flex-end",
    alignItems: "center",
  },

  imgFace: {
    width: 150,
    height: 150,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
  },

  scrollContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    padding: 15,
    justifyContent: "center",
  },

  scrollView: {
    alignContent: "space-around",
    backgroundColor: "pink",
    padding: 15,
  },

  spacer: {
    fontSize: 90,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
  text2: {
    color: "black",
    fontSize: 17,
  },
});

export default AccountScreen;
