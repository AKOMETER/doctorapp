import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Calendar from "@/components/calender";
import Appointment from "@/components/appointment";
import { useSidebar } from "@/context/SidebarContext";
import apiRequest from "@/services/apiRequest";
import Toast from "react-native-toast-message";
import { showToast } from "@/utils/helperFunction";

const Appointments = () => {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const [routeID, setRouterID] = useState<string | null>(id || null); // no setRouteID that causes reset
  const { user } = useSidebar();

  useEffect(() => {
    navigation.setOptions({
      title: "Appointment",
      headerStyle: { backgroundColor: "#00b4d8" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const handleBook = async (
    datetime: string,
    duration: number,
    reason: string
  ) => {
    if (!id || !user?.id) return;

    const newData = {
      patientId: user.id,
      doctorId: routeID,
      status: "pending",
      dateTime: datetime,
      duration,
      reason,
    };

    try {
      await apiRequest.post("/appointment", newData);
      showToast("success", "Appointment Booking was successful");
      // optional: navigation.goBack()
      setTimeout(() => {
        setRouterID(null);
      }, 1000);
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  return (
    <ScrollView className="p-4 bg-gray-100 flex-1">
      {routeID ? (
        <Calendar handleBook={handleBook} id={routeID} />
      ) : (
        <Appointment />
      )}
      <Toast />
    </ScrollView>
  );
};

export default Appointments;
