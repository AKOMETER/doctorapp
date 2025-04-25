import { useSidebar } from "@/context/SidebarContext";
import apiRequest from "@/services/apiRequest";
import { MedicalRecordType } from "@/utils/dataTypes";
import { defaultMedicalRecord } from "@/utils/default";
import { showToast } from "@/utils/helperFunction";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Modal, Portal, Provider } from "react-native-paper"; // install this if not yet

export default function MedicalRecord() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<MedicalRecordType | null>();
  const { user } = useSidebar();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const showPreview = (text: string) => {
    const words = text?.split(" ");
    if (!words) return "";
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
  };

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const res = await apiRequest.get(`/medical_record/${user?.id}`);
        if (res?.status == 200) setForm(res?.data);
        else {
          showToast("error", res?.data?.msg || "No Record Found");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchMedicalRecord();
  }, [user?.id]);

  const handleSubmit = async () => {
    try {
      const res = await apiRequest.post("/medical_record", {
        userId: user?.id,
        ...form,
      });

      showToast("success", "Success", "Medical record saved successfully");
    } catch (err) {
      showToast("error", "Error", "Failed to save record");
    }
  };

  const handlePress = (fullText: string) => {
    setModalText(fullText);
    setVisible(true);
  };

  if (loading) return <ActivityIndicator size="large" className="mt-10" />;

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="binoculars" size={28} color="#4CAF50" />
          <Text style={styles.headerText}>All Records</Text>
        </View>
        {form ? (
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <MaterialIcons name="ac-unit" size={28} color="#3F51B5" />
                <Pressable
                  onPress={() => handlePress(form?.allergies)}
                  style={styles.cardContent}
                >
                  <Text style={styles.cardLabel}>Allergies</Text>

                  <Text className="text-sm text-black">
                    {showPreview(form?.allergies)}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.card}>
                <FontAwesome name="user-md" size={28} color="#009688" />
                <Pressable
                  onPress={() => handlePress(form?.bloodGroup)}
                  style={styles.cardContent}
                >
                  <Text style={styles.cardLabel}>Blood Group</Text>
                  <Text>{showPreview(form?.bloodGroup)}</Text>
                </Pressable>
              </View>

              <View style={styles.card}>
                <MaterialIcons name="bloodtype" size={28} color="#E91E63" />
                <Pressable
                  onPress={() => handlePress(form?.bloodType)}
                  style={styles.cardContent}
                >
                  <Text style={styles.cardLabel}>Blood Type</Text>
                  <Text>{showPreview(form?.bloodType)}</Text>
                </Pressable>
              </View>

              <View style={styles.card}>
                <MaterialIcons name="inventory" size={28} color="#A91A43" />
                <Pressable
                  onPress={() => handlePress(form?.chronicDiseases)}
                  style={styles.cardContent}
                >
                  <Text style={styles.cardLabel}>Chronic Diseases</Text>
                  <Text>{showPreview(form?.chronicDiseases)}</Text>
                </Pressable>
              </View>

              <View style={styles.card}>
                <MaterialIcons name="format-clear" size={28} color="#P91E63" />
                <Pressable
                  onPress={() => handlePress(form?.genotype)}
                  style={styles.cardContent}
                >
                  <Text style={styles.cardLabel}>Genotype</Text>
                  <Text>{showPreview(form?.genotype)}</Text>
                </Pressable>
              </View>

              <View style={styles.card}>
                <MaterialIcons name="book" size={28} color="#E91E63" />
                <Pressable
                  onPress={() => handlePress(form?.medicalNote)}
                  style={styles.cardContent}
                >
                  <Text style={styles.cardLabel}>Medical Note</Text>
                  <Text>{showPreview(form?.medicalNote)}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-4 mt-10">
            <Text className="text-lg font-semibold text-gray-600 mb-4">
              No Record Found
            </Text>
            <Pressable
              onPress={() => {
                router.push("/pages/profile");
              }}
              className="bg-green-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-sm">
                Update Medical Records
              </Text>
            </Pressable>
          </View>
        )}

        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              borderRadius: 12,
            }}
          >
            <Text className="text-base text-black">{modalText}</Text>
          </Modal>
        </Portal>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4CAF50",
    marginTop: 8,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: "48%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardContent: {
    marginLeft: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: "#666",
  },
});
