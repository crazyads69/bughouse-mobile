import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainHeader = ({ title }: { title: string }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { marginTop: Platform.OS === "android" ? insets.top : 0 },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainHeader;
