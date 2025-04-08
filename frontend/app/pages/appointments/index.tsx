import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Calendar from "@/components/calender";
import Appointment from "@/components/appointment";
import { useSidebar } from "@/context/SidebarContext";
import { DoctorType } from "@/utils/dataTypes";
import apiRequest from "@/services/apiRequest";
import Toast from "react-native-toast-message";
import { showToast } from "@/utils/helperFunction";

const Appointments = () => {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const [routeID, setRouteID] = useState<string | null>(id || null);
  const [doctor, setDoctor] = useState<DoctorType | null>(null);
  const { user } = useSidebar();

  useEffect(() => {
    navigation.setOptions({
      title: "Appointment",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  useEffect(() => {
    if (routeID) {
      apiRequest.get(`/doctor/${routeID}`).then((res) => {
        setDoctor(res?.data.data);
      });
    }
  }, [routeID]);

  const handleBook = (datetime: string, duration: number, reason: string) => {
    if (!doctor) return;

    const newData = {
      patientId: user?.id,
      doctorId: doctor?.id,
      status: "pending",
      dateTime: datetime,
      duration,
      reason,
    };

    apiRequest
      .post("/appointment", newData)
      .then((res) => {
        // console.log("Appointment created:", res);
        showToast("success", "Appointment Booking was successfully ");
        setTimeout(() => {
          setRouteID(null); // switch to Appointment view
        }, 1500);
      })
      .catch((err) => {
        console.log("Booking error:", err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {routeID === null ? (
        <Appointment />
      ) : (
        <Calendar handleBook={handleBook} />
      )}
      <Toast />
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
