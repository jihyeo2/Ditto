import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";
import AppButton from "./AppButton";
import authStorage from "../auth/storage";
import useApi from "../hooks/useApi";
import userInfoApi from "../api/users";
import storeApi from "../api/storesInNeed";

function StoreIntroCard({ store }) {
  const [signed, setSigned] = useState(false);

  let user = null;
  let authToken = null;
  useEffect(() => {
    async function fetchData() {
      authToken = authStorage.getToken();
      const { data } = await userInfoApi.show(authToken);
      user = data;
      store.users.forEach((user1) => {
        if (user1._id === user._id) setSigned(true);
      });
    }
    fetchData();
  }, []);

  const signUpApi = useApi(storeApi.signUp);
  const handlePressSignUp = () => {
    const response = signUpApi.request(authToken, { signUp: true }, store._id);
    setSigned(true);
  };

  const handlePressCancel = () => {
    const response = signUpApi.request(authToken, { signUp: false }, store._id);
    setSigned(false);
  };

  return (
    <View style={styles.bubble}>
      <View style={styles.textContainer}>
        <AppText style={{ fontSize: 25 }}>{store.name}</AppText>
        <AppText style={{ fontSize: 17, color: colors.secondary }}>
          {store.category.label}
        </AppText>
      </View>
      <View style={styles.optionsContainer}>
        <View>
          <AppText style={{ color: colors.primary }}>{store.contact}</AppText>
          <AppText>{store.location}</AppText>
        </View>
        {signed ? (
          <View style={styles.signUp}>
            <AppButton
              title="Cancel"
              color="third"
              fontSize={15}
              padding={10}
              onPress={handlePressCancel}
            />
          </View>
        ) : (
          <View style={styles.signUp}>
            <AppButton
              title="Sign Up"
              color="third"
              fontSize={15}
              padding={10}
              onPress={handlePressSignUp}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.call}
          onPress={() => Linking.openURL(`tel:${store.contact}`)}
        >
          <Icon
            name="call"
            size={45}
            backgroundColor={"brown"}
            type="MaterialIcons"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: "center",
    margin: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  call: {
    padding: 5,
    alignSelf: "baseline",
    marginRight: -5,
  },
  signUp: {
    marginLeft: "20%",
    alignSelf: "baseline",
  },
});

export default StoreIntroCard;
