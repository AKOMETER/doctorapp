import { SidebarProvider } from "@/context/SidebarContext";
import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
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
            name="pages/appointment"
            options={{
              title: "Appointment",
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

          {/* Auth Screens */}
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
      </React.Fragment>
    </SidebarProvider>
  );
}
