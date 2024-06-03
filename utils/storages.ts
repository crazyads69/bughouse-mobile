import { AsyncStorage } from "react-native";

// Define a function that stores data in AsyncStorage
export async function setAsyncStorage(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data saved successfully.");
  } catch (error) {
    console.log("Error saving data: ", error);
  }
}

// Define a function that retrieves data from AsyncStorage
export async function getAsyncStorage(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Data retrieved successfully:", value);
    } else {
      console.log("No data found for key:", key);
    }
    return value || "";
  } catch (error) {
    console.log("Error retrieving data: ", error);
    return "";
  }
}
