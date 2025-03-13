// DoctorEditForm.tsx
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MultiSelect from "react-native-multiple-select";
import apiRequest from "@/services/apiRequest";
import { useSidebar } from "@/context/SidebarContext";
import { DoctorType } from "@/utils/dataTypes";
import { defaultDoctor } from "@/utils/default";
import BasicInput from "@/components/BasicInput";
import EducationExperienceForm from "@/components/EducationExperienceForm";
import TimeInput from "@/components/TimeInput";

export default function DoctorEditForm() {
  const [formData, setFormData] = useState<DoctorType>(defaultDoctor);
  const [specifications, setSpecifications] = useState<any[]>([]);
  const [labs, setLabs] = useState<any[]>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<number[]>([]);
  const [selectedLabs, setSelectedLabs] = useState<number[]>([]);
  const [loading, setLoading] = useState({
    doctor: false,
    lab: false,
    specialty: false,
  });

  const [education, setEducation] = useState({
    school: "",
    location: "",
    year: "",
  });

  const [experience, setExperience] = useState({
    name: "",
    location: "",
    year: "",
  });

  const [service, setService] = useState("");

  function handleForm(type: string, key: string, value: string) {
    switch (type.toLowerCase()) {
      case "education":
        setEducation((prev) => ({
          ...prev,
          [key]: value,
        }));
        break;

      case "experience":
        setExperience((prev) => ({
          ...prev,
          [key]: value,
        }));
        break;

      case "service":
        setService(value);
        break;

      default:
        throw new Error("Not Found");
    }
  }

  const { user } = useSidebar();

  useEffect(() => {
    loadDoctorData();
    loadSpecialty();
    loadLab();
  }, []);

  useEffect(() => {
    const safeParse = (value: any) => {
      if (!value || value === "") return [];
      try {
        return JSON.parse(JSON.parse(value));
      } catch (e) {
        console.warn("Invalid JSON:", value);
        return [];
      }
    };

    setExperience(safeParse(formData?.experience));
    setEducation(safeParse(formData?.education));
    setService(safeParse(formData?.service));
  }, [formData]);

  const loadDoctorData = async () => {
    setLoading((prev) => ({ ...prev, doctor: true }));
    try {
      const res = await apiRequest.get(`/doctor/get_by_user_id/${user.id}`);
      const doctorData = res.data;
      setFormData(doctorData);
      setSelectedSpecs(doctorData.Specialties?.map((s: any) => s.id) || []);
      setSelectedLabs(doctorData.Labs?.map((l: any) => l.id) || []);
    } catch {
      Alert.alert("Error", "Failed to load doctor data");
    } finally {
      setLoading((prev) => ({ ...prev, doctor: false }));
    }
  };

  const loadSpecialty = async () => {
    setLoading((prev) => ({ ...prev, specialty: true }));
    try {
      const res = await apiRequest.get(`/specialty`);
      setSpecifications(res.data);
    } catch {
      Alert.alert("Error", "Failed to load specialties");
    } finally {
      setLoading((prev) => ({ ...prev, specialty: false }));
    }
  };

  const loadLab = async () => {
    setLoading((prev) => ({ ...prev, lab: true }));
    try {
      const res = await apiRequest.get(`/lab`);
      setLabs(res.data);
    } catch {
      Alert.alert("Error", "Failed to load labs");
    } finally {
      setLoading((prev) => ({ ...prev, lab: false }));
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setFormData({
      ...formData,
      education: JSON.stringify(education),
      experience: JSON.stringify(experience),
      service: JSON.stringify(service),
    });

    const newData = {
      ...formData,
      specificationIds: selectedSpecs,
      labIds: selectedLabs,
    };

    console.log("newData", newData);

    try {
      await apiRequest.put(`/doctor/${user?.id}`, newData);
      Alert.alert("Success", "Doctor profile updated");
    } catch {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  if (loading.doctor || loading.lab || loading.specialty) {
    return <ActivityIndicator size="large" color="#00b4d8" />;
  }

  return (
    <KeyboardAwareScrollView
      style={{ padding: 16, marginBottom: 20 }}
      enableOnAndroid={true}
    >
      <Text>Specifications:</Text>
      <MultiSelect
        items={specifications}
        uniqueKey="id"
        onSelectedItemsChange={(items) => setSelectedSpecs(items)}
        selectedItems={selectedSpecs}
        selectText="Select Specifications"
        searchInputPlaceholderText="Search specifications"
        tagRemoveIconColor="#000"
        tagBorderColor="#000"
        tagTextColor="#000"
        selectedItemTextColor="#00b4d8"
        selectedItemIconColor="#00b4d8"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#000" }}
        submitButtonColor="#00b4d8"
        submitButtonText="Done"
      />

      <Text>Labs:</Text>
      <MultiSelect
        items={labs}
        uniqueKey="id"
        onSelectedItemsChange={(items) => setSelectedLabs(items)}
        selectedItems={selectedLabs}
        selectText="Select Labs"
        searchInputPlaceholderText="Search labs"
        tagRemoveIconColor="#000"
        tagBorderColor="#000"
        tagTextColor="#000"
        selectedItemTextColor="#00b4d8"
        selectedItemIconColor="#00b4d8"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#000" }}
        submitButtonColor="#00b4d8"
        submitButtonText="Done"
      />

      <BasicInput
        label="Bio"
        value={formData.bio}
        onChangeText={(v) => handleChange("bio", v)}
      />
      <TimeInput
        label="Available From"
        value={formData.availableFrom}
        onChange={(v) => handleChange("availableFrom", v)}
      />

      <TimeInput
        label="Available To"
        value={formData.availableTo}
        onChange={(v) => handleChange("availableTo", v)}
      />
      <BasicInput
        label="Location"
        value={formData.location}
        onChangeText={(v) => handleChange("location", v)}
      />
      <BasicInput
        label="Price"
        value={String(formData.price)}
        onChangeText={(v) => handleChange("price", Number(v))}
        keyboardType="numeric"
      />

      <EducationExperienceForm
        label="Education"
        value={education}
        onChange={handleForm}
      />

      <EducationExperienceForm
        label="Service"
        value={service}
        onChange={handleForm}
      />

      <EducationExperienceForm
        label="Experience"
        value={experience}
        onChange={handleForm}
      />

      <Button title="Update Doctor" onPress={handleSave} />
    </KeyboardAwareScrollView>
  );
}
