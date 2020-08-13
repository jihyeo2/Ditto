import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import routes from "../navigation/routes";
import categoriesApi from "../api/categories";
import ShoppingScreenItem from "../components/ShoppingScreenItem";
import SearchButton from "../components/forms/SearchButton";
import colors from "../config/colors";

const listings = [
  {
    id: "1",
    title: "Restaurant",
    image: require("../assets/restaurant.jpg"),
  },
  {
    id: "2",
    title: "Grocery Store",
    image: require("../assets/grocery.jpg"),
  },
  {
    id: "3",
    title: "Coffee & Dessert",
    image: require("../assets/coffee.jpg"),
  },
  {
    id: "4",
    title: "Clothing Store",
    image: require("../assets/cloth.jpg"),
  },
  {
    id: "5",
    title: "Bar",
    image: require("../assets/bar.jpg"),
  },
  {
    id: "7",
    title: "Outside Market",
    image: require("../assets/market.png"),
  },
  {
    id: "8",
    title: "Beauty Salon/Barbershop",
    image: require("../assets/barber.jpg"),
  },
  {
    id: "6",
    title: "Others",
    image: require("../assets/other.jpg"),
  },
];

function ShoppingScreen({ navigation }) {
  const getListingsApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    async function fetchData() {
      const response = await getListingsApi.request();
    }
    fetchData();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.list}
          //width="100%"
          renderItem={({ item }) => (
            <ShoppingScreenItem
              title={item.title}
              image={item.image}
              onPress={() =>
                navigation.navigate(routes.CATEGORY_SHOPPING, item)
              }
            />
          )}
        />
      </View>
    </Screen>
  );
}

//want to make the list scrollable? already it is

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  screen: {
    backgroundColor: "gainsboro",
  },
  list: {
    justifyContent: "space-evenly",
  },
});

export default ShoppingScreen;
