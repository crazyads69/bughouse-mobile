import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { authApi } from "../../api/authApi";
import Button from "../../components/common/Button/Button";
import ButtonText from "../../components/common/Button/ButtonText";
import COLORS from "../../consts/colors";
import { signUpSchema } from "../../schemas/auth";
import { convertPhone84 } from "../../utils";
//
const initDefaultValues = {
  email: "",
  password: "",
  confirmPass: "",
  contactInfo: "",
  username: "",
};

const Register = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initDefaultValues,
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    const dataRegister = { ...data, contactInfo: convertPhone84(data.contactInfo) };
    try {
      const response = await authApi.register(dataRegister);
      if (response) {
        //@ts-ignore
        Alert.alert("Đăng ký !!!", response?.message || "Tạo tài khoản thành công", [{ text: "OK", onPress: () => navigation.navigate("Login") }]);
      }
    } catch (error: any) {
      const { username, email, contactInfo } = error?.data?.message;
      Alert.alert("Lỗi Đăng ký !!", username || email || contactInfo, [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Image source={require("../../assets/LogoBugHouse1.png")} />
        </View>

        <Text style={styles.headerText}>Đăng ký</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons name="person-circle-outline" size={20} style={styles.iconInput} />
                <TextInput
                  placeholder="Tên đăng nhập"
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.username && <Text style={{ color: "red" }}>{errors.username?.message}</Text>}
            </View>
          )}
          name="username"
          rules={{ required: false }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons name="call-outline" size={20} style={styles.iconInput} />
                <TextInput
                  placeholder="Số điện thoại"
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.contactInfo && <Text style={{ color: "red" }}>{errors.contactInfo?.message}</Text>}
            </View>
          )}
          name="contactInfo"
          rules={{ required: false }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <MaterialIcons name="alternate-email" size={20} style={styles.iconInput} />
                <TextInput
                  placeholder="Email"
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.email && <Text style={{ color: "red" }}>{errors.email?.message}</Text>}
            </View>
          )}
          name="email"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons name="lock-closed-outline" size={20} style={styles.iconInput} />
                <TextInput
                  placeholder="Mật khẩu"
                  secureTextEntry
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.password && <Text style={{ color: "red" }}>{errors.password?.message}</Text>}
            </View>
          )}
          name="password"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons name="lock-closed-outline" size={20} style={styles.iconInput} />
                <TextInput
                  placeholder="Xác nhận mật khẩu"
                  secureTextEntry
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.confirmPass && <Text style={{ color: "red" }}>{errors.confirmPass?.message}</Text>}
            </View>
          )}
          name="confirmPass"
          rules={{ required: true }}
        />
        <Button onPress={handleSubmit(onSubmit)} loading={isSubmitting} style={styles.buttonLogin}>
          Đăng ký ngay
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Bạn đã có tài khoản </Text>

          <ButtonText
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Đăng nhập ngay ?
          </ButtonText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  textFeild: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 10,
  },

  iconInput: {
    marginRight: 5,
    color: "#555",
  },

  buttonLogin: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },
});

export default Register;
