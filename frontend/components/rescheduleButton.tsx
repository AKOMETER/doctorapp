import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiRequest from "@/services/apiRequest";
import { showToast } from "@/utils/helperFunction";
import Toast from "react-native-toast-message";

interface Props {
  id: string;
  getAppointment: () => void;
  initialDate?: string;
}

const RescheduleComponent = ({ id, getAppointment, initialDate }: Props) => {
  const now = new Date();
  const baseDate =
    initialDate && !isNaN(Date.parse(initialDate))
      ? new Date(initialDate)
      : now;

  const [date, setDate] = useState<Date>(baseDate);
  const [tempDate, setTempDate] = useState<Date>(baseDate);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const openRescheduleModal = () => {
    setTempDate(date);
    setShowModal(true);
    setShowDatePicker(true);
    setShowTimePicker(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const onDatePicked = (event: any, selected?: Date) => {
    if (event.type === "dismissed") {
      closeModal();
      return;
    }

    if (selected) {
      const newDate = new Date(selected);
      newDate.setHours(tempDate.getHours(), tempDate.getMinutes());

      if (newDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        showToast("error", "Cannot select a past date");
        return;
      }

      setTempDate(newDate);
      setShowDatePicker(false);
      setShowTimePicker(true);
    }
  };

  const onTimePicked = (_: any, selected?: Date) => {
    setShowTimePicker(false);
    if (selected) {
      const updated = new Date(tempDate);
      updated.setHours(selected.getHours(), selected.getMinutes());

      if (
        updated.toDateString() === new Date().toDateString() &&
        updated < new Date()
      ) {
        showToast("error", "Cannot select a past time");
        return;
      }

      setTempDate(updated);
    } else {
      closeModal();
    }
  };

  const handleReschedule = async () => {
    try {
      await apiRequest.put(`/appointment/${id}`, {
        dateTime: tempDate,
        status: "Reschedule",
      });

      setDate(tempDate);
      showToast("success", "Appointment rescheduled successfully");
      closeModal();
      getAppointment();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to reschedule appointment");
    }
  };

  return (
    <View>
      <Pressable onPress={openRescheduleModal}>
        <Text className="my-3 rounded-3xl w-full m-0 p-4 text-center text-white bg-blue-500">
          Reschedule Appointment
        </Text>
      </Pressable>

      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white p-6 rounded-2xl w-[90%]">
            <Text className="text-lg font-semibold text-center mb-4">
              Reschedule Appointment
            </Text>

            <Text className="text-center text-gray-700 mb-4">
              {tempDate.toLocaleString()}
            </Text>

            {showDatePicker && (
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={onDatePicked}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={tempDate}
                mode="time"
                display="default"
                is24Hour
                onChange={onTimePicked}
              />
            )}

            <View className="mt-6 flex-row justify-between">
              <Pressable
                onPress={closeModal}
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
