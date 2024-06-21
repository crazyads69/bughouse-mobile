import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { userApi } from "../../api/userApi";
import CardWallet from "../../components/common/Card/CardWallet";
import MainHeader from "../../components/common/Header/MainHeader";
import ListService from "../../components/others/Wallet/ListService";
import RecentTransaction from "../../components/others/Wallet/RecentTransaction";
import { IWalletInfo } from "../../models/user";
import { convertMoneyToVndText } from "../../utils/money";
//
const WalletScreen = () => {
  const [walletInfo, setWalletInfo] = useState<IWalletInfo>();

  const getBalance = async () => {
    try {
      const response = await userApi.getWalletInfo();
      setWalletInfo(response.data);
    } catch (error) {
      console.log("🚀 ~ file: WalletScreen.tsx:16 ~ getBalance ~ error:", error);
    }
  };

  const { data: walletTransaction, isLoading: loadingTransaction } = useQuery({
    queryKey: ["getWalletTransaction"],
    queryFn: () => userApi.getWalletTransaction(),
    staleTime: 60 * 1000 * 5,
  });

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <MainHeader title="Ví của tôi" />
        <View style={styles.card}>
          <CardWallet />
        </View>

        <View>
          <Text style={styles.balanceText}>Số dư : {convertMoneyToVndText((walletInfo?.balance as number) || 0)}</Text>
        </View>
        <ListService />
        <RecentTransaction listTransactions={walletTransaction?.data?.items || []} />
      </ScrollView>
    </SafeAreaView>
  );
};
//
export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    paddingVertical: 14,
  },

  balanceText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 10,
  },
});
