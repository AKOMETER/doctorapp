import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AppointmentType } from "@/utils/dataTypes";
import apiRequest from "@/services/apiRequest";
import Toast from "react-native-toast-message";

export default function DoctorAdmin() {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentType | null>(null);
  const [updatedRemark, setUpdatedRemark] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      title: "Doctor Admin",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await apiRequest.get("/appointment/focus");
      setAppointments(res?.data?.data);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleModify = (appointment: AppointmentType) => {
    setSelectedAppointment(appointment);
    setUpdatedRemark(appointment.remarks || "");
    setUpdatedStatus(appointment.status || "");
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!selectedAppointment) return;

    try {
      await apiRequest.put(`/appointment/${selectedAppointment.id}`, {
        remark: updatedRemark,
        status: updatedStatus,
      });
      fetchAppointments();
      setModalVisible(false);
      Alert.alert("Success", "Appointment updated");
    } catch (err) {
      Alert.alert("Error", "Failed to update appointment");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00b4d8" />;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/pages/doctorEdit")}
        style={styles.modifyBtn}
      >
        <Text style={{ color: "#fff" }}>Modify</Text>
      </TouchableOpacity>

      {appointments.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>
            Patient: {item.Patient?.firstName} {item.Patient?.lastName}
          </Text>
          <Text>
            Doctor: {item.Doctor?.firstName} {item.Doctor?.lastName}
          </Text>
          <Text>Status: {item.status}</Text>
          <Text>Remark: {item.remarks}</Text>
          <Text>Date: {new Date(item.dateTime).toLocaleString()}</Text>
          <TouchableOpacity
            onPress={() => handleModify(item)}
            style={styles.modifyBtn}
          >
            <Text style={{ color: "#fff" }}>Modify</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Update Appointment</Text>

            <Text style={styles.label}>Status:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={updatedStatus}
                onValueChange={(value) => setUpdatedStatus(value)}
              >
                <Picker.Item label="Select status" value="" />
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Confirmed" value="Confirmed" />
                <Picker.Item label="Cancelled" value="Cancelled" />
                <Picker.Item label="Completed" value="Completed" />
              </Picker>
            </View>

            <Text style={styles.label}>Remark:</Text>
            <TextInput
              value={updatedRemark}
              onChangeText={setUpdatedRemark}
              style={styles.input}
              placeholder="Enter remark"
              multiline
            />

            <View style={styles.modalActions}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  modifyBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00b4d8",
    borderRadius: 5,
    alignItems: "center",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
    minHeight: 60,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
