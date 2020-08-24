import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import MenuItem from "../components/lists/MenuItem";
import StoreInfoMain from "../components/StoreInfoMain";
import StoreInfoSub from "../components/StoreInfoSub";
import Icon from "../components/Icon";
import routes from "../navigation/routes";

function StoreMainScreen({ navigation, route }) {
  const item = route.params;
  console.log("well then", item);
  const { editButton } = route.params;

  const onPress = () => {
    Linking.openURL(`tel:${item.contact}`);
  };

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
          onPress={onPress}
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
