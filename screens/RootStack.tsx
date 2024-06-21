import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FunctionComponent, useEffect } from "react";
import { setUserInfo } from "../app/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { ResponseSignIn } from "../models/auth";
import { getAsyncStorage } from "../utils/storages";
import ChangePass from "./Auth/ChangePass";
import ForgotPass from "./Auth/ForgotPass";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ResetPass from "./Auth/ResetPass";
import WalletScreen from "./Auth/WalletScreen";
import BottomScreen from "./BottomScreen";
import DetailsScreen from "./Home/DetailScreen";
import InvoiceScreen from "./Home/InvoiceScreen";
import RoomRented from "./Room/RoomRented";
import AddRoomScreen from "./Room/AddRoomScreen";
import ContractScreen from "./Room/ContractScreen";
import RoomDeclaration from "./Room/RoomDeclaration";
import RoomForRentScreen from "./Room/RoomForRentScreen";
const Stack = createStackNavigator<any>();
//
const RootStack: FunctionComponent = () => {
  const { accessToken } = useAppSelector((state) => state.authSlice.userInfo);

  let isAuthenticated = accessToken || false;
  const dispatch = useAppDispatch();

  async function getDataLoginFromStorage() {
    try {
      // @ts-ignore
      const userInfo = await getAsyncStorage("dataUser");
      if (!accessToken && userInfo) {
        dispatch(setUserInfo(JSON.parse(userInfo) as ResponseSignIn));
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: RootStack.tsx:35 ~ getDataLoginFromStorage ~ error:",
        error
      );
    }
  }

  useEffect(() => {
    if (!accessToken) {
      getDataLoginFromStorage();
      console.clear();
    }
  }, [accessToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={accessToken ? "BottomScreen" : "Login"}
      >
        {!isAuthenticated && (
          <>
            <Stack.Screen
              name="ForgotPass"
              component={ForgotPass}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPass"
              component={ResetPass}
              options={{ headerShown: false }}
            />
          </>
        )}

        {isAuthenticated && (
          <>
            <Stack.Screen
              name="BottomScreen"
              component={BottomScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WalletScreen"
              component={WalletScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddroomScreen"
              component={AddRoomScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailScreen"
              component={DetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassScreen"
              component={ChangePass}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RoomForRentScreen"
              component={RoomForRentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RoomRentedScreen"
              component={RoomRented}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContractScreen"
              component={ContractScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RoomDeclaration"
              component={RoomDeclaration}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InvoiceScreen"
              component={InvoiceScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
