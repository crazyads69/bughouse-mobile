import { PropsWithChildren } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import COLORS from "../../../consts/colors";

interface IProps extends PropsWithChildren {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const ButtonText: React.FC<IProps> = ({ style, onPress, children }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styles.TextContent}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TextContent: {
    color: COLORS.primary,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default ButtonText;
