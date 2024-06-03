import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../../consts/colors";
import { SIZES } from "../../../consts/sizes";

interface IProps {
  style: any;
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const FavoriteButton = ({ active, style, onPress }: IProps) => {
  return (
    <Ionicons
      // containerStyle={style}
      // viewStyle={styles.view}
      onPress={onPress}
      name={active ? "heart" : "heart-outline"}
      size={24}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.white,
    padding: 4,
    borderRadius: SIZES.radius,
  },
});

export default FavoriteButton;
