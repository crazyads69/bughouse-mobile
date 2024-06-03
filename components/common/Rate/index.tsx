import { Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../consts/colors";
import { ArrayFrom, randomId } from "../../../utils";

const RateComp = ({ numStar, isDisplayText, openReport }: { numStar: number; isDisplayText?: boolean; openReport?: () => void }) => {
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {ArrayFrom(5).map((_, index) => (
            <Icon key={randomId()} name="star" size={20} color={index <= numStar ? COLORS.orange : COLORS.grey} />
          ))}
        </View>
        {isDisplayText && <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>4.0</Text>}
        {openReport && (
          <View style={{ marginLeft: "auto" }}>
            <Button mode="contained" onPress={openReport}>
              Báo cáo
            </Button>
          </View>
        )}
      </View>
    </>
  );
};

export default RateComp;
