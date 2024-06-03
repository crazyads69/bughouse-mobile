import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Alert, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { invoiceApi } from "../../api/invoiceApi";
import { userApi } from "../../api/userApi";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";

const InvoiceScreen = () => {
  const { data, isLoading } = useQuery({
    queryFn: userApi.getInvoices,
    queryKey: ["getInvoices"],
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const payInvoiceMutate = useMutation({
    mutationFn: invoiceApi.payInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["getAllNotifications"] });
      Alert.alert("Thông báo", "Thanh toán hoá đơn thành công!!!");
    },
    onError: () => Alert.alert("Lỗi !!!", "Lỗi đã xảy ra vui lòng thử lại!!!"),
  });

  const extendInvoiceMutate = useMutation({
    mutationFn: invoiceApi.extendInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["getAllNotifications"] });
      Alert.alert("Thông báo", "Gia hạn thành công");
    },
    onError: () => Alert.alert("Lỗi !!!", "Lỗi đã xảy ra vui lòng thử lại"),
  });

  const ruleRender = data && data?.data && data.data.items && data.data.items.length > 0 && !isLoading;

  const handleOpenBlankTransaction = (transactionHash: string | null) => {
    if (!transactionHash) return;
    Linking.canOpenURL(`https://testnet.snowtrace.io/tx/${transactionHash}`).then((supported) => {
      if (supported) {
        Linking.openURL(`https://testnet.snowtrace.io/tx/${transactionHash}`);
      } else {
        Alert.alert("Error", "Topup error, internal server");
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={{ marginBottom: 20 }}>
        <MainHeader title="Hoá đơn" />
      </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* {isLoading && ArrayFrom(6).map((item) => <InvoiceContainer.InvoiceSkeleton key={item} />)} */}

        {data?.data && data.data.items && data.data.items.length === 0 && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Không có hoá đơn nào cần phải thanh toán cả</Text>
          </View>
        )}

        {ruleRender &&
          data.data.items.map((invoiceItem) => {
            const startDate = moment(invoiceItem.startDate).unix();
            const endDate = moment(invoiceItem.endDate).unix();
            const dayLeft = moment.duration(endDate - startDate, "seconds").asDays();
            return (
              <TouchableOpacity key={invoiceItem._id} onPress={() => handleOpenBlankTransaction(invoiceItem.txhash)}>
                <View style={{ paddingBottom: 10, borderBottomColor: "#ccc", borderBottomWidth: 1, marginBottom: 10 }}>
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="receipt-outline" size={34} color={COLORS.primary} />
                    <View style={{ marginVertical: 10, marginHorizontal: 15, flex: 1 }}>
                      <Text style={{ paddingBottom: 5, fontWeight: "600", fontSize: 16 }}>Thanh toán tiền dịch vụ</Text>
                      {invoiceItem.txhash && <Text style={{ paddingBottom: 5 }}>Mã giao dịch : {invoiceItem.txhash.slice(0, 10) + "..."}</Text>}
                      <Text style={{ paddingBottom: 5 }}>Số tiền :{invoiceItem.amount}</Text>

                      <Text>Thời gian tạo :{moment(invoiceItem.createdAt).format("MM/DD/YYYY")}</Text>
                    </View>
                    {invoiceItem.payStatus !== "Complete" && <Text>còn lại {dayLeft < 0 ? 0 : dayLeft} ngày</Text>}
                    {invoiceItem.payStatus === "Complete" && <Text>Đã thanh toán</Text>}
                  </View>

                  {invoiceItem.payStatus !== "Complete" && (
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                      {!invoiceItem.isExtends && (
                        <Button
                          disabled={payInvoiceMutate.isLoading || extendInvoiceMutate.isLoading}
                          onPress={() => extendInvoiceMutate.mutate(invoiceItem._id)}
                          mode="contained"
                          loading={extendInvoiceMutate.isLoading}
                        >
                          Gia hạn
                        </Button>
                      )}
                      <Button
                        disabled={payInvoiceMutate.isLoading || extendInvoiceMutate.isLoading}
                        onPress={() => payInvoiceMutate.mutate(invoiceItem._id)}
                        mode="contained"
                        loading={payInvoiceMutate.isLoading}
                        style={{ marginLeft: 5 }}
                      >
                        Thanh toán
                      </Button>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoiceScreen;
