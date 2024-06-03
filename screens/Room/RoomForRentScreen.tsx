import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { roomApi } from "../../api/roomApi";
import { userApi } from "../../api/userApi";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import { room } from "../../models/room";
import { convertMoneyToVndText } from "../../utils/money";
import { getCurrentDate } from "../../utils/time";

const RoomForRentScreen = () => {
  const { data: listForRent, isLoading } = useQuery({
    queryKey: ["getRoomForRent"],
    queryFn: () => roomApi.getRoomForRent(),
    refetchOnWindowFocus: false,
  });

  const { data: dataRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["getAllRequestsCancelRoom"],
    queryFn: () => userApi.getAllRequest(),
  });

  const ObjectCancelRequest = dataRequests?.data
    .map((item) => {
      const key = item.roomId;
      const value = item.requestId;
      return item.type === "CANCEL_RENTAL"
        ? {
            [key]: value,
          }
        : null;
    })
    .reduce(function (result, item) {
      if (!item || !result) return result;
      var key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

  return (
    <SafeAreaView>
      <MainHeader title="Phòng cho thuê" />

      {isLoading && (
        <View style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
        </View>
      )}
      {!isLoading && listForRent && listForRent.data && listForRent.data.items.length > 0 && (
        <FlatList
          style={{ paddingHorizontal: 20 }}
          data={listForRent?.data.items}
          renderItem={({ item }) => <RoomForRentScreen.RoomItem ObjectCancelRequest={ObjectCancelRequest} roomData={item.room} />}
          keyExtractor={(item) => item.room._id}
        />
      )}

      {!isLoading && listForRent?.data && listForRent.data.items.length === 0 && (
        <View style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Text>Bạn chưa cho thuê phòng nào.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

RoomForRentScreen.RoomItem = ({
  roomData,
  isFavoritePage = false,
  ObjectCancelRequest,
}: {
  roomData?: room | undefined | null;
  isFavoritePage?: boolean;
  ObjectCancelRequest?: any;
}) => {
  if (!roomData) return <View></View>;
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const { mutate: mutateAcceptCancel, isLoading: loadingAcceptCancel } = useMutation({
    mutationFn: userApi.doAcceptCancelRent,
    mutationKey: ["handleAcceptContract"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRoomForRent"] });
      queryClient.invalidateQueries({ queryKey: ["getAllRequestsCancelRoom"] });
    },
  });

  const handleAcceptCancel = () => {
    if (roomData) mutateAcceptCancel(ObjectCancelRequest[roomData._id]);
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <View style={style.StyledWrapRoom}>
        <Image
          style={style.StyledImageRoom}
          source={{
            uri:
              roomData?.roomAttachment?.url?.[0] ||
              "https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1",
          }}
        />
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <Text style={style.StyledHeading}>{roomData?.name || "upading..."}</Text>
        {roomData?.status === "already-rent" && (
          <Menu style={{ paddingHorizontal: 20 }}>
            <MenuTrigger text="..." />
            <MenuOptions>
              <MenuOption
                text="Xem hợp đồng"
                onSelect={() => navigation.navigate("ContractScreen" as never, { item: roomData, isSign: true } as never)}
              />

              {ObjectCancelRequest?.[roomData?._id] && (
                <MenuOption text={loadingAcceptCancel ? "Loading..." : "Chấp nhận yêu cầu huỷ"} onSelect={() => handleAcceptCancel()} />
              )}

              {(roomData.demandAt === 0 || roomData.demandAt === getCurrentDate().month) && (
                <MenuOption text="Khai báo dịch vụ" onSelect={() => navigation.navigate("RoomDeclaration" as never, roomData._id as never)} />
              )}
            </MenuOptions>
          </Menu>
        )}
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <Text style={{ color: COLORS.primary, fontWeight: "500", fontSize: 14 }}>{convertMoneyToVndText(roomData.basePrice)} / người</Text>

        {roomData?.status === "available" && <Text style={{ color: "#385898" }}>Chưa được thuê</Text>}
        {roomData?.status === "not-available" && <Text style={{ color: "red" }}>Hết hợp đồng</Text>}
        {roomData?.status === "already-rent" && !ObjectCancelRequest?.[roomData?._id] && <Text style={{ color: "green" }}>Đang được thuê</Text>}
        {ObjectCancelRequest?.[roomData?._id] && <Text style={{ color: "#FF9671" }}>Yêu cầu huỷ hợp đồng</Text>}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  StyledWrapRoom: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    overflow: "hidden",
  },

  StyledImageRoom: {
    height: 230,
    borderRadius: 15,
    overflow: "hidden",
  },

  StyledHeading: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    flexWrap: "wrap",
    width: "70%",
  },

  StyledTwo: { justifyContent: "space-between", alignItems: "center", flexDirection: "row" },
});

export default RoomForRentScreen;
