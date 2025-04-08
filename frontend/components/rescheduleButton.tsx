import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import apiRequest from "@/services/apiRequest";
import { showToast } from "@/utils/helperFunction";

const RescheduleComponent = ({ id }: { id: string }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"date" | "time" | undefined>(undefined);
  const [show, setShow] = useState<boolean>(false);

  const showPicker = (pickerMode: "date" | "time") => {
    setMode(pickerMode);
    setShow(true);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShow(false);
  };

  const handleReschedule = async () => {
    try {
      await apiRequest.put(`/appointment/${id}`, { datetime: date });
      showToast("success", "Appointment rescheduled successfully");
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to reschedule appointment");
    }
  };

  return (
    <View>
      <Pressable onPress={() => showPicker("date")}>
        <Text className="my-3 rounded-3xl w-full m-0 p-4 text-center text-white bg-blue-500">
          Pick Date
        </Text>
      </Pressable>

      <Pressable onPress={() => showPicker("time")}>
        <Text className="my-3 rounded-3xl w-full m-0 p-4 text-center text-white bg-green-500">
          Pick Time
        </Text>
      </Pressable>

      <Pressable onPress={handleReschedule}>
        <Text className="my-3 rounded-3xl w-full m-0 p-4 text-center text-white bg-indigo-500">
          Confirm Reschedule
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default RescheduleComponent;
