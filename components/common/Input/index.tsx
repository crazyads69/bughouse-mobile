import { Controller } from "react-hook-form";

import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-element-textinput";
import COLORS from "../../../consts/colors";

interface IProps {
  control: any;
  name: string;
  placeholder: string;
  label?: string;
  error?: string | null;
}

const Input = (props: IProps) => {
  const { control, name, label, placeholder, error } = props;

  const errorStyle = error ? style.error : {};

  return (
    <Controller
      control={control}
      render={({ field }) => (
        <>
          <TextInput
            style={{ ...style.inputTextFeild, ...errorStyle }}
            inputStyle={style.inputStyle}
            labelStyle={style.labelStyle}
            placeholderStyle={style.placeholderStyle}
            textErrorStyle={style.textErrorStyle}
            placeholder={placeholder}
            placeholderTextColor="gray"
            focusColor={COLORS.primary}
            defaultValue={field.value}
            {...field}
            onChangeText={(text) => {
              field.onChange(text);
            }}
          />
          {error && <Text style={{ color: "red", fontStyle: "italic" }}>{error}</Text>}
        </>
      )}
      name={name}
    />
  );
};

const style = StyleSheet.create({
  inputTextFeild: {
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginVertical: 10,
  },
  inputStyle: { fontSize: 16 },
  labelStyle: {
    fontSize: 14,
    position: "absolute",
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  error: {
    borderColor: "red",
  },
});

export default Input;
