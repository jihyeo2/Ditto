import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import userApi from "../api/users";
import authStorage from "../auth/storage";
import StorePickerItem from "../components/StorePickerItem";
import AppText from "../components/AppText";
import useAuth from "../auth/useAuth";
import ListItemSeparator from "../components/lists/ListItemSeparator";

function AccountScreen({ navigation }) {
  const token = authStorage.getToken();
  const getUserApi = useApi(userApi.show);
  const { logOut } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await getUserApi.request(token);
      const response1 = await getUserApi.request(token);
    }
    fetchData();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <AppText
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: 15,
            marginBottom: 10,
          }}
        >
          My Account
        </AppText>
        {getUserApi.data.profileImage ? (
          <ListItem
            title={getUserApi.data.name}
            subTitle={getUserApi.data.email}
            image={{ uri: getUserApi.data.profileImage }}
            showChevrons
            onPress={() =>
              navigation.navigate(routes.ACCOUNTEDIT, getUserApi.data)
            }
          />
        ) : (
          <ListItem
            title={getUserApi.data.name}
            subTitle={getUserApi.data.email}
            IconComponent={
              <MaterialCommunityIcons name="account-circle-outline" size={50} />
            }
            showChevrons
            onPress={() =>
              navigation.navigate(routes.ACCOUNTEDIT, getUserApi.data)
            }
          />
        )}
        <ListItemSeparator />
        <ListItem
          title="Stores In Need"
          IconComponent={<Icon name="store" backgroundColor={colors.primary} />}
          onPress={() => navigation.navigate(routes.STORES_IN_NEED)}
          showChevrons={false}
        />
        <ListItemSeparator />
        <ListItem
          title="My Messages"
          IconComponent={
            <Icon name="message" backgroundColor={colors.secondary} />
          }
          onPress={() => navigation.navigate(routes.MESSAGES)}
          showChevrons={false}
        />
        <ListItemSeparator />
        <ListItem
          title="Log out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
          showChevrons={false}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          backgroundColor: colors.white,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: 15,
              marginLeft: 15,
              marginBottom: 10,
            }}
          >
            My Stores
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate(routes.STORESINFO_ADD)}
          >
            <Icon name="plus" size={40} backgroundColor={colors.secondary} />
          </TouchableOpacity>
        </View>
        {getUserApi.data.stores && getUserApi.data.stores.length > 0 ? (
          <ScrollView style={{ height: "32%" }}>
            <FlatList
              data={getUserApi.data.stores}
              keyExtractor={(item) => item._id.toString()}
              width="100%"
              renderItem={({ item }) => (
                <StorePickerItem
                  item={item}
                  onPress={() =>
                    navigation.navigate(routes.STORE_MAIN, {
                      ...item,
                      editButton: true,
                    })
                  }
                />
              )}
            />
          </ScrollView>
        ) : (
          <View
            style={{
              minHeight: 250,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppText style={{ color: "gray" }}>
              You haven't registered a store yet!
            </AppText>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginBottom: 15,
  },
  addButton: {
    position: "absolute",
    right: 15,
    top: 10,
    marginBottom: 5,
  },
});

export default AccountScreen;
