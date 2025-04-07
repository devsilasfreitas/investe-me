import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewActions } from "./pages/NewActions";
import { Welcome } from "./pages/Welcome";
import { useUser } from "./contexts/UserContext";
import { Loading } from "./pages/Loading";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Details } from "./pages/Details";

export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  NewActions: undefined;
  Welcome: undefined;
  Settings: undefined;
  Details: {
    actionStock: string;
  }
};

export function Router () {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const { user } = useUser();

  return (
    <NavigationContainer>
      { user === undefined ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
      ) : user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewActions" component={NewActions} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}