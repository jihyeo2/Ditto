import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Notifications } from "expo";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import useApi from "../hooks/useApi";
import messagesApi from "../api/messages";
import authStorage from "../auth/storage";

function MessagesScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const token = authStorage.getToken();
  const getMessagesApi = useApi(messagesApi.get);
  const discardMessagesApi = useApi(messagesApi.discard);

  useEffect(() => {
    const response = getMessagesApi.request(token);
  }, []);

  const handleDelete = (message) => {
    const response = discardMessagesApi.request(message._id);
    const res = getMessagesApi.request(token);
  };

  return (
    <Screen>
      <FlatList
        data={getMessagesApi.data}
        keyExtractor={(message) => message._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.body}
            image={require("../assets/dittoBlack.png")}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
            showChevrons={true}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          const response = getMessagesApi.request(token);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
