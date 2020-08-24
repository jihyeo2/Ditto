import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import * as ImagePickerAlternative from "react-native-image-picker";

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import ErrorMessage from "../components/forms/ErrorMessage";
import colors from "../config/colors";

function AnImageInput({
  name,
  width = 150,
  height = 150,
  borderWidth = 0,
  borderColor = colors.black,
  borderRadius = 15,
}) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const imageUri = values[name];

  useEffect(() => {
    requestPermissionForCamera();
    requestPermissionForLibrary();
  }, []);

  const requestPermissionForLibrary = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  const requestPermissionForCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the camera");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert(
        "Delete",
        "Are you sure you want to delete this?",
        [
          { text: "Yes", onPress: () => setFieldValue(name, null) },
          { text: "No" },
        ],
        { cancelable: true, onDismiss: () => {} }
      );
  };

  const selectImage = async () => {
    Alert.alert(
      "Choose a picture",
      "Do you want to access camera or your library?",
      [
        { text: "Camera", onPress: () => imageFromCamera() },
        { text: "Library", onPress: () => imageFromLibrary() },
      ],
      { cancelable: true, onDismiss: () => {} }
    );
  };

  const imageFromCamera = async () => {
    try {
      const result = await ImagePickerAlternative.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        console.log(result.uri);
        setFieldValue(name, result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const imageFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        console.log(result.uri);
        setFieldValue(name, result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const errorMessage = `${name} is a required field`;

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={[
            styles.container,
            { width },
            { height },
            { borderWidth },
            { borderColor },
            { borderRadius },
          ]}
        >
          {!imageUri && (
            <View style={styles.pic}>
              <MaterialCommunityIcons
                name="camera"
                size={40}
                color={defaultStyles.colors.medium}
              />
              <AppText style={{ color: defaultStyles.colors.medium }}>
                {name}
              </AppText>
            </View>
          )}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
      </TouchableWithoutFeedback>
      {errors[name] ? (
        <ErrorMessage error={errorMessage} visible={touched[name]} />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 5,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pic: {
    alignItems: "center",
  },
});

export default AnImageInput;
