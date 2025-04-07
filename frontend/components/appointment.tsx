import { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiRequest from "@/services/apiRequest";
import { useSidebar } from "@/context/SidebarContext";
import { AppointmentType } from "@/utils/dataTypes";
import { showToast } from "@/utils/helperFunction";
import StatusBadge from "./StatusBadge";
import { useRouter } from "expo-router";

export default function Appointment() {
  const { user } = useSidebar();
  const [appointmentsList, setAppointmentsList] = useState<AppointmentType[]>(
    []
  );
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<AppointmentType | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await apiRequest.get(`/appointment/${user?.id}`);
      if (res) setAppointmentsList(res?.data.data);
    } catch (error) {
      showToast("error", "Error", "Failed to fetch appointments.");
    }
  };

  const confirmDeleteAppointment = (id: string) => {
    setSelectedDeleteId(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteAppointment = async () => {
    try {
      await apiRequest.delete(`/appointment/${selectedDeleteId}`);
      showToast("success", "Cancelled", "Appointment cancelled successfully");
      fetchAppointments();
    } catch (err) {
      showToast("error", "Error", "Failed to cancel appointment");
    } finally {
      setDeleteModalVisible(false);
      setSelectedDeleteId(null);
    }
  };
  const router = useRouter();
  return (
    <ScrollView className="bg-gray-100 p-4">
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
          <Pressable
            onPress={() => {
              router.push(`/pages/appointments/${appointment?.id}`);
            }}
            key={appointment.id}
            className="bg-white rounded-xl p-4 mb-4 shadow flex-row items-center justify-between"
          >
            <View className="flex-row space-x-2 items-center">
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JGmDTLjVbkHk2YKLyc4yOEgIPahk0aJo4Q&s",
                }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <Text className="text-lg font-semibold text-gray-800">
                  Dr.{" "}
                  {appointment?.Doctor?.firstName ||
                    appointment?.Doctor?.user?.lastName}{" "}
                  {appointment?.Doctor?.lastName ||
                    appointment?.Doctor?.user?.firstName}
                </Text>
                <Text className="text-sm text-gray-600">
                  Date: {new Date(appointment.dateTime).toLocaleString()}
                </Text>
                {appointment?.status && (
                  <StatusBadge
                    status={
                      appointment?.status as
                        | "pending"
                        | "confirmed"
                        | "cancelled"
                        | "completed"
                    }
                  />
                )}
              </View>
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => {
                  setCurrentAppointment(appointment);
                  setShowUpdateForm(true);
                }}
              >
                <MaterialIcons name="edit" size={24} color="blue" />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => confirmDeleteAppointment(appointment?.id || "")}
              >
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity> */}
            </View>
          </Pressable>
        ))
      )}

      {/* Delete Confirmation Modal */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-white p-6 rounded-xl w-11/12 max-w-md">
            <Text className="text-lg font-bold text-center mb-3">
              Confirm Cancellation
            </Text>
            <Text className="text-center text-gray-700 mb-5">
              Are you sure you want to cancel this appointment?
            </Text>

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-red-600 px-4 py-2 rounded-md"
                onPress={handleDeleteAppointment}
              >
                <Text className="text-white font-semibold">Yes, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-300 px-4 py-2 rounded-md"
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text className="text-gray-800 font-semibold">Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
      showToast("success", "Updated", "Appointment updated successfully");
      onUpdated();
    } catch (err) {
      showToast("error", "Error", "Failed to update appointment");
    }
  };

  return (
    <View className="bg-white p-5 rounded-xl mx-4 mt-4">
      <Text className="text-xl font-bold mb-4">
        Update Appointment for Dr. {appointment?.Doctor?.firstName}{" "}
        {appointment?.Doctor?.lastName}
      </Text>
      <Text className="text-sm text-gray-600">Selected Date & Time:</Text>

      <View className="flex-row items-center space-x-2 mt-2">
        <MaterialIcons name="event" size={20} />
        <Text>{selectedDate.toLocaleString()}</Text>
      </View>

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          onPress={() => {
            setPickerMode("date");
            setShowDatePicker(true);
          }}
        >
          <Text className="text-blue-600 font-semibold">📅 Change Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPickerMode("time");
            setShowDatePicker(true);
          }}
        >
          <Text className="text-blue-600 font-semibold">⏰ Change Time</Text>
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

      <View className="flex-row justify-between mt-6">
        <TouchableOpacity onPress={handleUpdateAppointment}>
          <Text className="text-green-600 font-bold">✅ Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-red-600 font-bold">❌ Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
