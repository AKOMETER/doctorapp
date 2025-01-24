import React, { useState } from "react";
import { View, StyleSheet, Text, Platform, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Calendar({
  handleBook,
  isUpdate = false,
}: {
  handleBook: (datetime: string) => void;
  isUpdate?: boolean;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time" | null>("date");

  const handleChange = (event: any, date?: Date) => {
    if (date) {
      if (mode === "date") {
        // Update the date, keep the current time
        const updatedDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        );
        setSelectedDate(updatedDate);
        setMode("time"); // Switch to time picker
      } else if (mode === "time") {
        // Update the time, keep the current date
        const updatedDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          date.getHours(),
          date.getMinutes()
        );
        setSelectedDate(updatedDate);
        handleBook(updatedDate.toISOString()); // Send final date & time
        setMode(null); // Close the picker
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date & Time:</Text>
      {mode && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          minimumDate={new Date()} // Prevent past dates
          onChange={handleChange}
          display="default"
        />
      )}
      {!mode && (
        <>
          <Text
            style={styles.selectedText}
            onPress={() => setMode("date")} // Show picker again on tap
          >
            Selected: {selectedDate.toLocaleString()}
          </Text>

          <Button title={isUpdate ? "Update" : "Book Now"} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  selectedText: {
    fontSize: 16,
    color: "#007BFF",
    marginTop: 10,
  },
});
