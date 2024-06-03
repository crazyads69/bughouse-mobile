import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-paper";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Ionicons from "react-native-vector-icons/Ionicons";
import { userApi } from "../../api/userApi";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { doRemoveFavorite, doSetFavorite } from "../../app/roomSlice";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import { room } from "../../models/room";
import { getFullAddress } from "../../utils";
import { convertMoneyToVndText } from "../../utils/money";

const SavedScreen = () => {
  const { listFavorite } = useAppSelector((state) => state.roomSlice);

  return (
    <SafeAreaView>
      <MainHeader title="Phòng đã lưu" />
      {listFavorite.length < 1 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            display: "flex",
          }}
        >
          <Ionicons name="sad-outline" size={60} />
          <Text style={{ paddingTop: 10 }}>Bạn chưa lưu phòng nào</Text>
        </View>
      )}
      <View style={{ paddingHorizontal: 10 }}>
        {listFavorite.length >= 1 && (
          <FlatList data={listFavorite} initialNumToRender={7} renderItem={({ item }) => <SavedScreen.RoomCard roomData={item} />} />
        )}
      </View>
    </SafeAreaView>
  );
};

SavedScreen.RoomCard = ({ roomData, isFavoritePage = false }: { roomData?: room | undefined | null; isFavoritePage?: boolean }) => {
  if (!roomData) return <View></View>;
  console.log("🚀 ~ file: SavedScreen.tsx:165 ~ roomData:", roomData);
  const dispatch = useAppDispatch();
  const { listFavorite } = useAppSelector((state) => state.roomSlice);
  const navigation = useNavigation();

  const handleAddFavoriteRoom = async () => {
    const duplicatedItem = listFavorite.find((item) => item._id === roomData?._id);

    if (duplicatedItem) {
      dispatch(doRemoveFavorite(duplicatedItem._id));
    } else if (roomData) {
      dispatch(doSetFavorite(roomData));
    }
  };
  const [idRoomSelected, setIdRoomSelected] = useState("");

  const { data: dataContract, isLoading: loadingContract } = useQuery({
    queryKey: ["getDetailContract", idRoomSelected],
    queryFn: () => {
      if (idRoomSelected) {
        handleCancelContract();
        return userApi.getDetailContract(idRoomSelected);
      }
      return null;
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const { mutate: mutateCancelContract, isLoading } = useMutation({
    mutationFn: userApi.doCancelContract,
    mutationKey: ["handleCancelContract"],
    onSuccess: () => {
      console.log("Done");
    },
    onError: (error) => {
      console.log("🚀 ~ file: RoomItem.tsx:108 ~ RoomItem ~ error:", error);
    },
  });

  const handleCancelContract = () => {
    Alert.alert("Huỷ hợp đồng", "Bạn có muốn chấm dứt hợp đồng này không ?. Hợp đồng chưa hết kỳ hạn. nếu huỷ bạn sẽ mất tiền cọc", [
      { text: "Đóng", onPress: () => {}, style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => mutateCancelContract(dataContract?.data.contract._id || ""),
      },
    ]);
  };

  return (
    <>
      <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => navigation.navigate("DetailScreen" as never, roomData as never)}>
        <View
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 230,
              borderRadius: 15,
              overflow: "hidden",
            }}
            source={{
              uri:
                roomData?.roomAttachment?.url?.[0] ||
                "https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1",
            }}
          />
        </View>

        <Ionicons
          name="heart"
          size={30}
          style={{
            position: "absolute",
            right: 10,
            top: 20,
            color: COLORS.primary,
          }}
          onPress={handleAddFavoriteRoom}
        />

        <View style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", paddingVertical: 10, textTransform: "capitalize", flex: 1 }}>
            {roomData?.name.replace(/,/g, "") || "đang cập nhập..."}
          </Text>

          {roomData.status === "already-rent" && (
            <Menu>
              <MenuTrigger text="..." />
              <MenuOptions>
                <MenuOption
                  text={loadingContract ? "loading..." : `Huỷ hợp đồng`}
                  onSelect={() => {
                    setIdRoomSelected(roomData?._id);
                  }}
                />
              </MenuOptions>
            </Menu>
          )}
        </View>

        <Text style={{ color: COLORS.primary, fontWeight: "500", fontSize: 14 }}>{convertMoneyToVndText(roomData?.basePrice || 0)} / người</Text>

        <Text style={{ paddingVertical: 10, color: "gray" }}>Địa chỉ : {getFullAddress(roomData?.address).replace(/,/g, "")}</Text>
      </TouchableOpacity>
    </>
  );
};

export default SavedScreen;
