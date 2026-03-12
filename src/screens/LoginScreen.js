import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Dimensions,
} from "react-native";
import { themeColors } from "../theme/colors";
import { useState, useContext } from "react";
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import { login } from "../reducers/Auth";
const { EXPO_BACK_URL } = Constants.expoConfig.extra;

// const BACK_URL = process.env.EXPO_BACK_URL;
// console.log("EXPO_BACK_URL:", EXPO_BACK_URL);

const screenHeight = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [focus, setFocus] = useState(false);

	const dispatch = useDispatch();

	const validateInputs = () => {
		if (!email || !password) {
			setErrorMessage("L'email ou le mot de passe invalide.");
			return false;
		}
		return true;
	};

	const handleLogin = async () => {
		setErrorMessage("");
		if (!validateInputs()) return;

		try {
			const response = await fetch(
				`http://192.168.1.25:3000/users/signin`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				},
			);

			const data = await response.json();

			if (data.result) {
				// setUser(true);
				dispatch(
					login({
						user: data.user,
						token: data.token,
					}),
				);

				// console.log("Login successful:", data);
			} else {
				setErrorMessage(
					data.message || "L'email ou le mot de passe est invalide.",
				);
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>UniTable</Text>
				<Text style={styles.subtitle}>
					Tout ce dont vous avez besoin pour votre journée de travail,
					accessible en un instant.
				</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.contentHeader}>
					<Text style={styles.contentHeaderTitle}>
						Connectez-vous.
					</Text>
					<Text style={styles.contentHeaderSubtitle}>
						Pour accéder à votre espace employé.
					</Text>
				</View>

				<View>
					{/*  sert à regrouper le formulaire */}
					<View>
						<Text style={styles.label}>Email</Text>

						<TextInput
							style={[
								styles.input,
								{
									borderColor:
										focus === "email"
											? themeColors.primary
											: themeColors.lightGray,
								},
							]}
							placeholder="jean.dupont@mail.com"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
							onFocus={() => setFocus("email")}
							onBlur={() => setFocus(null)}
							cursorColor={themeColors.primary}
							selectionColor={themeColors.primary}
						/>
					</View>
					<View style={{ marginBottom: 24 }} />
					<View>
						<Text style={styles.label}>Mot de passe</Text>

						<TextInput
							style={[
								styles.input,
								{
									borderColor:
										focus === "password"
											? themeColors.primary
											: themeColors.lightGray,
								},
							]}
							placeholder="************"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							onFocus={() => setFocus("password")}
							onBlur={() => setFocus(null)}
							cursorColor={themeColors.primary}
							selectionColor={themeColors.primary}
						/>
					</View>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("ForgotPasswordScreen")
						}
					>
						<Text style={styles.forgotPassword}>
							Mot de passe oublié?
						</Text>
					</TouchableOpacity>
					{errorMessage !== "" && (
						<Text style={styles.errorText}>{errorMessage}</Text>
					)}
				</View>

				<View style={{ marginBottom: 24 }} />

				<TouchableOpacity
					style={styles.buttonPrimary}
					onPress={handleLogin}
				>
					<Text style={styles.buttonPrimaryText}>Se connecter</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: themeColors.primary,
	},
	header: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 16,
		color: themeColors.white,
	},
	subtitle: {
		color: themeColors.white,
		textAlign: "center",
	},
	content: {
		justifyContent: "space-between",
		backgroundColor: themeColors.white,
		borderTopLeftRadius: 48,
		borderTopRightRadius: 48,
		width: "100%",
		padding: 40,
		minHeight: screenHeight * 0.6,
	},
	contentHeader: {
		marginBottom: 32,
		color: themeColors.primary,
	},
	contentHeaderTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: themeColors.primary,
	},
	contentHeaderSubtitle: {
		color: themeColors.primary,
	},
	label: {
		color: themeColors.primary,
		marginBottom: 8,
		fontWeight: "bold",
	},
	input: {
		width: "100%",
		backgroundColor: themeColors.white,
		borderColor: themeColors.lightGray,
		borderWidth: 1,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 12,
		paddingRight: 12,
		borderRadius: 8,
		marginBottom: 8,
	},
	errorText: {
		color: "red",
		marginTop: 8,
	},
	buttonPrimary: {
		backgroundColor: themeColors.primary,
		padding: 16,
		borderRadius: 10,
	},
	buttonPrimaryText: {
		color: themeColors.white,
		fontWeight: "bold",
		textAlign: "center",
	},
	forgotPassword: {
		color: themeColors.primary,
		textDecorationLine: "underline",
		textAlign: "right",
	},
});
