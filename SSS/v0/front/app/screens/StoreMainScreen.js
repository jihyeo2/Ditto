import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import MenuItem from "../components/lists/MenuItem";
import StoreInfoMain from "../components/StoreInfoMain";
import StoreInfoSub from "../components/StoreInfoSub";
import Icon from "../components/Icon";
import routes from "../navigation/routes";

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

function StoreMainScreen({ navigation, route }) {
  const item = route.params;
  console.log("well then", item);
  const { editButton } = route.params;
  return (
    <Screen style={styles.screen}>
      {editButton ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(routes.STORESINFO_ADD, item)}
        >
          <Icon
            name="lead-pencil"
            size={60}
            backgroundColor={colors.secondary}
          />
        </TouchableOpacity>
      ) : null}
      <ScrollView>
        <StoreInfoMain
          backImage={item.backgroundImage}
          frontImage={item.mainImage}
          title={item.name}
          subtitle={item.description}
        />
        <StoreInfoSub
          address={item.location}
          phone={item.contact}
          hour={item.openingHours}
          delivery={item.delivery}
        />
        <View style={styles.menuContainter}>
          <Text style={styles.heading}>Menu/Item</Text>
          <FlatList
            data={item.menus}
            keyExtractor={(item) => item.name}
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
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 20,
    zIndex: 1,
  },
  screen: {
    backgroundColor: colors.light,
  },
  menuContainter: {
    backgroundColor: colors.white,
  },
  heading: {
    fontWeight: "400",
    fontSize: 20,
    // fontFamily: "Georgia",
    padding: 15,
  },
});

export default StoreMainScreen;
