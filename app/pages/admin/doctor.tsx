import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import apiRequest from "@/services/apiRequest";
import { DoctorType } from "@/utils/dataTypes";

type DoctorFormType = {
  profileImage: string;
  bio: string;
  availableFrom: string;
  availableTo: string;
  price: number | string;
};

export default function Doctor() {
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [form, setForm] = useState<DoctorFormType>({
    profileImage: "",
    bio: "",
    availableFrom: "",
    availableTo: "",
    price: 0,
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await apiRequest.get("/doctor");
      setDoctors(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const openEditModal = (doctor: DoctorType) => {
    setSelectedDoctorId(doctor.id);
    setForm({
      profileImage: doctor?.user?.profileImage || "",
      bio: doctor.bio || "",
      availableFrom: doctor.availableFrom || "",
      availableTo: doctor.availableTo || "",
      price: doctor.price || 0,
    });
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    const newData = {
      bio: form.bio,
      availableFrom: form.availableFrom,
      availableTo: form.availableTo,
      price: form.price,
      user: {
        profileImage: form.profileImage,
      },
    };
    try {
      await apiRequest.put(`/doctor/admin/${selectedDoctorId}`, newData);
      setModalVisible(false);
      fetchDoctors();
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {doctors.map((doctor) => (
        <View key={doctor.id} style={styles.card}>
          {doctor?.user?.profileImage && (
            <Image
              source={{ uri: doctor.user.profileImage }}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.name}>
            {doctor?.user?.firstName} {doctor?.user?.lastName}
          </Text>
          <Text>{doctor.bio}</Text>
          <Text>
            Available: {doctor.availableFrom} - {doctor.availableTo}
          </Text>
          <Text>Price: ₦{doctor.price}</Text>

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => openEditModal(doctor)}
          >
            <FontAwesome name="edit" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <Text>Edit Doctor Info</Text>

          <TextInput
            style={styles.input}
            placeholder="Profile Image URL"
            value={form.profileImage}
            onChangeText={(text) => setForm({ ...form, profileImage: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Bio"
            value={form.bio}
            onChangeText={(text) => setForm({ ...form, bio: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Available From"
            value={form.availableFrom}
            onChangeText={(text) => setForm({ ...form, availableFrom: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Available To"
            value={form.availableTo}
            onChangeText={(text) => setForm({ ...form, availableTo: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={form.price.toString()}
            onChangeText={(text) =>
              setForm({ ...form, price: parseFloat(text) || 0 })
            }
          />

          <View style={styles.modalButtons}>
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    position: "relative",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 4,
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalView: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    top: "20%",
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
    marginTop: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: "center",
  },
});
