import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPassword";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ setUser }) {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="Home">
				{(props) => <HomeScreen {...props} setUser={setUser} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
}

export default function App() {
	const [user, setUser] = useState(false);

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{user ? (
					<Stack.Screen name="Main">
						{(props) => <MainTabs {...props} setUser={setUser} />}
					</Stack.Screen>
				) : (
					<Stack.Screen name="Login">
						{(props) => (
							<LoginScreen {...props} setUser={setUser} />
						)}
					</Stack.Screen>
				)}
				<Stack.Screen
					name="ForgotPassword"
					component={ForgotPasswordScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
