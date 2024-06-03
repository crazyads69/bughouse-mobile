import { PropsWithChildren } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../../../consts/colors";

interface IProps extends PropsWithChildren {
  style: any;
  onPress?: (event: GestureResponderEvent) => void;
  shadowType?: "light" | "dark";
}

const Card = ({ style, onPress, shadowType = "light", children }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <View style={styles.inner}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.white,
    borderRadius: 16,
  },
  inner: {
    width: "100%",
    height: "100%",
  },
});

export default Card;
