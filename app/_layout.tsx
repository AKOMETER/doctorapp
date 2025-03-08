import { SidebarProvider } from "@/context/SidebarContext";
import { Slot } from "expo-router";
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
      <Slot />
    </SidebarProvider>
  );
}
