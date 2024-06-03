import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { authApi } from "../../api/authApi";
import { setUserInfo } from "../../app/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Button from "../../components/common/Button/Button";
import ButtonText from "../../components/common/Button/ButtonText";
import COLORS from "../../consts/colors";
import { ResponseSignIn } from "../../models/auth";
import { loginSchema } from "../../schemas/auth";
import { getAsyncStorage, setAsyncStorage } from "../../utils/storages";

const Login = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    // resolver: yupResolver(loginSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    try {
      const response = await authApi.login(data);

      if (response) {
        dispatch(setUserInfo(response.data as ResponseSignIn));

        setAsyncStorage("dataUser", JSON.stringify(response?.data as ResponseSignIn));

        return navigation.navigate("BottomScreen");
      }
    } catch (error: any) {
      if (error) {
        Alert.alert("Đăng nhập thất bại", error?.data.message, [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Image source={require("../../assets/LogoBugHouse1.png")} />
        </View>

        <Text style={styles.headerText}>Đăng Nhập</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <MaterialIcons name="alternate-email" size={20} style={styles.iconInput} />
                <TextInput
                  placeholder="Email or username"
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
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons name="lock-closed-outline" size={20} style={styles.iconInput} />
                <TextInput
                  placeholder="Password"
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

        <View style={{ alignItems: "flex-end" }}>
          <ButtonText onPress={() => navigation.navigate("ForgotPass")}>Quên mật khẩu ?</ButtonText>
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          style={{
            ...styles.buttonLogin,
            opacity: isSubmitting || !isValid ? 0.3 : 1,
          }}
          loading={isSubmitting}
        >
          Đăng nhập
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Bạn là người mới </Text>

          <ButtonText onPress={() => navigation.navigate("Register")}>Đăng ký ngay ?</ButtonText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
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

export default Login;
