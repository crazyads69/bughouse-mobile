import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAvoidingView } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/common/Button/Button";
//
const ForgotPass = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email("Nhập sai định dạng email")
          .required("Vui lòng nhập Email"),
      })
    ),
  });

  const sendMail = () => {
    Alert.alert(
      "Thông báo",
      "Chúng tôi đã gửi 1 email khôi phục tới tài khoản của bạn !!!",
      [
        {
          text: "Về trang đăng nhập",
          onPress: () => navigation.navigate("ResetPass"),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.blockIconLock}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            style={{ fontSize: 50 }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 25,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontSize: 17,
            fontWeight: "500",
            color: "black",
          }}
        >
          Bạn đang gặp sự cố đăng nhập ?
        </Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 10 }}>
              <TextInput
                placeholder="Tài khoản hoặc địa chỉ email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={styles.textFeild}
              />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email?.message}</Text>
              )}
            </View>
          )}
          name="email"
          rules={{ required: false }}
        />
        <Button
          onPress={handleSubmit(sendMail)}
          style={{
            backgroundColor: "#1A94FF",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          Tiếp tục
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  blockIconLock: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",

    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  textFeild: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  iconInput: {
    marginRight: 5,
    color: "#554",
  },
});

export default ForgotPass;
