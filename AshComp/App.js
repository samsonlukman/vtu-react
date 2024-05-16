const Stack = createNativeStackNavigator();
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
import Vector from "./components/Vector";
import Vector1 from "./components/Vector1";
import Vector2 from "./components/Vector2";
import Vector3 from "./components/Vector3";
import Vector4 from "./components/Vector4";
import Vector5 from "./components/Vector5";
import SideBar from "./components/SideBar";
import Selector from "./components/Selector";
import SelectorCable from "./components/SelectorCable";
import Network from "./components/Network";
import Frame1 from "./components/Frame1";
import { AuthProvider } from "./contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import UserRegistrationForm from "./screens/UserRegistrationForm";
import { UserProvider } from "./contexts/UserContext";

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
      <AuthProvider>
        {hideSplashScreen ? (
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
        ) : null}
        </AuthProvider>
        </UserProvider>
      </NavigationContainer>
    </>
  );
};
export default App;
