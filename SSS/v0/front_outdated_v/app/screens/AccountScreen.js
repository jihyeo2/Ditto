import React, { useEffect, useState } from "react";
import {
  FlatList,
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

function AccountScreen({ navigation }) {
  const token = authStorage.getToken();
  const getUserApi = useApi(userApi.show);
  const [hasStore, setHasStore] = useState(false);
  const { logOut } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserApi.request(token);
      if (data.stores[0]) {
        setHasStore(true);
      }
    }
    fetchData();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
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
      </View>

      <View
        style={{
          justifyContent: "center",
          marginBottom: 20,
          backgroundColor: colors.white,
        }}
      >
        {hasStore ? (
          <ScrollView style={{ height: 350 }}>
            <FlatList
              ListHeaderComponent={
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
                </>
              }
              data={getUserApi.data.stores}
              keyExtractor={(item) => item._id.toString()}
              numColumns={1}
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
            <AppText style={{ color: colors.medium }}>
              You have not registered a store.
            </AppText>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate(routes.STORESINFO_ADD)}
            >
              <Icon name="plus" size={60} backgroundColor={colors.secondary} />
            </TouchableOpacity>
          </View>
        )}
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
