import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import Frame from "./components/Frame";
import BuyAirtime from "./screens/BuyAirtime";
import BuyData from "./screens/BuyData";
import PayBill from "./screens/PayBill";
import Cable from "./screens/Cable";
import BuySmeData from "./screens/SmeData";
import PayBill2 from "./screens/PayBill2";
import About from "./screens/About";
import Setting from "./screens/Setting";
import Confirm1 from "./screens/Confirm1";
import Beneficiary from "./screens/Beneficiary";
import SideBar from "./components/SideBar";
import { AuthProvider } from "./contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import LoginScreen from "./screens/LoginScreen";
import UserRegistrationForm from "./screens/UserRegistrationForm";
import History from "./screens/History";
import InactivityTimer from "./components/InactivityTimer";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <UserProvider>
          <NotificationProvider>
            <AuthProvider>
              {hideSplashScreen ? (
                <InactivityTimer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                      name="Home"
                      component={Home}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Frame"
                      component={Frame}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="History"
                      component={History}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="BuyAirtime"
                      component={BuyAirtime}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="BuyData"
                      component={BuyData}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="PayBill"
                      component={PayBill}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Cable"
                      component={Cable}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="BuySmeData"
                      component={BuySmeData}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="PayBill2"
                      component={PayBill2}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="About"
                      component={About}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Setting"
                      component={Setting}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Confirm1"
                      component={Confirm1}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Beneficiary"
                      component={Beneficiary}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="SideBar"
                      component={SideBar}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Login"
                      component={LoginScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="UserRegistrationForm"
                      component={UserRegistrationForm}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                </InactivityTimer>
              ) : null}
            </AuthProvider>
          </NotificationProvider>
        </UserProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
