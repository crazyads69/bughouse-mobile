import { FlatList, Text } from "react-native";
import { IResponseLessed } from "../../../models/room";
import SavedScreen from "../../../screens/Home/SavedScreen";

const SearchResult = ({ roomData }: { roomData: IResponseLessed[] | null }) => {
  if (!roomData) return <Text>Không tìm thấy phòng nào</Text>;
  return (
    <FlatList
      style={{ paddingHorizontal: 20, marginBottom: 120 }}
      data={roomData}
      renderItem={({ item }) => <SavedScreen.RoomCard roomData={item.room} />}
      keyExtractor={(item) => item.room._id}
    />
  );
};

export default SearchResult;
