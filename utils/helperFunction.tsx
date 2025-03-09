import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { appointments } from "@/utils/data";
import Toast from "react-native-toast-message";
import DentistImage from "../assets/images/dentist.png";
import NeurologistImage from "../assets/images/neurologist.png";
import ArthopedicImage from "../assets/images/arthopedic.jpg";
import CardiologistImage from "../assets/images/cardiologist.jpg";
import DermatologistImage from "../assets/images/Dermatologist.jpg";
import PediatricianImage from "../assets/images/Pediatrician.png";
import PsychiatristImage from "../assets/images/Pulmonologist.jpg";

export function handleAlert(title: string, message: string) {
  Alert.alert(
    title,
    message,
    [
      {
        text: "OK",
        onPress: () => {},
      },
    ],
    { cancelable: true }
  );

  // if (title.toLowerCase() == "success") {
  //   Toast.show({
  //     type: "success",
  //     text1: "Register Successful",
  //     text2: message,
  //   });
  // } else {
  //   Toast.show({
  //     type: "error",
  //     text1: "Error",
  //     text2: message,
  //   });
  // }
}

export const setupNotifications = async () => {
  // Request Notification Permissions
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
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

export function getSpecialtyImage(path: string) {
  switch (path) {
    case "dentist.png":
      return DentistImage;

    case "neurologist.png":
      return NeurologistImage;

    case "arthopedic.jpg":
      return ArthopedicImage;

    case "cardiologist.jpg":
      return CardiologistImage;

    case "Dermatologist.jpg":
      return DermatologistImage;

    case "Pediatrician.png":
      return PediatricianImage;

    case "Psychiatrist.webp":
      return PsychiatristImage;

    case "neurologist.png":
      return NeurologistImage;

    default:
      return path;
      break;
  }
}
