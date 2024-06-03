import { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

interface IProps extends PropsWithChildren {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<IProps> = ({ style, onPress, children, disabled = false, loading = false }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <View style={styles.middle}>
        <Text style={styles.TextContent}>{children}</Text>
        {loading && <ActivityIndicator style={styles.marginHori} animating={true} color={MD2Colors.white} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TextContent: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },

  middle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  marginHori: {
    marginHorizontal: 10,
  },
});

export default Button;
