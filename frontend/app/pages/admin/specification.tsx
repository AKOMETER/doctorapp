import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SpecialtyType } from "@/utils/dataTypes";
import apiRequest from "@/services/apiRequest";
import Toast from "react-native-toast-message";
import { showToast } from "@/utils/helperFunction";

export default function Specification() {
  const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);
  const [form, setForm] = useState({ name: "", icon: "" });
  const [editId, setEditId] = useState<null | number | string | undefined>(
    null
  );

  const fetchSpecialties = async () => {
    apiRequest.get("/specialty").then((res) => {
      setSpecialties(res?.data.data);
    });
  };

  const handleSubmit = async () => {
    if (editId) {
      apiRequest.put(`/specialty/${editId}`, form);
    } else {
      apiRequest.post("/specialty", form);
    }
    setForm({ name: "", icon: "" });
    setEditId(null);
    fetchSpecialties();
  };

  const handleEdit = (item: SpecialtyType) => {
    setForm({ name: item.name, icon: item.icon });
    setEditId(item.id);
  };

  const handleDelete = async (id: string | undefined) => {
    apiRequest.delete(`/specialty/${id}`).then((res) => {
      showToast("success", "Specialty Deleted Successfully");
    });
    setTimeout(() => {
      fetchSpecialties();
    }, 1000);
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Add/Edit Specialty
      </Text>
      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(val) => setForm({ ...form, name: val })}
      />
      <TextInput
        placeholder="Icon (URL or Name)"
        value={form.icon}
        onChangeText={(val) => setForm({ ...form, icon: val })}
      />
      <Button
        color={"#1f5b92"}
        title={editId ? "Update" : "Create"}
        onPress={handleSubmit}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
        Specialty List
      </Text>
      {specialties.map((item) => (
        <View
          key={item.id}
          style={{ borderBottomWidth: 1, paddingVertical: 10 }}
        >
          <Text>{item.name}</Text>
          <Text>{item.icon}</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Text style={{ color: "blue" }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item?.id || "")}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Toast />
    </ScrollView>
  );
}
