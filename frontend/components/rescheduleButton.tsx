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
  initialDate: string; // from backend or use new Date()
}

const RescheduleComponent = ({ id, getAppointment, initialDate }: Props) => {
  const [date, setDate] = useState<Date>(new Date(initialDate)); // confirmed reschedule date
  const [tempDate, setTempDate] = useState<Date>(new Date(initialDate)); // temporary for modal
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleOpenModal = () => {
    setTempDate(date); // pre-fill with current value
    setMode("date");
    setShowModal(true);
    setShowPicker(true);
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      if (mode === "date") {
        const updatedDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          tempDate.getHours(),
          tempDate.getMinutes()
        );
        setTempDate(updatedDate);

        // Switch to time after short delay to ensure picker remounts
        setShowPicker(false);
        setTimeout(() => {
          setMode("time");
          setShowPicker(true);
        }, 50);
      } else {
        const updated = new Date(tempDate);
        updated.setHours(selectedDate.getHours());
        updated.setMinutes(selectedDate.getMinutes());
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
      setDate(tempDate); // commit final value
      showToast("success", "Appointment rescheduled successfully");
      setShowModal(false);
      getAppointment();
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to reschedule appointment");
    }
  };
  console.log("date", date, "tempDate", tempDate, "mode", mode);
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
