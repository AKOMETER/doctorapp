import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import apiRequest from "@/services/apiRequest";
import { showToast } from "@/utils/helperFunction";

interface Props {
  id: string;
  getAppointment: () => void;
  initialDate?: string; // optional, fallback to today
}

// Utility: force local date from string (no timezone shift)
const parseLocalDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const RescheduleComponent = ({ id, getAppointment, initialDate }: Props) => {
  const now = new Date();
  const fallbackDate =
    initialDate && !isNaN(Date.parse(initialDate))
      ? new Date(initialDate)
      : now;

  const [date, setDate] = useState<Date>(fallbackDate);
  const [tempDate, setTempDate] = useState<Date>(fallbackDate);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleOpenModal = () => {
    setTempDate(date);
    setMode("date");
    setShowModal(true);
    setShowPicker(true);
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      if (mode === "date") {
        // prevent selecting a past date
        const today = new Date();
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          showToast("error", "Cannot select a past date");
          return;
        }

        const updated = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          tempDate.getHours(),
          tempDate.getMinutes()
        );

        setTempDate(updated);
        setShowPicker(false);
        setTimeout(() => {
          setMode("time");
          setShowPicker(true);
        }, 50);
      } else {
        const updated = new Date(tempDate);
        updated.setHours(selectedDate.getHours());
        updated.setMinutes(selectedDate.getMinutes());

        // prevent selecting past time if same day
        if (
          updated.toDateString() === new Date().toDateString() &&
          updated < new Date()
        ) {
          showToast("error", "Cannot select a past time");
          return;
        }

        setTempDate(updated);
        setShowPicker(false);
      }
    } else {
      setShowPicker(false);
    }
  };

  const handleReschedule = async () => {
    try {
      await apiRequest.put(`/appointment/${id}`, {
        datetime: tempDate,
        status: "Reschedule",
      });

      setDate(tempDate);
      showToast("success", "Appointment rescheduled successfully");
      setShowModal(false);
      getAppointment();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to reschedule appointment");
    }
  };

  return (
    <View>
      <Pressable onPress={handleOpenModal}>
        <Text className="my-3 rounded-3xl w-full m-0 p-4 text-center text-white bg-blue-500">
          Reschedule Appointment
        </Text>
      </Pressable>

      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white p-6 rounded-2xl w-[90%]">
            <Text className="text-lg font-semibold text-center mb-4">
              Select New Date & Time
            </Text>

            <Text className="text-center text-gray-700 mb-4">
              {tempDate.toLocaleString()}
            </Text>

            {showPicker && (
              <DateTimePicker
                value={tempDate}
                mode={mode}
                is24Hour={true}
                display="default"
                minimumDate={new Date()}
                onChange={handleChange}
              />
            )}

            <View className="mt-6 flex-row justify-between">
              <Pressable
                onPress={() => {
                  setShowModal(false);
                  setShowPicker(false);
                }}
                className="bg-red-500 rounded-xl px-6 py-3"
              >
                <Text className="text-white text-center">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleReschedule}
                className="bg-green-600 rounded-xl px-6 py-3"
              >
                <Text className="text-white text-center">Reschedule</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RescheduleComponent;
