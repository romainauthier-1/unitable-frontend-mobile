import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { themeColors } from "../theme/colors";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

export default function HomeScreen() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [planning, setPlanning] = useState([]);
  const isFocused = useIsFocused();

  const formatMinutes = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const Tag = ({ label }) => (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );

  console.log(user);

  const today = dayjs();

  const formattedDate = today.format("ddd D MMMM");

  const getMyShifts = async (userId, token) => {
    try {
      const response = await fetch(
        `http://192.168.1.25:3000/planning/user/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const myShifts = await response.json();
      if (myShifts.result && myShifts.foundCTs.length === 0) {
        console.log("Pas de shifts");
        return;
      }

      if (myShifts.result && myShifts.foundCTs.length > 0) {
        setPlanning(myShifts.foundCTs);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isFocused && getMyShifts(user._id, token);
  }, [isFocused]);

  const shiftsOfTheDay = planning
    .filter((shift) => dayjs(shift.date).isSame(dayjs(today), "day"))
    .sort((a, b) => a.startTime - b.startTime);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bonjour {user.firstName} !</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Services du jour</Text>
      </View>
      {shiftsOfTheDay.length === 0 ? (
        <Text style={styles.emptyText}>Repos 😎</Text>
      ) : (
        shiftsOfTheDay.map((shift) => (
          <View key={shift._id} style={styles.shiftContainer}>
            <Text style={styles.shiftContainerText}>
              <FontAwesomeIcon
                icon={faClock}
                size={10}
                color={themeColors.shiftDark}
              />{" "}
              {formatMinutes(shift.startTime)} - {formatMinutes(shift.endTime)}
            </Text>
            {shift.pause > 0 ? (
              <Text style={styles.shiftContainerText}>
                Pause de {formatMinutes(shift.pause)} min
              </Text>
            ) : (
              <Text style={styles.shiftContainerText}>Pas de pause prévue</Text>
            )}

            <View style={styles.tagContainer}>
              {shift.role.map((role) => (
                <Tag key={role} label={role} />
              ))}
            </View>
          </View>
        ))
      )}
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
  title: { fontSize: 24, fontWeight: "bold", color: themeColors.primary },
  subtitle: {
    fontSize: 20,
    color: themeColors.primary,
    textAlign: "center",
    marginVertical: 30,
  },
  date: { fontSize: 14, color: themeColors.text, marginTop: 4 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  daysContainer: {
    marginTop: 24,
  },
  day: {
    fontSize: 14,
    color: themeColors.primary,
    marginBottom: 4,
  },
  today: {
    color: themeColors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    fontStyle: "italic",
    color: themeColors.muted,
    fontSize: 30,
    textAlign: "center",
    flex: 1,
  },
  shiftContainer: {
    backgroundColor: themeColors.shiftLight,
    borderColor: themeColors.shift,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 8,
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    // color: themeColors.text,
  },
  shiftContainerText: {
    color: themeColors.shiftDark,
    fontSize: 18,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: themeColors.shift + "50",

    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  tagText: {
    color: themeColors.shiftDark,
    fontSize: 15,
  },
});
