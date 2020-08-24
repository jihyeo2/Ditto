import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";

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
    <ScrollView style={styles.container}>
      <AppText
        style={{
          fontSize: 27,
          fontWeight: "bold",
          marginVertical: 10,
          marginLeft: 12,
        }}
      >
        Stores looking for help
      </AppText>
      {getStoresInNeedApi.data[0] ? (
        <FlatList
          data={getStoresInNeedApi.data}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
          width="95%"
          renderItem={({ item }) => <StoreIntroCard store={item} />}
          style={{ alignSelf: "center" }}
        />
      ) : (
        <AppText style={{ color: colors.medium, alignSelf: "center" }}>
          No one is looking for help yet.
        </AppText>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default StoresInNeedScreen;
