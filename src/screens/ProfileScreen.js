import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../reducers/Auth";
import { themeColors } from "../theme/colors";
import { useState } from "react";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [focus, setFocus] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdate = async () => {
    const response = await fetch(
      `https://unitable-backend.vercel.app/employee/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
        }),
      },
    );

    const data = await response.json();

    if (data.result) {
      console.log("Utilisateur mis à jour :", data.employee);
    }

    dispatch(updateUser(data.employee));
  };

  return (
    <View style={styles.container}>
      <Text>Profil</Text>

      <View style={styles.row}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: focus ? themeColors.primary : themeColors.lightGray,
            },
          ]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Prénom"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          cursorColor={themeColors.primary}
          selectionColor={themeColors.primary}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonQuit} onPress={handleLogout}>
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
  buttonQuit: {
    backgroundColor: themeColors.destructive,
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: themeColors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    flex: 1,
    backgroundColor: themeColors.white,
    borderColor: themeColors.lightGray,
    borderWidth: 1,
    paddingTop: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    // marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },

  saveButton: {
    backgroundColor: themeColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
