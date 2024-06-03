import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface IProps {
  control: any;
  label?: string;
  data?: { label: string; value: string }[];
  name: string;
  search?: boolean;
  value?: string;
  placeholder?: string;
  onchange?: (value: { label: string; value: string } | null) => void;
}

const DropdownSelect = (props: IProps) => {
  const { control, label = "label", data, name, search = false, value = "value", placeholder, onchange } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Dropdown
          style={[style.dropdown]}
          placeholderStyle={style.placeholderStyle}
          selectedTextStyle={style.selectedTextStyle}
          inputSearchStyle={style.inputSearchStyle}
          iconStyle={style.iconStyle}
          search={search}
          data={data || [{ label: "Hồ Chí Minh", value: "Hồ Chí Minh" }]}
          value={field.value}
          maxHeight={300}
          labelField={label}
          valueField={value}
          onChange={(item) => {
            onchange?.(item);
            field.onChange(item.value);
          }}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default DropdownSelect;

const style = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
