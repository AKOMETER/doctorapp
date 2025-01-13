import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const Appointments = () => {
  const appointments = [
    { id: 1, patient: "John Doe", status: "Confirmed", date: "2024-12-10" },
    { id: 2, patient: "Jane Smith", status: "Pending", date: "2024-12-11" },
    { id: 3, patient: "Alice Brown", status: "Cancelled", date: "2024-12-12" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      {appointments.map((appointment) => (
        <View key={appointment.id} style={styles.card}>
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JGmDTLjVbkHk2YKLyc4yOEgIPahk0aJo4Q&s" }}
            style={styles.avatar}
          />
          <View style={styles.cardContent}>
            <Text style={styles.patientName}>{appointment.patient}</Text>
            <Text style={styles.subText}>Date: {appointment.date}</Text>
            <Text
              style={[
                styles.status,
                appointment.status === "Confirmed"
                  ? styles.confirmed
                  : appointment.status === "Pending"
                  ? styles.pending
                  : styles.cancelled,
              ]}
            >
              {appointment.status}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  confirmed: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  cancelled: {
    color: "red",
  },
});

export default Appointments;
