import React, { useEffect, useState } from "react";
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
  const [hasStore, setHasStore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserApi.request(token);
      console.log("dataaaaaa", data);
      if (data.store) {
        const response = await getStoresApi.request(data.store);
        setHasStore(true);
        console.log("sfgidsjdsldsijd", getStoresApi.data);
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
      <View
        style={{
          justifyContent: "center",
          marginBottom: 20,
          backgroundColor: colors.white,
        }}
      >
        <ScrollView>
          {hasStore ? (
            <>
              <AppText style={{ marginBottom: 60 }}>My Stores</AppText>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate(routes.STORESINFO_ADD)}
              >
                <Icon
                  name="plus"
                  size={60}
                  backgroundColor={colors.secondary}
                />
              </TouchableOpacity>
              <ScrollView>
                <FlatList
                  data={getStoresApi.data}
                  keyExtractor={(item) => item._id.toString()}
                  numColumns={1}
                  width="100%"
                  renderItem={({ item }) => (
                    <StorePickerItem
                      item={item}
                      onPress={() =>
                        navigation.navigate(routes.STORE_MAIN, {
                          ...getStoresApi.data,
                          editButton: true,
                        })
                      }
                    />
                  )}
                />
              </ScrollView>
            </>
          ) : (
            <View
              style={{
                minHeight: 250,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppText>You have not registered a store.</AppText>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate(routes.STORESINFO_ADD)}
              >
                <Icon
                  name="plus"
                  size={60}
                  backgroundColor={colors.secondary}
                />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
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
    right: 20,
    top: 20,
    marginBottom: 20,
  },
});

export default AccountScreen;
