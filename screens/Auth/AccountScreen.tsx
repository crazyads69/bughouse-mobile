import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Caption, Text, Title, TouchableRipple } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { deleteToken } from "../../api/axiosClient";
import { roomApi } from "../../api/roomApi";
import { userApi } from "../../api/userApi";
import { useAppSelector } from "../../app/hook";
import { IWalletInfo } from "../../models/user";
import { convertPhone84 } from "../../utils";
import { convertMoneyToVndText } from "../../utils/money";

const AccountScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useAppSelector((state) => state.authSlice.userInfo);

  const [walletInfo, setWalletInfo] = useState<IWalletInfo>();

  const getBalance = async () => {
    try {
      const response = await userApi.getWalletInfo();
      setWalletInfo(response.data);
    } catch (error) {
      console.log("🚀 ~ file: WalletScreen.tsx:16 ~ getBalance ~ error:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const { data: listRoomRented, isLoading } = useQuery({
    queryKey: ["getRoomRented"],
    queryFn: () => roomApi.getRoomrented(),
    refetchOnWindowFocus: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri:
                user.avatar ||
                "https://png.pngtree.com/png-clipart/20220429/original/pngtree-dog-with-bell-going-to-sleep-pet-social-media-avatar-png-image_7572709.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {user.name || user.username || "Updating..."}
            </Title>
            <Caption style={styles.caption}>@{user.username || user.name}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          {/* <Icon name="map-marker-radius" color="#777777" size={20}/> */}
          <Ionicons name="locate-outline" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>Hồ Chí Minh, Việt Nam</Text>
        </View>
        <View style={styles.row}>
          {/* <Icon name="phone" color="#777777" size={20}/> */}
          <Ionicons name="call-outline" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{convertPhone84(user?.phone)}</Text>
        </View>
        <View style={styles.row}>
          {/* <Icon name="email" color="#777777" size={20}/> */}
          <Ionicons name="mail-open-outline" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email || "yonedoan@gmail.com"}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("WalletScreen")}
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>{walletInfo?.balance ? convertMoneyToVndText(walletInfo?.balance as number) : 0}</Title>
          <Caption>Ví của tôi</Caption>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RoomRentedScreen")}
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>{listRoomRented?.data.items.length || 0}</Title>
          <Caption>Phòng đã thuê</Caption>
        </TouchableOpacity>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate("InvoiceScreen")}>
          <View style={styles.menuItem}>
            <Ionicons name="receipt-outline" size={25} color="#777777" />
            <Text style={styles.menuItemText}> Hoá đơn </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("AddroomScreen")}>
          <View style={styles.menuItem}>
            <Ionicons name="hammer-outline" size={25} color="#777777" />
            <Text style={styles.menuItemText}>Tạo phòng</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("RoomForRentScreen")}>
          <View style={styles.menuItem}>
            <Ionicons name="pricetags-outline" size={25} color="#777777" />
            <Text style={styles.menuItemText}>Phòng cho thuê</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ChangePassScreen")}>
          <View style={styles.menuItem}>
            <Ionicons name="apps-outline" size={25} color="#777777" />
            <Text style={styles.menuItemText}>Thay đổi mật khẩu</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            deleteToken();
          }}
        >
          <View style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={25} color="#FF6347" />
            <Text style={styles.menuItemText}>Đăng xuất</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
