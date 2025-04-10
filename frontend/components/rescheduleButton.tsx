import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import apiRequest from "@/services/apiRequest";
import { showToast } from "@/utils/helperFunction";

const RescheduleComponent = ({ id }: { id: string }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleOpenModal = () => {
    setTempDate(new Date()); // reset picker value
    setMode("date");
    setShowModal(true);
    setShowPicker(true);
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      if (mode === "date") {
        // Move to time picking
        setTempDate((prev) => new Date(selectedDate));
        setMode("time");
        setShowPicker(true);
      } else {
        // Combine selected date and time
        const finalDate = new Date(tempDate);
        finalDate.setHours(selectedDate.getHours());
        finalDate.setMinutes(selectedDate.getMinutes());
        setDate(finalDate);
        setShowPicker(false);
      }
    } else {
      setShowPicker(false);
      setShowModal(false);
    }
  };

  const handleReschedule = async () => {
    try {
      await apiRequest.put(`/appointment/${id}`, {
        datetime: date,
        status: "Reschedule",
      });
      showToast("success", "Appointment rescheduled successfully");
      setShowModal(false);
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to reschedule appointment");
    }
  };

  return (
    <View className="">
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
                onPress={() => setShowModal(false)}
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
