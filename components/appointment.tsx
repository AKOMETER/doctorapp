// Appointment.tsx
import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiRequest from "@/services/apiRequest";
import { useSidebar } from "@/context/SidebarContext";
import { AppointmentType } from "@/utils/dataTypes";

export default function Appointment() {
  const { user } = useSidebar();
  const [appointmentsList, setAppointmentsList] = useState<AppointmentType[]>(
    []
  );
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<AppointmentType | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await apiRequest.get(`/appointment/${user?.id}`);
      setAppointmentsList(res.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch appointments.");
    }
  };

  const handleDeleteAppointment = (id: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await apiRequest.delete(`/appointment/${id}`);
              Alert.alert("Deleted", "Appointment deleted successfully");
              fetchAppointments();
            } catch (err) {
              Alert.alert("Error", "Failed to delete appointment");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {showUpdateForm && currentAppointment ? (
        <UpdateAppointmentForm
          appointment={currentAppointment}
          onClose={() => {
            setShowUpdateForm(false);
            setCurrentAppointment(null);
          }}
          onUpdated={() => {
            setShowUpdateForm(false);
            setCurrentAppointment(null);
            fetchAppointments();
          }}
        />
      ) : (
        appointmentsList.map((appointment) => (
          <View key={appointment.id} style={styles.card}>
            <View style={styles.iconsContainer}>
              <MaterialIcons
                name="edit"
                size={24}
                color="blue"
                onPress={() => {
                  setCurrentAppointment(appointment);
                  setShowUpdateForm(true);
                }}
              />
              <MaterialIcons
                name="delete"
                size={24}
                color="red"
                onPress={() => handleDeleteAppointment(appointment.id)}
              />
            </View>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JGmDTLjVbkHk2YKLyc4yOEgIPahk0aJo4Q&s",
              }}
              style={styles.avatar}
            />
            <View style={styles.cardContent}>
              <Text style={styles.patientName}>
                Dr. {appointment.Doctor.firstName} {appointment.Doctor.lastName}
              </Text>
              <Text style={styles.subText}>
                Date: {new Date(appointment.dateTime).toLocaleString()}
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
        ))
      )}
    </ScrollView>
  );
}

function UpdateAppointmentForm({
  appointment,
  onClose,
  onUpdated,
}: {
  appointment: AppointmentType;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(appointment.dateTime)
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const handleDateTimeChange = (event: any, date?: Date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleUpdateAppointment = async () => {
    try {
      await apiRequest.put(`/appointment/${appointment.id}`, {
        datetime: selectedDate.toISOString(),
      });
      Alert.alert("Updated", "Appointment updated successfully");
      onUpdated();
    } catch (err) {
      Alert.alert("Error", "Failed to update appointment");
    }
  };

  return (
    <View style={styles.updateFormContainer}>
      <Text style={styles.updateTitle}>
        Update Appointment for Dr. {appointment.Doctor.firstName}{" "}
        {appointment.Doctor.lastName}
      </Text>
      <Text style={styles.subText}>Selected Date & Time:</Text>

      <View style={styles.dateTimeRow}>
        <MaterialIcons name="event" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>{selectedDate.toLocaleString()}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            setPickerMode("date");
            setShowDatePicker(true);
          }}
        >
          <Text style={styles.selectBtn}>📅 Change Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPickerMode("time");
            setShowDatePicker(true);
          }}
        >
          <Text style={styles.selectBtn}>⏰ Change Time</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          mode={pickerMode}
          display="default"
          value={selectedDate}
          onChange={handleDateTimeChange}
        />
      )}

      <View style={styles.buttonRow}>
        <Text style={styles.saveBtn} onPress={handleUpdateAppointment}>
          ✅ Save Changes
        </Text>
        <Text style={styles.cancelBtn} onPress={onClose}>
          ❌ Cancel
        </Text>
      </View>
    </View>
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
    marginTop: 4,
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
    flexDirection: "row-reverse",
    marginHorizontal: 8,
  },
  updateFormContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  selectBtn: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveBtn: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelBtn: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
});
