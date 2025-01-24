import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Calendar from "@/components/calender";
import Appointment from "@/components/appointment";
import { appointments } from "@/utils/data";
import { useSidebar } from "@/context/SidebarContext";

const Appointments = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); // Ensure `id` is retrieved correctly.
  const [specialtyId, setSpecialtyId] = useState(id ? parseInt(id, 10) : null);
  const { user } = useSidebar();
  useEffect(() => {
    // Set header title dynamically
    navigation.setOptions({
      title: "Appointment", // New title
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  function handleBook(datetime: any) {
    appointments.push({
      id: appointments.length + 1,
      patient: user.firstName + " " + user.lastName,
      status: "pending",
      date: datetime,
    });

    setSpecialtyId(null);
  }

  console.log("Specialty ID:", specialtyId);

  return (
    <ScrollView style={styles.container}>
      {specialtyId === null ? (
        <Appointment />
      ) : (
        <Calendar handleBook={handleBook} />
      )}
    </ScrollView>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});
