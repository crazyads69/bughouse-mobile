import { Text, View } from "react-native";

interface IProps {
  label: string;
  value: string;
  highlight?: "active" | "unactive" | "normal";
  width?: string;
}

const RoomDetailInfo: React.FC<IProps> = ({
  label,
  value,
  highlight = "normal",
  width = "33%",
}) => {
  const colorValue =
    highlight === "active"
      ? "#1EDB4C"
      : highlight === "unactive"
      ? "#DB1E1E"
      : "#333333";

  return (
    <View style={{ width: width, marginVertical: 10, paddingHorizontal: 10 }}>
      <Text
        style={{ fontSize: 10, fontWeight: "600", textTransform: "uppercase" }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: colorValue,
          fontWeight: highlight != "normal" ? "bold" : "normal",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default RoomDetailInfo;
