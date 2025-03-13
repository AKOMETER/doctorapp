import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BasicInput from "./BasicInput";

interface JsonInputProps {
  label: "Education" | "Experience" | "Service";
  value: any;
  onChange: (type: string, key: string, value: string) => void;
}

const EducationExperienceForm: React.FC<JsonInputProps> = ({
  label,
  value,
  onChange,
}) => {
  if (label === "Education") {
    return (
      <View>
        <BasicInput
          label="Education School"
          value={value?.school || ""}
          onChangeText={(v) => onChange("education", "school", v)}
          placeholder="Enter School"
        />
        <BasicInput
          label="Education Location"
          value={value?.location || ""}
          onChangeText={(v) => onChange("education", "location", v)}
          placeholder="Enter Location"
        />
        <BasicInput
          label="Education Year"
          value={value?.year || ""}
          onChangeText={(v) => onChange("education", "year", v)}
          placeholder="Select year"
          type="select"
          options={Array.from({ length: 50 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return { label: `${year}`, value: `${year}` };
          })}
        />
      </View>
    );
  }

  if (label === "Experience") {
    return (
      <View>
        <BasicInput
          label="Experience Name"
          value={value?.name || ""}
          onChangeText={(v) => onChange("experience", "school", v)}
          placeholder="Enter Name"
        />
        <BasicInput
          label="Experience Location"
          value={value?.location || ""}
          onChangeText={(v) => onChange("experience", "location", v)}
          placeholder="Enter Location"
        />
        <BasicInput
          label="Experience Year"
          value={value?.year || ""}
          onChangeText={(v) => onChange("experience", "year", v)}
          placeholder="Select year"
          type="select"
          options={Array.from({ length: 50 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return { label: `${year}`, value: `${year}` };
          })}
        />
      </View>
    );
  }

  if (label === "Service") {
    return (
      <View>
        <BasicInput
          label="Service Description **(Separate By Comma)**"
          value={Array.isArray(value) ? value.join(", ") : value || ""}
          onChangeText={(v) => onChange("service", "", v)}
          placeholder="Separate Services by comma"
        />
      </View>
    );
  }

  return null;
};

export default EducationExperienceForm;
