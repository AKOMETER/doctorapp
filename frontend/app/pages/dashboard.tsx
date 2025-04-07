import Sidebar from "@/components/sidebar";
import { useSidebar } from "@/context/SidebarContext";
import apiRequest from "@/services/apiRequest";
import { router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";

const Dashboard = () => {
  const { user } = useSidebar();
  const [specialty, setSpecialty] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [labs, setLabs] = useState([]);
  const [newUser, setUser] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    apiRequest.get("/specialty").then((res) => setSpecialty(res?.data?.data));
    apiRequest.get("/doctor").then((res) => setDoctors(res?.data.data));
    apiRequest.get("/lab").then((res) => setLabs(res?.data?.data));

    apiRequest.get(`/user/${user?.id}`).then((res) => {
      setUser(res?.data?.data); // assuming response has .data
    });
  }, []);

  return (
    <Sidebar title="Dashboard">
      <ScrollView style={styles.container}>
        {/* User Relationship Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <FontAwesome name="envelope" size={28} color="#4CAF50" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Sent Messages</Text>
              <Text style={styles.cardValue}>
                {newUser?.SentMessages?.length || 0}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <MaterialIcons name="notifications" size={28} color="#FF9800" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Notifications</Text>
              <Text style={styles.cardValue}>
                {newUser?.Notifications?.length || 0}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <FontAwesome name="envelope" size={28} color="blue" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Received Messages</Text>
              <Text style={styles.cardValue}>
                {newUser?.ReceivedMessages?.length || 0}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <FontAwesome name="user-md" size={28} color="#4CAF50" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>My Doctors</Text>
              <Text style={styles.cardValue}>
                {newUser?.MyDoctors?.length || 0}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <FontAwesome name="money" size={28} color="yellow" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Transactions</Text>
              <Text style={styles.cardValue}>
                {newUser?.Transactions?.length || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* System Stats */}
        <Text style={styles.subTitle}>Resources Overview</Text>
        <View style={styles.cardContainer}>
          <Pressable
            style={styles.card}
            onPress={() => {
              router.push("/pages/specialities");
            }}
          >
            <Entypo name="briefcase" size={28} color="#3F51B5" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Specialties</Text>
              <Text style={styles.cardValue}>{specialty.length}</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => {
              router.push("/pages/doctor");
            }}
          >
            <FontAwesome name="user-md" size={28} color="#009688" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Doctors</Text>
              <Text style={styles.cardValue}>{doctors.length}</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => {
              router.push("/pages/lab");
            }}
          >
            <MaterialIcons name="science" size={28} color="#E91E63" />
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Labs</Text>
              <Text style={styles.cardValue}>{labs.length}</Text>
            </View>
          </Pressable>

          {user?.role === "Patient" && (
            <Pressable
              style={styles.card}
              onPress={() => {
                router.push("/pages/medicalRecord");
              }}
            >
              <MaterialIcons name="book" size={28} color="#E91E63" />
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Medical Record</Text>
              </View>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </Sidebar>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#555",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
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
  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
});

export default Dashboard;
