import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import FavoriteButton from "../Button/FavoriteButton";

interface IProps {
  style?: any;
  active?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const CardFavoriteIcon = (props: IProps) => {
  const { style, active = false, onPress } = props;

  return (
    <FavoriteButton
      style={[styles.icon, style]}
      active={active}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
});

export default CardFavoriteIcon;
