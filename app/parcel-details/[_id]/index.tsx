import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import { parcels_data } from "@/utils/constants";

const ParcelDetails = () => {
  const { _id } = useLocalSearchParams();

  const parcel = parcels_data[Number(_id)];

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.wrapper}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <FontAwesome6 name="people-carry-box" size={30} color="#4A4A4A" />
            <Text style={styles.headerTitle}>Doctor ID {parcel.id}</Text>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{parcel.from.split(",")[0]}</Text>
              </View>
              <View style={styles.iconBlock}>
                <FontAwesome6 name="truck-ramp-box" size={28} color="white" />
                <Text style={styles.iconText}>{parcel.Patients}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={[styles.infoLabel, { textAlign: "right" }]}>Years Experience</Text>
                <Text style={[styles.infoValue, { textAlign: "right" }]}>
                  {parcel.years_experience} Yrs
                </Text>
              </View>
            </View>

            <View style={[styles.infoRow, { marginTop: 20 }]}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>{parcel.employment_period}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={[styles.infoLabel, { textAlign: "center" }]}>
                  Designation
                </Text>
                <Text style={[styles.infoValue, { textAlign: "center" }]}>
                  {parcel.Designation}
                </Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={[styles.infoLabel, { textAlign: "right" }]}>Status</Text>
                <Text style={[styles.infoValue, { textAlign: "right" }]}>
                  {parcel.status}
                </Text>
              </View>
            </View>
          </View>

          {/* About Doctor Section */}
          <View>
            <Text style={styles.sectionTitle}>About Doctor</Text>
            <View style={styles.timeline}>
              {parcel.aboutdoctor.reverse().map((item, index) => (
                <View key={index} style={styles.timelineItem}>
                  <Octicons
                    name="dot-fill"
                    size={25}
                    color={index === 0 ? "green" : "#a9cfff"}
                  />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>{item.info}</Text>
                    <Text style={styles.timelineSubtitle}>{item.experience}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 10,
    color: "#333",
  },
  infoCard: {
    backgroundColor: "#5151ff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoBlock: {
    minWidth: "30%",
  },
  infoLabel: {
    fontSize: 14,
    color: "#ddd",
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  iconBlock: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  timeline: {
    marginTop: 10,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  timelineContent: {
    marginLeft: 10,
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  timelineSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default ParcelDetails;
