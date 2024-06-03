import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../../consts/colors";
import Button from "../Button/Button";
import MainHeader from "../Header/MainHeader";

const PassComp = ({
  isChangePassWord = false,
}: {
  isChangePassWord?: boolean;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: isChangePassWord
      ? {
          confirmNewPassword: "",
          newPassWord: "",
        }
      : {
          password: "",
          newPassWord: "",
          confirmNewPassword: "",
        },
    // resolver: yupResolver(),
  });

  const onSubmit = async (data: any) => {
    console.log("🚀 ~ file: Login.tsx:22 ~ onSubmit ~ data", data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ paddingHorizontal: 25 }}
      >
        <Text style={styles.headerText}>
          {isChangePassWord ? "Đổi Mật Khẩu" : "Mật Khẩu Mới"}
        </Text>

        {isChangePassWord && (
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.textFeild}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    style={styles.iconInput}
                  />
                  <TextInput
                    placeholder="Mật khẩu hiện tại"
                    secureTextEntry
                    style={{ flex: 1, paddingVertical: 0 }}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
                {errors.newPassWord && (
                  <Text style={{ color: "red" }}>
                    {errors.newPassWord?.message}
                  </Text>
                )}
              </View>
            )}
            name="password"
            rules={{ required: true }}
          />
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder="Mật khẩu mới"
                  secureTextEntry
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.newPassWord && (
                <Text style={{ color: "red" }}>
                  {errors.newPassWord?.message}
                </Text>
              )}
            </View>
          )}
          name="newPassWord"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder="Xác nhận mật khẩu mới"
                  secureTextEntry
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.confirmNewPassword && (
                <Text style={{ color: "red" }}>
                  {errors.confirmNewPassword?.message}
                </Text>
              )}
            </View>
          )}
          name="confirmNewPassword"
          rules={{ required: true }}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          style={{
            ...styles.buttonLogin,
            opacity: isSubmitting || !isValid ? 0.3 : 1,
          }}
        >
          {isChangePassWord ? "Đổi Mật Khẩu" : "Xác Nhận"}
        </Button>
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
    textAlign: "center",
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

export default PassComp;
