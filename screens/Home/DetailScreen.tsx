import { useMutation } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ImageBackground, Linking, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { userApi } from "../../api/userApi";
import { useAppSelector } from "../../app/hook";
import Input from "../../components/common/\bInput";
import RateComp from "../../components/common/Rate";
import RoomDetailInfo from "../../components/common/Room/RoomDetailInfo";
import COLORS from "../../consts/colors";
import { room } from "../../models/room";
import { convertPhone84, getFullAddress, randomId } from "../../utils";
import { convertMoneyToVndText } from "../../utils/money";

const DetailsScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const item: room = route.params;
  const { register, handleSubmit, control } = useForm<{ content: string }>();
  const { user } = useAppSelector((state) => state.authSlice.userInfo);

  const [open, setOpen] = useState(false);

  const handleRedirectToCall = () => {
    Linking.openURL(`tel:${"0911336236"}`);
  };

  const handleRentRoom = () => {
    navigation.navigate("ContractScreen", { item: item });
  };

  const handleEditRoom = () => {
    // will pass data here to edit room
    navigation.navigate("AddroomScreen", item);
  };

  const reportMutate = useMutation({
    mutationFn: userApi.postReport,
    onSuccess: (data) => {
      setOpen(false);
      Alert.alert("Thông báo", "Báo cáo phòng thành công !!!!");
    },
    onError: (error) => {
      Alert.alert("Thông báo", "Báo cáo phòng thất bại !!!!");
    },
  });

  const handleReport = (values: { content: string }) => {
    reportMutate.mutate({ ...values, roomId: item._id || "" });
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          backgroundColor: COLORS.white,
          flex: 1,
          paddingBottom: 50,
        }}
      >
        <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />

        <ScrollView>
          <View style={{ position: "relative" }}>
            <ImageBackground
              style={style.headerImage}
              source={{
                uri: item?.roomAttachment?.url[0] || "",
              }}
            >
              <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack} />
                <Icon name="bookmark-border" size={28} color={COLORS.white} />
              </View>
            </ImageBackground>
            <View style={style.iconContainer}>
              <Icon name="place" color={COLORS.white} size={28} />
            </View>
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item?.name}</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: COLORS.grey,
                marginTop: 5,
              }}
            >
              {getFullAddress(item?.address)}
            </Text>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <RateComp numStar={4} isDisplayText openReport={() => setOpen(true)} />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Giá phòng</Text>
            <View style={style.priceTag}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.grey,
                  marginLeft: 5,
                }}
              >
                {convertMoneyToVndText(item?.basePrice)}
              </Text>
            </View>
          </View>

          <DetailsScreen.Card label="Thông tin chủ phòng">
            <View
              style={{
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={style.avatar}>
                <Image
                  style={style.avatar}
                  source={{
                    uri: `https://api.multiavatar.com/${randomId()}.png`,
                  }}
                />
              </View>

              <View style={{ marginLeft: 15, justifyContent: "center" }}>
                <Text style={{ fontSize: 16 }}>{item?.owner?.name || item?.owner?.username || "Đang cập nhập..."}</Text>
                <TouchableOpacity onPress={handleRedirectToCall}>
                  <Text style={{ fontSize: 16 }}>{convertPhone84(item?.owner?.phone || "0911336236") || "Đang cập nhập..."}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </DetailsScreen.Card>

          <DetailsScreen.Card label="Thông tin phòng">
            <RoomDetailInfo
              label="ROOM STATUS"
              value={item?.status === "already-rent" ? "Đã Thuê" : "Còn phòng"}
              highlight={item?.status === "already-rent" ? "unactive" : "active"}
            />
            <RoomDetailInfo label="Giá phòng" value={convertMoneyToVndText(item?.basePrice)} />
            <RoomDetailInfo label="Diện tích" value={item?.acreage + " m2"} />
            <RoomDetailInfo label="Sức chứa" value={item?.gender === "All" ? "Nam / Nữ" : item.gender == "Male" ? "Nam" : "Nữ"} />
            <RoomDetailInfo label="Đặt cọc" value={convertMoneyToVndText(item?.deposit)} />
            <RoomDetailInfo label="Tiền điện" value={convertMoneyToVndText(3500)} />
            <RoomDetailInfo label="Địa chỉ" value={item.address.fullText} width="100%" />
          </DetailsScreen.Card>

          <DetailsScreen.Card label="Tiện ích">
            <RoomDetailInfo label="ROOM STATUS" value={item?.status === "already-rent" ? "Đã Thuê" : "Còn phòng"} highlight="unactive" />
            <RoomDetailInfo label="ROOM RATES" value={convertMoneyToVndText(item?.basePrice)} />
            <RoomDetailInfo label="ACREAGE" value={item?.acreage + " m2"} />
            <RoomDetailInfo label="CAPACITY" value={item?.gender === "All" ? "Male/Female" : item.gender} />
            <RoomDetailInfo label="DEPOSIT" value={convertMoneyToVndText(item?.deposit)} />
            <RoomDetailInfo label="ELECTRICITY" value={convertMoneyToVndText(3500)} />
          </DetailsScreen.Card>

          <DetailsScreen.Card label="Mô tả">
            <Text>{item.description}</Text>
          </DetailsScreen.Card>

          <View style={{ padding: 20 }} />
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          {item?.owner?.username === user.username && item.status !== "already-rent" && (
            <Button mode="contained" style={style.btn} onPress={handleEditRoom}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                }}
              >
                Sửa phòng của bạn
              </Text>
            </Button>
          )}

          {item && item.owner?.username !== user.username && item.status !== "already-rent" && (
            <Button mode="contained" style={style.btn} onPress={handleRentRoom}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                }}
              >
                Thuê ngay
              </Text>
            </Button>
          )}
        </View>
      </ScrollView>
      <Modal visible={open} onDismiss={() => setOpen(false)}>
        <View style={{ backgroundColor: "white", padding: 20, marginHorizontal: 20, borderRadius: 10 }}>
          <View style={{ paddingBottom: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 20 }}>Báo cáo phòng</Text>
          </View>

          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  {...field}
                  placeholder="Mô tả về lý do báo cáo phòng "
                  style={style.textDes}
                />
              )}
              name="content"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button loading={reportMutate.isLoading} disabled={reportMutate.isLoading} mode="contained" onPress={handleSubmit(handleReport)}>
              Gửi
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

interface IProps extends PropsWithChildren {
  label: string;
}

DetailsScreen.Card = ({ label, children }: IProps) => {
  return (
    <View style={style.cardStyle}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>{label}</Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {children}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
  },

  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    bottom: 0,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: 30 }],
    elevation: 3,
  },
  headerImage: {
    height: 400,
    overflow: "hidden",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    position: "relative",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },

  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "105%",
  },

  textStyle: {
    color: "#fff",
    fontSize: 22,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },

  cardStyle: {
    marginHorizontal: 10,
    paddingLeft: 10,
    marginTop: 20,
    borderRadius: 15,
  },

  cardViewSign: {
    flex: 1,
  },

  textCenter: {
    textAlign: "center",
  },

  headingText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  CardSign: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  textDes: { padding: 10, borderColor: "#DDDDDD", borderWidth: 1, borderRadius: 4, minHeight: 140, maxHeight: 140, fontSize: 16 },
});

export default DetailsScreen;
