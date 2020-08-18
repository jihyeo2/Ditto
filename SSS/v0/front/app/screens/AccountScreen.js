import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import userApi from "../api/userInfo";
import authStorage from "../auth/storage";
import storesApi from "../api/stores";
import StorePickerItem from "../components/StorePickerItem";
import AppText from "../components/AppText";

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  console.log("user in account page", user);

  const token = authStorage.getToken();
  const getUserApi = useApi(userApi.show);
  const getStoresApi = useApi(storesApi.getStoresById);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserApi.request(token);
      if (data.store._id) {
        response = await getStoresApi.request(data.store._id);
      }
    }
    fetchData();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {user.profileImage ? (
          <ListItem
            title={user.name}
            subTitle={user.email}
            image={{ uri: user.profileImage }}
          />
        ) : (
          <ListItem
            title={user.name}
            subTitle={user.email}
            IconComponent={
              <MaterialCommunityIcons name="account-circle-outline" size={50} />
            }
          />
        )}
      </View>
      <ScrollView
        style={{
          backgroundColor: colors.white,
          marginBottom: 20,
        }}
      >
        {getStoresApi.data ? (
          <>
            <AppText style={{ marginBottom: 60 }}>My Stores</AppText>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate(routes.STORESINFO_EDIT)}
            >
              <Icon name="plus" size={60} backgroundColor={colors.secondary} />
            </TouchableOpacity>
            <ScrollView>
              <StorePickerItem
                item={getStoresApi.data}
                onPress={() =>
                  navigation.navigate(routes.STORE_MAIN, getStoresApi.data)
                }
              />
            </ScrollView>
          </>
        ) : (
          <AppText color={colors.medium}>
            You have not registered a store.
          </AppText>
        )}
      </ScrollView>
      <ListItem
        title="Log out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    paddingVertical: 10,
  },
  container: {
    marginVertical: 20,
  },
  addButton: {
    position: "absolute",
    right: 10,
    top: 10,
    marginBottom: 20,
  },
});

export default AccountScreen;
