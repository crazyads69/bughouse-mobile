import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Searchbar } from "react-native-paper";
import COLORS from "../../../consts/colors";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const [isSearchPopup, setisSearchPopup] = useState(false);

  return (
    <View style={styles.container}>
      {/* <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <Ionicons name="search" size={25} />
        </View>
        <TextInput style={styles.field} placeholder="Search" value={search} onChangeText={setSearch} focusable />

        <View style={styles.filter}>
          <Ionicons name="filter" size={18} onPress={() => setisSearchPopup(true)} />
        </View>
      </View> */}
      <Searchbar
        placeholder="Nhập từ khoá"
        onChangeText={(data) => {
          console.log(data);
          setSearch(data);
        }}
        value={search}
        style={{
          backgroundColor: "white",
        }}
      />
      <Portal>
        <Modal visible={isSearchPopup} onDismiss={() => setisSearchPopup(false)} contentContainerStyle={{ padding: 20 }}>
          <View style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}>
            <Text>Lọc kết quả</Text>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24 / 1.5,
  },
  inner: {
    flexDirection: "row",
  },
  search: {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  field: {
    backgroundColor: COLORS.white,
    paddingLeft: 48,
    paddingRight: 18,
    paddingVertical: 18,
    borderRadius: 16,
    height: 54,
    flex: 1,
  },
  filter: {
    position: "absolute",
    top: 0,
    right: 10,
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default SearchInput;
