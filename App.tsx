import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import AppNavigator from "./app/navigation/AppNavigator";
import routes from "@/navigation/routes";
import { store } from "@/store/configureStore";
import DrawerItems from "./DrawerItems";
import { StatusBar } from "expo-status-bar";
import {
  TourGuideProvider, // Main provider
} from './srcs'
import { useColorScheme } from "react-native";
const queryClient = new QueryClient();
const Drawer = createDrawerNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins': require('./app/assets/fonts/Poppins-Regular.ttf')
  })
  const isDarkMode = useColorScheme() === 'dark';
  const theme = {
    ...MD3LightTheme,

    // Specify a custom property
    custom: 'property',

    // Specify a custom property in nested object
    colors: {
      ...MD3LightTheme.colors,
      brandPrimary: '#fefefe',
      brandSecondary: 'gray',
    },
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : '#fff',
  };
  if (!fontsLoaded) {
    return null
  }
  //eas update --branch preview --message "Updating the app"
  //eas update --branch prod --message "Updating the app"
  //eas build -p android --profile prod
  //eas build --platform android
  return (
    <TourGuideProvider  {...{ borderRadius: 12, androidStatusBarVisible: true }}>
      <StatusBar style="auto" backgroundColor={backgroundStyle.backgroundColor} />
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <Drawer.Navigator
                drawerContent={(props) => <DrawerItems {...props} />}>
                <Drawer.Screen
                  name={routes.HOME.route}
                  component={AppNavigator}
                  options={{ headerShown: false }}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </QueryClientProvider>
        </Provider>
      </PaperProvider>
    </TourGuideProvider>
  );
}
