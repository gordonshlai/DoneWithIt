import React from "react";
import { StyleSheet } from "react-native";
import Text from "../Text";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) return null;
  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorMessage;
