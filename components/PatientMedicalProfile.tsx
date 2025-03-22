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
        const res = await apiRequest.get(`/medical-record/${userId}`);
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
    try {
      await apiRequest.post("/medical-record", { userId, ...form });
      showToast("success", "Success", "Medical record saved successfully");
    } catch (err) {
      showToast("error", "Error", "Failed to save record");
    }
  };

  if (loading) return <ActivityIndicator size="large" className="mt-10" />;

  return (
    <ScrollView className="p-4">
      {Object.keys(form).map((field) => (
        <View key={field} className="mb-4">
          <Text className="font-semibold mb-1 capitalize">{field}</Text>
          <TextInput
            className="border border-gray-300 rounded px-3 py-2 text-base"
            value={(form as any)[field]}
            multiline={["allergies", "chronicDiseases", "medicalNote"].includes(
              field
            )}
            onChangeText={(text) =>
              handleChange(field as keyof MedicalRecordType, text)
            }
          />
        </View>
      ))}

      <TouchableOpacity
        className="bg-blue-600 rounded p-3 mt-4"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">
          Save Medical Record
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
