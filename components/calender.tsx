import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Button,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Calendar({
  handleBook,
}: {
  handleBook: (datetime: string, duration: number, reason: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time" | null>("date");
  const [duration, setDuration] = useState("30"); // default duration in minutes (string to bind with TextInput)
  const [reason, setReason] = useState("");

  const handleChange = (event: any, date?: Date) => {
    if (date) {
      if (mode === "date") {
        const updatedDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        );
        setSelectedDate(updatedDate);
        setMode("time");
      } else if (mode === "time") {
        const updatedDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          date.getHours(),
          date.getMinutes()
        );
        setSelectedDate(updatedDate);
        setMode(null); // Picker done
      }
    }
  };

  const handleFinalSubmit = () => {
    handleBook(selectedDate.toISOString(), parseInt(duration), reason);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date & Time:</Text>

      {mode && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          minimumDate={new Date()}
          onChange={handleChange}
          display="default"
        />
      )}

      {!mode && (
        <>
          <Text style={styles.selectedText} onPress={() => setMode("date")}>
            Selected: {selectedDate.toLocaleString()}
          </Text>

          <Text style={styles.label}>Duration (minutes):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter duration"
          />

          <Text style={styles.label}>Reason :</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            value={reason}
            onChangeText={setReason}
            placeholder="Enter Reason"
          />

          <Button title={"Book Now"} onPress={handleFinalSubmit} />
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
    marginTop: 15,
    color: "#333",
  },
  selectedText: {
    fontSize: 16,
    color: "#007BFF",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "100%",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
