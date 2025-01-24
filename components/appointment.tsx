import { useState } from "react";
import { Image, StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Material UI Icons
import Calendar from "./calender";
import { appointments as initialAppointments } from "@/utils/data"; // Assuming your appointments data is imported
import { useSidebar } from "@/context/SidebarContext"; // Assuming you're using this context for user data

export default function Appointment() {
  const { user } = useSidebar(); // Get the user from SidebarContext
  const [appointmentsList, setAppointmentsList] = useState(initialAppointments);
  const [showPicker, setShowPicker] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // Handle updating the appointment date
  const handleUpdateDate = (datetime: string) => {
    setAppointmentsList((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === currentAppointment.id
          ? { ...appointment, date: datetime }
          : appointment
      )
    );
    setShowPicker(false); // Hide the picker
    setCurrentAppointment(null); // Reset current appointment
    Alert.alert("Success", "Appointment date updated!");
  };

  // Handle deleting an appointment
  const handleDeleteAppointment = (appointmentId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setAppointmentsList((prevAppointments) =>
              prevAppointments.filter(
                (appointment) => appointment.id !== appointmentId
              )
            );
            Alert.alert("Success", "Appointment deleted!");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {showPicker ? (
        <Calendar handleBook={handleUpdateDate} isUpdate={true} />
      ) : (
        <View style={styles.container}>
          {appointmentsList.map((appointment) => (
            <View key={appointment.id} style={styles.card}>
              <View style={styles.iconsContainer}>
                {/* Update Button (with Icon) */}
                <MaterialIcons
                  name="edit"
                  size={24}
                  color="blue"
                  onPress={() => {
                    setCurrentAppointment(appointment); // Set the current appointment for updating
                    setShowPicker(true); // Show date-time picker
                  }}
                />
                {/* Delete Button (with Icon) */}
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="red"
                  onPress={() => handleDeleteAppointment(appointment.id)} // Handle delete
                />
              </View>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JGmDTLjVbkHk2YKLyc4yOEgIPahk0aJo4Q&s",
                }}
                style={styles.avatar}
              />
              <View style={styles.cardContent}>
                <Text style={styles.patientName}>{appointment.patient}</Text>
                <Text style={styles.subText}>
                  Date: {new Date(appointment.date).toLocaleString()}
                </Text>
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
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row-reverse",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 12,
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
  iconsContainer: {
    flexDirection: "row-reverse", // Align icons to the left
    marginRight: 8,
    marginLeft: 8,
  },
});
