import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Option {
  label: string;
  value: string;
}

interface BasicInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  type?: "text" | "select";
  options?: Option[];
}

const BasicInput: React.FC<BasicInputProps> = ({
  label,
  value,
  onChangeText,
  multiline = false,
  type = "text",
  options = [],
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {type === "select" ? (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChangeText(itemValue)}
            style={Platform.OS === "ios" ? undefined : styles.picker}
          >
            <Picker.Item label="Select Year" value="" />
            {options.map((opt) => (
              <Picker.Item
                key={opt.value}
                label={opt.label}
                value={opt.value}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          {...rest}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default BasicInput;
