import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";

interface IProps extends PropsWithChildren {
  style?: any;
}

const CardContent = ({ children, style }: IProps) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 24 / 2,
  },
});

export default CardContent;
