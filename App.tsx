import RootStack from "./screens/RootStack";

import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./app/store";
import COLORS from "./consts/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// your entry point
import { MenuProvider } from "react-native-popup-menu";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    secondary: "yellow",
  },
};
//
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <RootStack />
          </PaperProvider>
        </QueryClientProvider>
      </MenuProvider>
    </Provider>
  );
}
