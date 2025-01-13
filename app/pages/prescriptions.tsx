import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const Prescriptions = () => {
  const prescriptions = [
    {
      id: 1,
      doctor: "Dr. John Doe",
      patient: "Alice Brown",
      date: "2024-12-05",
      medicine: "Amoxicillin 500mg",
    },
    {
      id: 2,
      doctor: "Dr. Jane Smith",
      patient: "Bob White",
      date: "2024-12-08",
      medicine: "Paracetamol 650mg",
    },
    {
      id: 3,
      doctor: "Dr. Alan Brown",
      patient: "Charlie Green",
      date: "2024-12-10",
      medicine: "Ibuprofen 400mg",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prescriptions</Text>
      {prescriptions.map((prescription) => (
        <View key={prescription.id} style={styles.card}>
          <Image
            source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/free-prescription-icon-download-in-svg-png-gif-file-formats--medicine-medical-report-document-hand-services-pack-healthcare-icons-1607962.png" }}
            style={styles.avatar}
          />
          <View style={styles.cardContent}>
            <Text style={styles.patientName}>{prescription.patient}</Text>
            <Text style={styles.subText}>Doctor: {prescription.doctor}</Text>
            <Text style={styles.subText}>Date: {prescription.date}</Text>
            <Text style={styles.medicineName}>{prescription.medicine}</Text>
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
  medicineName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
});

export default Prescriptions;
