import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ setUser }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bienvenue !</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setUser(false)}
			>
				<Text style={styles.buttonText}>Déconnexion</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
	button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10 },
	buttonText: { color: "#fff", fontWeight: "bold" },
});
