import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://192.168.219.131/api",
  },
  staging: {
    apiUrl: "https://de-tout.herokuapp.com/api",
  },
  prod: {
    apiUrl: "https://de-tout.herokuapp.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
