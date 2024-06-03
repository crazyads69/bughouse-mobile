import { useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import COLORS from "../../../consts/colors";
import { userApi } from "../../../api/userApi";
import { useAppSelector } from "../../../app/hook";

const listService = [
  {
    name: "Nạp tiền",
    icon: require("../../../assets/ic_wallet.png"),
  },
  {
    name: "Rút tiền",
    icon: require("../../../assets/ic_transfer.png"),
  },
];

const renderServiceItem = (item: any) => {
  const [isShowModalTopup, setisShowModalTopup] = useState(false);
  const [moneyTopup, setMoneyTopup] = useState("");
  const isTopup = item.name === "Top Up";

  const { wallet } = useAppSelector((state) => state.authSlice.userInfo.user);

  const mutateTopup = useMutation({
    mutationFn: userApi.topupMoney,
    onSuccess: (data: any) => {
      Linking.canOpenURL(data.paymentUrl).then((supported) => {
        if (supported) {
          Linking.openURL(data.paymentUrl);
        } else {
          Alert.alert("Lỗi nạp tiền", "Nạp tiền lỗi vui lòng thử lại sau");
        }
      });
    },
    onError: (err) => {
      console.log("🚀 ~ file: ListService.tsx:34 ~ renderServiceItem ~ data:", err);
    },
  });

  return (
    <Fragment key={item.name}>
      <TouchableOpacity onPress={() => isTopup && setisShowModalTopup(true)} style={styles.items}>
        <View style={styles.icon}>
          <Image source={item.icon} />
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>

      {isTopup && (
        <Portal>
          <Modal visible={isShowModalTopup} onDismiss={() => setisShowModalTopup(false)} style={{ padding: 20 }}>
            <View
              style={{
                padding: 20,
                backgroundColor: "white",
                borderRadius: 6,
              }}
            >
              <TextInput
                label="Nhập số tiền muốn nạp"
                onChangeText={(value) => {
                  setMoneyTopup(value);
                }}
                value={moneyTopup}
                mode="outlined"
                style={{
                  color: COLORS.primary,
                  borderColor: COLORS.primary,
                }}
              />
              <TouchableOpacity onPress={() => mutateTopup.mutate({ walletAddress: wallet.walletAddress, amount: Number(moneyTopup) })}>
                <Button mode="contained" style={{ marginTop: 20 }} disabled={mutateTopup.isLoading} loading={mutateTopup.isLoading}>
                  Xác nhận
                </Button>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      )}
    </Fragment>
  );
};

const ListService = () => {
  return (
    <View>
      <View style={styles.list}>{listService.map(renderServiceItem)}</View>
    </View>
  );
};

export default ListService;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  list: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  icon: {
    padding: 10,
    backgroundColor: "white",
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { height: 10, width: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  itemText: {
    marginTop: 10,
  },
});
