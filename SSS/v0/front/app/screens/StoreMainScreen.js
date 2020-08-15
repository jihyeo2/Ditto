import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import MenuItem from "../components/lists/MenuItem";

import StoreInfoMain from "../components/StoreInfoMain";
import StoreInfoSub from "../components/StoreInfoSub";
import { ScrollView } from "react-native";

const store = [
  {
    //id: "1",
    backImage: require("../assets/marketwithpeople.jpg"),
    frontImage: require("../assets/mosh.jpg"),
    title: "Beautiful Shop",
    subtitle:
      "The most beautiful shop in town! Even better than the Pretty Shop! Another placeholder!",
    //maximum subtitle word count: 85 characters (2 lines)
    address: "Baker St. 211 Rm B.",
    phone: "010-5236-8567",
    hour: "9:00 ~ 20:00",
  },
];

//메뉴를 store[]에 포함시키면 스크롤이 안됨.ㅠㅠㅠ
const menu = [
  {
    id: "1",
    name: "Menu One",
    price: "$100",
    image: require("../assets/ricecake.jpeg"),
  },
  {
    id: "2",
    name: "Menu Two",
    price: "$10.8",
    image: require("../assets/restaurant.jpg"),
  },
  {
    id: "3",
    name: "Menu Three",
    price: "$53.2",
    image: require("../assets/coffee.jpg"),
  },
];

function ShopMainScreen(props) {
  return (
    <ScrollView>
      <Screen style={styles.screen}>
        <StoreInfoMain
          backImage={store[0].backImage}
          frontImage={store[0].frontImage}
          title={store[0].title}
          subtitle={store[0].subtitle}
        />
        <StoreInfoSub
          address={store[0].address}
          phone={store[0].phone}
          hour={store[0].hour}
        />
        <View style={styles.menuContainter}>
          <Text style={styles.heading}>Menu/Item</Text>
          <FlatList
            data={menu}
            keyExtractor={(menu) => menu.id.toString()}
            renderItem={({ item }) => (
              <MenuItem
                title={item.name}
                subTitle={item.price}
                image={item.image}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  menuContainter: {
    backgroundColor: colors.white,
  },
  heading: {
    fontWeight: "400",
    fontSize: 20,
    fontFamily: "Georgia",
    padding: 15,
  },
});

export default ShopMainScreen;
