import { Alert } from "react-native";

export function ErrorHandler(title: string, message: string) {
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
}
