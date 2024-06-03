import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { userApi } from "../../api/userApi";
import MainHeader from "../../components/common/Header/MainHeader";
import { INotification } from "../../models/notification";
import { convertString, formatDate, getColor } from "../../utils";

const NotificationsScreen = () => {
  const { data: notificationList, isLoading } = useQuery({
    queryKey: ["getAllNotifications"],
    queryFn: () => userApi.getAllNotifications(),
  });

  const ruleRender = !isLoading && notificationList && notificationList.data && notificationList.data.items && notificationList.data.items.length > 0;

  return (
    <SafeAreaView>
      <MainHeader title="Thông báo" />

      {isLoading && (
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      )}

      {!ruleRender && (
        <View style={styles.wrapContent}>
          <Image source={require("../../assets/notification.png")} style={{ width: "100%", height: 300 }} />
          <Text style={styles.heading}>Không có thông báo ngay bây giờ!</Text>
          <Text style={styles.textStyled}>Bạn đã cập nhật!</Text>
        </View>
      )}

      {ruleRender && (
        <View style={styles.container}>
          <FlatList data={notificationList.data.items} renderItem={(item) => <NotificationsScreen.NotificationItem notificationItem={item.item} />} />
        </View>
      )}
    </SafeAreaView>
  );
};

NotificationsScreen.NotificationItem = ({ notificationItem }: { notificationItem: INotification }) => {
  const queryClient = useQueryClient();

  const checkNotiMutate = useMutation({
    mutationFn: userApi.checkNotification,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getAllNotifications"] });
    },
    onError: () => {},
  });

  return (
    <TouchableOpacity
      onPress={() => {
        if (!notificationItem.isChecked && !checkNotiMutate.isLoading) checkNotiMutate.mutate(notificationItem._id);
      }}
    >
      <View style={{ ...styles.NotiItem, backgroundColor: !notificationItem.isChecked ? "#fafafa" : "unset" }}>
        <View style={styles.icon}>
          <Ionicons name="notifications-outline" size={30} color="white" />
        </View>

        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...styles.HeadingNoti, color: getColor("primary") }}>{convertString(notificationItem.type)}</Text>
          <Text style={{ paddingVertical: 10, paddingHorizontal: 5 }}>{notificationItem.content}</Text>
          <Text>Thời gian : {formatDate(new Date(notificationItem.createdAt))}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default NotificationsScreen;

const styles = StyleSheet.create({
  NotiItem: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 15,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  icon: {
    backgroundColor: getColor("primary"),
    height: 50,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 1,

    borderRadius: 50,
  },
  container: {},

  HeadingNoti: {
    fontSize: 16,
    fontWeight: "bold",
  },

  wrapContent: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    gap: 10,
    flexDirection: "column",
    height: "100%",
    marginTop: "30%",
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },

  textStyled: {
    fontSize: 12,
    color: "#333",
    fontStyle: "italic",
  },
});
