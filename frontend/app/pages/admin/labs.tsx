import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import apiRequest from "@/services/apiRequest";
import { LabType } from "@/utils/dataTypes";
import Toast from "react-native-toast-message";

export default function AdminLabScreen() {
  const [labs, setLabs] = useState<LabType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState<LabType>({
    name: "",
    image: "",
    description: "",
    location: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      const res = await apiRequest.get("/lab");
      setLabs(res?.data.data);
    } catch (err) {
      console.error("Fetch labs error:", err);
    }
  };

  const openCreateModal = () => {
    setForm({ name: "", image: "", description: "", location: "" });
    setEditingId(null);
    setModalVisible(true);
  };

  const openEditModal = (lab: LabType) => {
    setForm(lab);
    setEditingId(lab.id!);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await apiRequest.put(`/lab/${editingId}`, form);
      } else {
        await apiRequest.post("/lab", form);
      }
      setModalVisible(false);
      fetchLabs();
    } catch (err) {
      console.error("Save lab error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Lab", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await apiRequest.delete(`/lab/${id}`);
            fetchLabs();
          } catch (err) {
            console.error("Delete lab error:", err);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Button
        color={"#1f5b92"}
        title="Create New Lab"
        onPress={openCreateModal}
      />

      {labs.map((lab) => (
        <View key={lab.id} style={styles.card}>
          {lab.image ? (
            <Image source={{ uri: lab.image }} style={styles.image} />
          ) : null}
          <Text style={styles.title}>{lab.name}</Text>
          <Text>{lab.description}</Text>
          <Text>Location: {lab.location}</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => openEditModal(lab)}>
              <FontAwesome name="edit" size={20} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(lab.id!)}>
              <FontAwesome
                name="trash"
                size={20}
                color="red"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal Form */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {editingId ? "Edit Lab" : "Create Lab"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Lab Name"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={form.image}
            onChangeText={(text) => setForm({ ...form, image: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={form.location}
            onChangeText={(text) => setForm({ ...form, location: text })}
          />

          <View style={styles.modalButtons}>
            <Button color={"#1f5b92"} title="Save" onPress={handleSave} />
            <Button
              color={"#1f5b92"}
              title="Cancel"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    top: "20%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
