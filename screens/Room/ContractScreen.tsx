import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { contractApi } from "../../api/contractApi";
import COLORS from "../../consts/colors";
import { room } from "../../models/room";
import { getContract, getContractTerm } from "../../utils/contract";
import { formatDDMMYYYY } from "../../utils/time";
//
const ContractScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { item, isSign }: { item: room; isSign: boolean } = route.params;
  const [isShowContract, setIsShowContract] = useState(() => isSign || false);
  const [contractHash, setContractHash] = useState("");
  const [showModalOTP, setShowModalOTP] = useState(false);

  const { width } = useWindowDimensions();

  const source = {
    html: isShowContract
      ? getContract({
          lessor: undefined,
          renter: undefined,
          room: item,
          _id: undefined,
          dateRent: undefined,
        })
      : getContractTerm(),
  };

  const queryClient = useQueryClient();
  const { mutate: mutateContract, isLoading: loadingContract } = useMutation({
    mutationFn: contractApi.createContract,
    mutationKey: ["PostNewContract"],
    onSuccess: (data) => {
      setContractHash(data.data.contractHash);
      setIsShowContract(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    mutate: mutateSignContract,
    isLoading: loadingSignContract,
    isError: errorSignContract,
  } = useMutation({
    mutationFn: contractApi.signContract,
    mutationKey: ["SignContractUser"],
    onSuccess: (data) => {
      setShowModalOTP(false);
      setIsShowContract(false);
      Alert.alert("Thông báo", "Thuê phòng thành công !!!!");
      queryClient.invalidateQueries(["getRoomRented"]);
      navigation.navigate("RoomRentedScreen");
    },
    onError: (err) => {
      setShowModalOTP(false);
    },
  });

  const handleCreateContract = () => {
    const newTrans = {
      period: item.period || 6,
      room: item._id,
      dateRent: formatDDMMYYYY(new Date()),
      payTime: formatDDMMYYYY(new Date()),
      payment: item.basePrice,
      payMode: "VNPay",
    };
    mutateContract(newTrans);
  };

  const handleComfirmOTP = async () => {
    try {
      mutateSignContract({
        roomId: item?._id,
        contractHash: contractHash || "",
      });
    } catch (error) {
      Alert.alert("Lỗi ký hợp đồng", JSON.stringify(error));
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <RenderHTML contentWidth={width} source={source} />
        {isShowContract && (
          <View>
            <View style={style.SignLocated}>
              <View style={style.cardViewSign}>
                <Text style={{ ...style.headingText, borderRightColor: "transparent" }}>Bên cho thuê</Text>
              </View>

              <View style={style.cardViewSign}>
                <Text style={style.headingText}>Bên thuê</Text>
              </View>
            </View>
            <View style={style.SignLocated}>
              <View style={style.cardViewSign}>
                <View style={style.CardSign}>
                  <Text>Bảo</Text>
                  <Text style={{ fontSize: 15, marginTop: 5, color: COLORS.primary }}>Đoàn Ngọc Quốc Bảo</Text>
                </View>
              </View>

              <View style={style.cardViewSign}>
                <View style={style.CardSign}>
                  {loadingSignContract ? (
                    <ActivityIndicator animating={true} color={"white"} />
                  ) : (
                    <TouchableOpacity onPress={handleComfirmOTP}>
                      <Text>Ký hợp đồng </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}

        {!isShowContract && (
          <View style={style.btn}>
            <TouchableOpacity style={style.contentBtn} onPress={handleCreateContract}>
              {loadingContract ? <ActivityIndicator animating={true} color={"white"} /> : <Text style={{ color: "white" }}> Chấp nhận </Text>}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  contentBtn: {
    width: 200,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
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

  SignLocated: { display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" },
});

export default ContractScreen;
