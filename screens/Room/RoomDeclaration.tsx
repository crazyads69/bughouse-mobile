import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Alert, FlatList, SafeAreaView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { invoiceApi } from "../../api/invoiceApi";
import { serviceApi } from "../../api/serviceApi";
import { userApi } from "../../api/userApi";
import MainHeader from "../../components/common/Header/MainHeader";
import { getCurrentDate } from "../../utils/time";
//
const RoomDeclaration = ({ navigation, route }: { navigation: any; route: any }) => {
  const idRoom: string = route.params;
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schemaServiceDeclare),
  });

  const { data: dataServices, isLoading: loadingServices } = useQuery({
    queryKey: ["getServiceRemand", idRoom],
    queryFn: () => {
      if (idRoom) {
        return serviceApi.getListServiceDemand(idRoom);
      }
      return null;
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const { mutate: createInvoiceMutate, isLoading: invoiceLoading } = useMutation({
    mutationKey: ["CreateInvoice"],
    mutationFn: invoiceApi.createInvoice,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getRoomRented"] });

      Alert.alert("Thông báo", "Khai báo dịch vụ thành công!!!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    },
    onError: () => {},
  });

  const { mutate: getContractMutate, isLoading: loadingContract } = useMutation({
    mutationKey: ["getContractInfo"],
    mutationFn: userApi.getDetailContract,
    onSuccess: (data) => {
      createInvoiceMutate({
        contractId: data.data.contract._id || "",
        invoiceInfo: {
          listServiceDemands: dataServices ? dataServices?.data.map((item) => item._id) : [],
        },
      });
    },
    onError: (err) => {},
  });

  const {
    mutate: updateServiceMutate,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["UpdateServiceDemand"],
    mutationFn: serviceApi.updateServiceDemand,
    onSuccess: () => getContractMutate(idRoom || ""),
    onError: (err) => {
      console.log("🚀 ~ file: DeclareRoomPage.tsx:50 ~ DeclareRoomPage ~ err:", err);
    },
  });

  const handleUpdateService = () => {
    if (invoiceLoading || isLoading || !idRoom || !dataServices || !dataServices.data) return;

    updateServiceMutate({
      roomId: idRoom,
      demandInfo: {
        atMonth: getCurrentDate().month,
        demands: dataServices?.data.map((item) => {
          const isQuality = item.type === 0;
          const data = getValues(item.service.name.split(" ").join("_"));
          return {
            serviceId: item.service._id,
            newIndicator: !isQuality ? data : 0,
            quality: !isQuality ? 0 : data,
          };
        }),
      },
    });
  };

  const isLoadingg = loadingServices || invoiceLoading || loadingContract;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader title="Service Declaration" />

      {dataServices?.data && dataServices && (
        <View style={{ paddingHorizontal: 20 }}>
          <FlatList
            data={dataServices?.data}
            renderItem={(item) => {
              const serviceData = item.item;

              return (
                <View style={{ marginTop: 30 }}>
                  <Text style={{ fontSize: 18, textTransform: "capitalize", paddingBottom: 5 }}>{serviceData.service.name}</Text>
                  <TextInput
                    placeholder={serviceData.service.description}
                    keyboardType="numeric"
                    onChangeText={(value) => {
                      const serviceName = serviceData.service.name.trim().replace(/ /g, "_") || "name";
                      setValue(serviceName, value);
                    }}
                    mode="outlined"
                  />

                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 5 }}>
                    <Text>Khai báo {serviceData.service.name.trim()} </Text>

                    {serviceData?.type === 1 ? (
                      <View>
                        <Text>chỉ số cũ : {serviceData.oldIndicator}</Text>
                      </View>
                    ) : (
                      <View>
                        <Text>Phí dịch vụ : {serviceData?.service?.basePrice}</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
          />

          <Button disabled={isLoadingg} loading={isLoadingg} mode="contained" onPress={handleUpdateService} style={{ marginTop: 30 }}>
            Khai báo
          </Button>
        </View>
      )}

      {!dataServices?.data && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Không thể khai báo dịch vụ</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoomDeclaration;
