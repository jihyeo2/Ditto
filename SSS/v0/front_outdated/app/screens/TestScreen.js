import React, { useEffect } from "react";
import { Text, FlatList } from "react-native";
import catApi from "../api/categories";
import useApi from "../hooks/useApi";

function TestScreen(props) {
  const getListingsApi = useApi(catApi.getCategories);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <FlatList
      data={getListingsApi.data}
      keyExtractor={(item) => item._id.toString()}
      numColumns={2}
      width="100%"
      renderItem={({ item }) => <Text>{item.label}</Text>}
    />
  );
}

export default TestScreen;
