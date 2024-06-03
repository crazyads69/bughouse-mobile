import { useQuery } from "@tanstack/react-query";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { roomApi } from "../../api/roomApi";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import SavedScreen from "../Home/SavedScreen";

const RoomRented = () => {
  const { data: listForRent, isLoading } = useQuery({
    queryKey: ["getRoomRented"],
    queryFn: () => roomApi.getRoomrented(),
    refetchOnWindowFocus: false,
  });

  return (
    <SafeAreaView>
      <MainHeader title="Phòng đã thuê" />

      {isLoading && (
        <View style={styles.styledLoadingWrap}>
          <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
        </View>
      )}
      {!isLoading && listForRent && listForRent.data && listForRent.data.items.length > 0 && (
        <FlatList
          style={{ paddingHorizontal: 20 }}
          data={listForRent?.data.items}
          renderItem={({ item }) => <SavedScreen.RoomCard roomData={item.room} />}
        />
      )}

      {!isLoading && listForRent?.data && listForRent.data.items.length === 0 && (
        <View style={styles.styledLoadingWrap}>
          <Text>Bạn chưa thuê phòng nào.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoomRented;

const styles = StyleSheet.create({
  styledLoadingWrap: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
