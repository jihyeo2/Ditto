import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import StoreIntroCard from "../components/StoreIntroCard";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import storesApi from "../api/storesInNeed";
import colors from "../config/colors";

function StoresInNeedScreen(props) {
  const getStoresInNeedApi = useApi(storesApi.getStoresInNeed);

  const fetchData = async () => {
    const response = await getStoresInNeedApi.request();
    console.log("getblabla", getStoresInNeedApi.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Screen>
      <AppText>Stores looking for help</AppText>
      {getStoresInNeedApi.data[0] ? (
        <FlatList
          data={getStoresInNeedApi.data}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
          width="100%"
          renderItem={({ item }) => <StoreIntroCard store={item} />}
        />
      ) : (
        <AppText style={{ color: colors.medium }}>
          No one is looking for help yet.
        </AppText>
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});

export default StoresInNeedScreen;
