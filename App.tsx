import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { TourGuideProvider } from './srcs';
const Tab = createMaterialBottomTabNavigator();

export default function App() {
    //eas update --branch dev --message "Updating the app"
  //eas update --branch prod --message "Updating the app"
  //eas build -p android --profile prod
  //  eas build --platform android
  return (
    <PaperProvider>
      <NavigationContainer>
      <TourGuideProvider {...{ borderRadius: 16, androidStatusBarVisible: true }}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </TourGuideProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}