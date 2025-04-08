import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import apiRequest from "@/services/apiRequest";
import { MedicalRecordType } from "@/utils/dataTypes";
import { defaultMedicalRecord } from "@/utils/default";
import { useSidebar } from "@/context/SidebarContext";
import { showToast } from "@/utils/helperFunction";

export default function PatientMedicalProfile() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<MedicalRecordType>(defaultMedicalRecord);
  const { user } = useSidebar();
  const userId = user?.id;

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const res = await apiRequest.get(`/medical_record/${userId}`);
        console.log("userId", userId, "Res", res);
        if (res) setForm(res.data);
      } catch (err) {
        console.log("No existing record");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicalRecord();
  }, [userId]);

  const handleChange = (field: keyof MedicalRecordType, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    console.log("{ userId, ...form }", { userId, ...form });
    if (form?.createdAt || form?.id || form?.updatedAt) {
      apiRequest
        .put(`/medical_record/${form?.id}`, { userId, ...form })
        .then((res) => {
          console.log("res", res);
          showToast(
            "success",
            "Success",
            "Medical record Updated successfully"
          );
        })
        .catch((err) => {
          showToast("error", "Error", "Failed to save record");
        });
    } else {
      apiRequest
        .post(`/medical_record/`, { userId, ...form })
        .then((res) => {
          console.log("res", res);
          showToast("success", "Success", "Medical record saved successfully");
        })
        .catch((err) => {
          showToast("error", "Error", "Failed to save record");
        });
    }
  };

  if (loading) return <ActivityIndicator size="large" className="mt-10" />;

  return (
    <ScrollView className="p-4">
      <View className="mb-4">
        <Text className="font-semibold mb-1">Blood Group</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2"
          value={form.bloodGroup}
          onChangeText={(text) => handleChange("bloodGroup", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold mb-1">Blood Type</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2"
          value={form.bloodType}
          onChangeText={(text) => handleChange("bloodType", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold mb-1">Genotype</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2"
          value={form.genotype}
          onChangeText={(text) => handleChange("genotype", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold mb-1">Allergies</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2"
          value={form.allergies}
          multiline
          onChangeText={(text) => handleChange("allergies", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold mb-1">Chronic Diseases</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2"
          value={form.chronicDiseases}
          multiline
          onChangeText={(text) => handleChange("chronicDiseases", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold mb-1">Medical Note</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2"
          value={form.medicalNote}
          multiline
          onChangeText={(text) => handleChange("medicalNote", text)}
        />
      </View>

      <TouchableOpacity
        className="rounded p-3 mt-4 mb-7"
        onPress={handleSubmit}
        style={{ backgroundColor: "#1f5b92" }}
      >
        <Text className="text-white text-center font-semibold">
          Save Medical Record
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
