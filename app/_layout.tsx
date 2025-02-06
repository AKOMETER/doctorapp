import { SidebarProvider } from "@/context/SidebarContext";
import { Slot } from "expo-router";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import * as Notifications from "expo-notifications";
import { appointments } from "@/utils/data";

export default function RootLayout() {
  useEffect(() => {
    const setupNotifications = async () => {
      // Request Notification Permissions
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          console.warn("Permission for notifications was not granted.");
          return;
        }
      }

      // Schedule Notifications
      for (let appointment of appointments) {
        const appointmentDate = new Date(appointment.date);

        const alerts = [
          {
            time: new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000),
            type: "alert",
          }, // 1 day before
          {
            time: new Date(appointmentDate.getTime() - 60 * 60 * 1000),
            type: "alert",
          }, // 1 hour before
          {
            time: new Date(appointmentDate.getTime() - 10 * 60 * 1000),
            type: "warning",
          }, // 10 minutes before
        ];

        for (let alert of alerts) {
          if (alert.time > new Date()) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Appointment Reminder",
                body: `${appointment.patient}'s appointment is ${
                  alert.type === "warning" ? "VERY close!" : "approaching soon."
                }`,
                sound: true,
              },
              trigger: alert.time,
            });
          }
        }
      }
    };

    setupNotifications();
  }, []);

  return (
    <SidebarProvider>
      <Slot />
    </SidebarProvider>
  );
}
