import { SidebarProvider } from "@/context/SidebarContext";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import Toast from "react-native-toast-message";
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
      <React.Fragment>
        <Stack>
          {/* Main Screens */}
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/appointments"
            options={{
              title: "Appointments",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/specialities/index"
            options={{
              title: "Specialties",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/specialities/[id]"
            options={{
              title: "Search By Specialty",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/doctor/index"
            options={{
              title: "Doctors",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/doctor/[id]"
            options={{
              title: "Doctor Details",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/dashboard"
            options={{
              title: "Dashboard",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/login"
            options={{
              title: "Login",
              headerStyle: { backgroundColor: "blue" },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="auth/forget_password"
            options={{
              title: "Forget Password",
              headerStyle: { backgroundColor: "blue" },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="auth/register"
            options={{
              title: "Register",
              headerStyle: { backgroundColor: "blue" },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>

        <Toast />
      </React.Fragment>
    </SidebarProvider>
  );
}
