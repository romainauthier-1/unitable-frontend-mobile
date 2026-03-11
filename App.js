import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/reducers/Store";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import PlanningScreen from "./src/screens/PlanningScreen";
import MyInfosScreen from "./src/screens/MyInfosScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import { themeColors } from "./src/theme/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faHouse,
	faCalendar,
	faUser,
	faAddressCard,
} from "@fortawesome/free-regular-svg-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: themeColors.primary,
				tabBarInactiveTintColor: themeColors.text,
			}}
		>
			<Tab.Screen
				name="Accueil"
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon
							icon={faHouse}
							size={20}
							color={color}
						/>
					),
				}}
			>
				{(props) => <HomeScreen {...props} />}
			</Tab.Screen>
			<Tab.Screen
				name="Planning"
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon
							icon={faCalendar}
							size={20}
							color={color}
						/>
					),
				}}
			>
				{(props) => <PlanningScreen {...props} />}
			</Tab.Screen>
			<Tab.Screen
				name="Mes infos"
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon
							icon={faAddressCard}
							size={20}
							color={color}
						/>
					),
				}}
			>
				{(props) => <MyInfosScreen {...props} />}
			</Tab.Screen>
			<Tab.Screen
				name="Profil"
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon
							icon={faUser}
							size={20}
							color={color}
						/>
					),
				}}
			>
				{(props) => <ProfileScreen {...props} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
}

function AppNavigator() {
	// const [user, setUser] = useState(false);
	// const { state } = useContext(Auth);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isAuthenticated ? (
				<Stack.Screen name="Main" component={MainTabs} />
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}

			<Stack.Screen
				name="ForgotPasswordScreen"
				component={ForgotPasswordScreen}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer>
					<AppNavigator />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
