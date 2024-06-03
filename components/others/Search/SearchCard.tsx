import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../../consts/colors";
import { SIZES } from "../../../consts/sizes";
import Card from "../../common/Card/Card";
import CardContent from "../../common/Card/CardContent";
import CardFavoriteIcon from "../../common/Card/CardFavoriteIcon";
import CardMedia from "../../common/Card/CardMedia";

const SearchCard = ({ item, index }: { item: any; index: number }) => {
  console.log("🚀 ~ file: SearchCard.tsx:10 ~ SearchCard ~ item:", item);
  const navigation = useNavigation();
  const even = index % 2 === 0;
  return (
    <Card
      style={{
        width: "100%",
        height: index % 3 === 0 ? 180 : 240,
      }}
    >
      <CardFavoriteIcon onPress={() => {}} />
      <View style={styles.media}>
        <CardMedia source={item.image} borderBottomRadius />
      </View>
      <CardContent>
        <View style={styles.titleBox}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.body,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: 4,
  },
  location: {
    fontSize: SIZES.body,
    color: COLORS.grey,
  },
});

export default SearchCard;
