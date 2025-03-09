import { SidebarProvider } from "@/context/SidebarContext";
import { Slot, Stack } from "expo-router";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { setupNotifications } from "@/utils/helperFunction";

export default function RootLayout() {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <SidebarProvider>
      <Stack screenOptions={{ headerShown: true }}>
        {/* Main Screens */}
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="pages/search"
          options={{ title: "Search Result" }}
        />
        <Stack.Screen name="pages/homePage" options={{ title: "Home Page" }} />
        <Stack.Screen name="pages/dashboard" options={{ title: "Dashboard" }} />
        <Stack.Screen
          name="pages/appointments"
          options={{ title: "Appointments" }}
        />
        <Stack.Screen
          name="pages/prescriptions"
          options={{ title: "Prescriptions" }}
        />
        <Stack.Screen name="pages/medicines" options={{ title: "Medicines" }} />
        <Stack.Screen name="pages/profile" options={{ title: "Profile" }} />
        <Stack.Screen name="pages/message" options={{ title: "Messages" }} />
        <Stack.Screen name="pages/settings" options={{ title: "Settings" }} />
        <Stack.Screen
          name="pages/deliveryBoyIcon"
          options={{ title: "Delivery Boy" }}
        />
        <Stack.Screen
          name="pages/specialities/index"
          options={{ title: "Specialities" }}
        />
        <Stack.Screen
          name="pages/doctor/index"
          options={{ title: "Doctors" }}
        />
        <Stack.Screen name="pages/lab/index" options={{ title: "Labs" }} />

        {/* Auth Screens */}
        <Stack.Screen name="auth/login" options={{ title: "Login" }} />
        <Stack.Screen name="auth/register" options={{ title: "Register" }} />
        <Stack.Screen
          name="auth/forget_password"
          options={{ title: "Forget Password" }}
        />
        <Stack.Screen
          name="auth/forget_password_confirm"
          options={{ title: "Confirm Reset" }}
        />

        {/* Others */}
        <Stack.Screen name="not-found" options={{ title: "Not Found" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
      </Stack>
    </SidebarProvider>
  );
}
