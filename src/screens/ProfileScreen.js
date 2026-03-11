import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/Auth";
import { themeColors } from "../theme/colors";

export default function ProfileScreen() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<View style={styles.container}>
			<Text>Profil</Text>

			<TouchableOpacity style={styles.button} onPress={handleLogout}>
				<Text style={styles.buttonText}>Déconnexion</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: themeColors.white,
		paddingHorizontal: 24,
		paddingTop: 80,
	},
	button: {
		backgroundColor: themeColors.primary,
		padding: 16,
		borderRadius: 10,
	},
	buttonText: {
		color: themeColors.white,
		fontWeight: "bold",
		textAlign: "center",
	},
});
