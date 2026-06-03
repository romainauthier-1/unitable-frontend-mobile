import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { themeColors } from "../theme/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useIsFocused } from "@react-navigation/native";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function PlanningScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();

  const [planning, setPlanning] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // GESTION DES DATES
  // Date d'aujourd'hui
  const today = new Date();
  // Date d'aujourd'hui transformée
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  // Affichage des jours
  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  // Index du jour actuel
  const todayIndex = (today.getDay() + 6) % 7;
  // date de la semaine
  const currentWeekDate = new Date(today);
  currentWeekDate.setDate(today.getDate() + weekOffset * 7);

  const getDateForDay = (index) => {
    const date = new Date(currentWeekDate);
    date.setDate(currentWeekDate.getDate() + (index - todayIndex));
    return date;
  };

  const formatMinutes = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // Numéro de la semaine
  function getWeekNumber(date) {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  const weekNumber = getWeekNumber(currentWeekDate);

  const isToday = (date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  useEffect(() => {
    if (!user?._id || !token) return;

    fetch(`${process.env.EXPO_PUBLIC_BACK_URL}/planning/user/${user._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setPlanning(data.foundCTs);
      })
      .catch((err) => console.error(err));
  }, [user, token, isFocused]);

  const Tag = ({ label }) => (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Votre planning</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.planningNavBar}>
        <Pressable
          onPress={() => setWeekOffset((prev) => prev - 1)}
          style={styles.planningNavBarLeft}
        >
          <FontAwesomeIcon icon={faChevronLeft} color={themeColors.text} />
        </Pressable>
        <Text style={styles.weekText}>Semaine {weekNumber}</Text>
        <Pressable
          onPress={() => setWeekOffset((prev) => prev + 1)}
          style={styles.planningNavBarRight}
        >
          <FontAwesomeIcon icon={faChevronRight} color={themeColors.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: tabBarHeight,
        }}
      >
        {days.map((day, index) => {
          const date = getDateForDay(index);
          const dateStr = date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
          });

          const shifts = planning.filter(
            (p) =>
              new Date(p.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              }) === dateStr,
          );

          return (
            <View key={index} style={styles.daysContainer}>
              <Text style={[styles.day, isToday(date) && styles.today]}>
                {day} {dateStr}
              </Text>
              {shifts.length === 0 ? (
                <Text style={styles.emptyText}>Pas de shift</Text>
              ) : (
                shifts.map((shift) => (
                  <View key={shift._id} style={styles.shiftContainer}>
                    {/* <Text style={styles.shiftContainerText}>
											{shift.worker.firstName}{" "}
											{shift.worker.lastName}
										</Text> */}
                    <Text style={styles.shiftContainerText}>
                      <FontAwesomeIcon
                        icon={faClock}
                        size={10}
                        color={themeColors.shiftDark}
                      />{" "}
                      {formatMinutes(shift.startTime)} -{" "}
                      {formatMinutes(shift.endTime)}
                    </Text>
                    {/* <Text style={styles.shiftContainerText}> */}
                    {/* // Si pause === 0, ne pas afficher
											la partie pause */}
                    {shift.pause > 0 && (
                      <Text style={styles.shiftContainerText}>
                        Pause de {formatMinutes(shift.pause)} min
                      </Text>
                    )}
                    {/* </Text> */}

                    {/* <Text style={styles.shiftContainerText}>
											{shift.role.join(", ")}
										</Text> */}

                    {/* <View>
											{shift.role.map((role, index) => (
												<View
													key={index}
													style={{
														backgroundColor:
															themeColors.shiftDark,
														paddingHorizontal: 8,
														paddingVertical: 4,
														borderRadius: 12,
														display: "inline",
													}}
												>
													<Text
														style={{
															fontSize: 12,
															color: themeColors.shiftLight,
														}}
													>
														{role}
													</Text>
												</View>
											))}
										</View> */}

                    <View style={styles.tagContainer}>
                      {shift.role.map((role) => (
                        <Tag key={role} label={role} />
                      ))}
                    </View>

                    {/* <Text style={styles.shiftContainerText}>
											Pause : {formatMinutes(shift.pause)}
										</Text> */}
                  </View>
                ))
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.white,
    // backgroundColor: "red",
    paddingHorizontal: 24,
    paddingTop: 80,
    // paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  date: { fontSize: 14, color: themeColors.text, marginTop: 4 },
  planningNavBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: themeColors.background,
    // backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  weekText: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeColors.primary,
  },
  daysContainer: {
    // justifyContent: "space-between",
    marginTop: 24,
    // backgroundColor: "red",
    // borderColor: themeColors.lightGray,
    // borderWidth: 1,
    // borderRadius: 8,
    // padding: 16,
  },
  day: {
    fontSize: 14,
    color: themeColors.primary,
    marginBottom: 4,
    // fontWeight: "bold",
    // marginTop: 24,
  },
  today: {
    color: themeColors.primary,
    fontWeight: "bold",
    fontSize: 16,
    // backgroundColor: themeColors.primary + "20",
    // paddingBlockStart: 4,
    // paddingBlockEnd: 4,
    // paddingInline: 8,
    // borderRadius: 4,
  },
  emptyText: {
    fontStyle: "italic",
    color: themeColors.muted,
  },
  shiftContainer: {
    backgroundColor: themeColors.shiftLight,
    borderColor: themeColors.shift,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 8,
    // color: themeColors.text,
  },
  shiftContainerText: {
    color: themeColors.shiftDark,
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
    fontSize: 12,
  },
});
