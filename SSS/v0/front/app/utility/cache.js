import AsyncStorage from "@react-native-community/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
  console.log("storing token called");
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JOSN.stringify(item));
    console.log("storing token ended");
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
