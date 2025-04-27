import React, { useState, useCallback } from "react";
import { View, Text, Button, TextInput, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Calendar({
  handleBook,
  id,
}: {
  handleBook: (datetime: string, duration: number, reason: string) => void;
  id: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // State to store selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // Show date picker
  const [showTimePicker, setShowTimePicker] = useState(false); // Show time picker
  const [duration, setDuration] = useState("30"); // Duration state
  const [reason, setReason] = useState(""); // Reason state

  // This function handles both date and time changes
  const handleDateTimeChange = useCallback(
    (event: any, date?: Date, mode?: "date" | "time") => {
      if (event.type === "dismissed") {
        if (mode === "date") setShowDatePicker(false);
        if (mode === "time") setShowTimePicker(false);
        return;
      }
      if (date) {
        const updatedDate = new Date(selectedDate);

        // Update only the date part or time part based on what is being selected
        if (mode === "date") {
          updatedDate.setFullYear(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
        } else if (mode === "time") {
          updatedDate.setHours(date.getHours(), date.getMinutes(), 0, 0);
        }

        setSelectedDate(updatedDate); // Update state with the new date
      }

      // Close the picker after selecting a date or time
      if (mode === "date") setShowDatePicker(false);
      if (mode === "time") setShowTimePicker(false);
    },
    [selectedDate]
  );

  const handleFinalSubmit = () => {
    handleBook(selectedDate.toISOString(), parseInt(duration), reason);
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-5">
      <Text className="text-lg font-bold text-gray-800 mb-3">
        Select Date & Time:
      </Text>

      <Text className="text-base text-blue-600 mb-4">
        {selectedDate.toLocaleString()} {/* Display selected date */}
      </Text>

      <View className="flex flex-row space-x-3 mb-4">
        <View className="m-3">
          <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
        </View>

        <View className="m-3">
          <Button title="Pick Time" onPress={() => setShowTimePicker(true)} />
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate} // Keep selected date for picker
          mode="date"
          minimumDate={new Date()} // Allow selecting only future dates
          onChange={(event, date) => handleDateTimeChange(event, date, "date")}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedDate} // Keep selected date for picker
          mode="time"
          onChange={(event, date) => handleDateTimeChange(event, date, "time")}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}

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
