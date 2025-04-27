import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import Modal DateTime Picker
import dayjs from "dayjs";

export default function Calendar({
  handleBook,
  id,
}: {
  handleBook: (datetime: string, duration: number, reason: string) => void;
  id: string;
}) {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Use dayjs for selected date
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Show date picker
  const [isTimePickerVisible, setTimePickerVisible] = useState(false); // Show time picker
  const [duration, setDuration] = useState("30"); // Duration state
  const [reason, setReason] = useState(""); // Reason state

  // Handle date and time changes
  const handleDateTimeChange = (date: Date, mode: "date" | "time") => {
    let updatedDate = dayjs(date);

    // If the time picker was used, update the time part only
    if (mode === "time") {
      updatedDate = updatedDate
        .set("year", selectedDate.year())
        .set("month", selectedDate.month())
        .set("date", selectedDate.date());
    }
    setSelectedDate(updatedDate); // Update the selected date
  };

  // Show the date picker modal
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  // Show the time picker modal
  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleFinalSubmit = () => {
    handleBook(selectedDate.toISOString(), parseInt(duration), reason);
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-5">
      <Text className="text-lg font-bold text-gray-800 mb-3">
        Select Date & Time:
      </Text>

      <Text className="text-base text-blue-600 mb-4">
        {selectedDate.format("YYYY-MM-DD HH:mm")} {/* Display selected date */}
      </Text>

      <View className="flex flex-row space-x-3 mb-4">
        <View className="m-3">
          <Button title="Pick Date" onPress={showDatePicker} />
        </View>

        <View className="m-3">
          <Button title="Pick Time" onPress={showTimePicker} />
        </View>
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(selectedDate.toString())}
        onConfirm={(date) => {
          handleDateTimeChange(date, "date");
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        date={new Date(selectedDate.toString())}
        onConfirm={(date) => {
          handleDateTimeChange(date, "time");
          hideTimePicker();
        }}
        onCancel={hideTimePicker}
      />

      <Text className="text-lg font-bold text-gray-800 mb-1">
        Duration (minutes):
      </Text>
      <TextInput
        className="border border-gray-300 bg-white rounded-md p-3 w-full text-center text-base mb-4"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
      />

      <Text className="text-lg font-bold text-gray-800 mb-1">Reason:</Text>
      <TextInput
        className="border border-gray-300 bg-white rounded-md p-3 w-full text-center text-base mb-6"
        keyboardType="default"
        value={reason}
        onChangeText={setReason}
        placeholder="Enter reason"
      />

      <Button title="Book Now" onPress={handleFinalSubmit} />
    </View>
  );
}
