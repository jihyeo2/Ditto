import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import MenuItem from "../components/lists/MenuItem";
import StoreInfoMain from "../components/StoreInfoMain";
import StoreInfoSub from "../components/StoreInfoSub";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import storesApi from "../api/stores";
import authStorage from "../auth/storage";

function StoreMainScreen({ navigation, route }) {
  const item = route.params;
  console.log("well then", item);
  const { editButton } = route.params;

  let authToken = null;
  useEffect(() => {
    async function fetchData() {
      authToken = authStorage.getToken();
    }
    fetchData();
  }, []);

  const deleteStoresApi = useApi(storesApi.deleteStores);

  const onPress = () => {
    Linking.openURL(`tel:${item.contact}`);
  };

  const handlePress = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this store?",
      [
        {
          text: "Yes",
          onPress: async () => {
            const reponse = await deleteStoresApi.request(authToken, item._id);
            navigation.navigate(routes.MYACCOUNT);
          },
        },
        { text: "No" },
      ],
      { cancelable: true, onDismiss: () => {} }
    );
  };

  return (
    <Screen style={styles.screen}>
      {editButton ? (
        <>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => navigation.navigate(routes.STORESINFO_ADD, item)}
          >
            <Icon
              name="lead-pencil"
              size={60}
              backgroundColor={colors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.delete} onPress={handlePress}>
            <Icon name="trash-can" size={60} backgroundColor={colors.primary} />
          </TouchableOpacity>
        </>
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
  edit: {
    position: "absolute",
    right: 100,
    bottom: 20,
    zIndex: 1,
  },
  delete: {
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
