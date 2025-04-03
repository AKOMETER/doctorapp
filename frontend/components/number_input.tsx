import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface NumberInputProps
  extends Omit<TextInputProps, "onChange" | "value" | "onChangeText"> {
  value: string | number;
  onChangeValue: (val: number | string) => void;
  float?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChangeValue,
  placeholder = "Enter number",
  float = true,
  style,
  ...rest
}) => {
  const handleChangeText = (text: string) => {
    let cleaned = text.replace(/[^0-9.]/g, "");

    if (!float) {
      cleaned = cleaned.replace(/\./g, "");
    } else {
      const dotCount = (cleaned.match(/\./g) || []).length;
      if (dotCount > 1) return;
    }

    onChangeValue(cleaned);
  };

  return (
    <TextInput
      style={[styles.input, style]}
      keyboardType="numeric"
      placeholder={placeholder}
      value={value?.toString() || ""}
      onChangeText={handleChangeText}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default NumberInput;
