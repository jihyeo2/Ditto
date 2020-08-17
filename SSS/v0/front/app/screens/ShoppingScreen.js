import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import CategoryWithImageItem from "../components/CategoryWithImageItem";
import routes from "../navigation/routes";
import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";

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
  // const getListingsApi = useApi(categoriesApi.getCategories);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getListingsApi.request();
  //   }
  //   fetchData();
  // }, []);

  return (
    <FlatList
      data={listings}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.list}
      renderItem={({ item }) => (
        <CategoryWithImageItem
          item={item}
          onPress={() =>
            navigation.navigate(routes.CATEGORYSHOPPING_RESULTS, item)
          }
        />
      )}
    />
  );
}

//want to make the list scrollable? already it is

const styles = StyleSheet.create({
  list: {
    justifyContent: "space-evenly",
  },
});

export default ShoppingScreen;
